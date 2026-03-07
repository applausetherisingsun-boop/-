#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — マルチソース動画合成
 *
 * Whisper キャプションのタイムスタンプを編集点として、
 * 複数の映像ソースをffmpegで合成する。
 *
 * ソース種別:
 *   main     (0) — Remotionレンダリング済みメイン映像 (~80%)
 *   pexels   (1) — Pexelsストック映像 (~15%)
 *   talkface (2) — トークフェイス映像 (~5%)
 *
 * Usage:
 *   node scripts/combine-sources.mjs --id natto-nattokinase
 *   node scripts/combine-sources.mjs --id natto-nattokinase --ratios 70,25,5
 *   node scripts/combine-sources.mjs --id natto-nattokinase --min-dur 2.5
 *
 * 入力:
 *   out/mp4/shorts-{id}.mp4         メイン映像 (Remotionレンダー)
 *   out/pexels/{id}/merged.mp4      Pexelsストック (任意)
 *   out/talkface/{id}.mp4           トークフェイス (任意)
 *   out/props/{id}.json             captions (Whisper word timestamps)
 *
 * 出力:
 *   out/mp4/shorts-{id}-combined.mp4
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadEnv() {
  const envPath = resolve(ROOT, '.env.local');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const [key, ...rest] = t.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
}

// ── キャプション → セグメント ────────────────────────────────────────────────

/**
 * Whisper word-level captions をセグメント（字幕行相当）にグループ化
 * - 単語間のポーズ > pauseThreshold で新グループ
 * - 累積文字数 > maxChars で新グループ
 */
function groupCaptionsToSegments(captions, { pauseThreshold = 0.45, maxChars = 20 } = {}) {
  if (!captions?.length) return [];

  const segments = [];
  let current = { start: captions[0].start, end: captions[0].end, words: [captions[0].word] };

  for (let i = 1; i < captions.length; i++) {
    const word = captions[i];
    const gap = word.start - current.end;
    const len = current.words.join('').length + word.word.length;

    if (gap > pauseThreshold || len > maxChars) {
      segments.push({ ...current });
      current = { start: word.start, end: word.end, words: [word.word] };
    } else {
      current.end = word.end;
      current.words.push(word.word);
    }
  }
  segments.push(current);
  return segments;
}

// ── ソース自動割り当て ────────────────────────────────────────────────────────

const SOURCE = { MAIN: 0, PEXELS: 1, TALKFACE: 2 };

/**
 * セグメント配列にソース種別を割り当て
 * ratios: [main%, pexels%, talkface%]  合計100
 *
 * 方針:
 *   - 最後の1セグメントは talkface (talkface映像がある場合)
 *   - 残りは main と pexels を比率で交互配置
 *   - pexels映像がない場合は main に吸収
 */
function assignSources(segments, ratios, hasPexels, hasTalkface) {
  const [mainPct, pexelsPct] = ratios;
  const n = segments.length;

  // まず全部 main
  const assignment = new Array(n).fill(SOURCE.MAIN);

  // talkface: 最後のセグメント
  if (hasTalkface && n >= 2) {
    assignment[n - 1] = SOURCE.TALKFACE;
  }

  // pexels: 比率に応じて等間隔に配置
  if (hasPexels && pexelsPct > 0) {
    const pexelsCount = Math.max(1, Math.round((n * pexelsPct) / 100));
    const step = Math.floor((n - 1) / (pexelsCount + 1));
    for (let k = 0; k < pexelsCount; k++) {
      const idx = step * (k + 1);
      if (assignment[idx] === SOURCE.MAIN) {
        assignment[idx] = SOURCE.PEXELS;
      }
    }
  }

  return segments.map((seg, i) => ({ ...seg, source: assignment[i] }));
}

// ── セグメントマージ ──────────────────────────────────────────────────────────

/**
 * ソース割り当て前の時間ベースの事前マージ:
 *   - 直前が MIN_DUR 未満 → 次に結合（ソース無視）
 *   - 最後が MIN_DUR 未満 → 前に吸収
 */
function premergeByDuration(segments, minDur) {
  const result = [{ ...segments[0] }];
  for (const seg of segments.slice(1)) {
    const prev = result[result.length - 1];
    if ((prev.end - prev.start) < minDur) {
      prev.end = seg.end;
    } else {
      result.push({ ...seg });
    }
  }
  while (result.length > 1 && (result[result.length - 1].end - result[result.length - 1].start) < minDur) {
    const last = result.pop();
    result[result.length - 1].end = last.end;
  }
  return result;
}

/**
 * ソース割り当て後のマージロジック:
 *   - 隣が同ソース → 結合
 *   - 直前が MIN_DUR 未満 → 隣に吸収
 *   - 最後が MIN_DUR 未満 → 前に吸収
 */
function mergeSegments(rawSegments, minDur = 3.0) {
  const segments = [{ ...rawSegments[0] }];

  for (const seg of rawSegments.slice(1)) {
    const prev = segments[segments.length - 1];
    const prevDur = prev.end - prev.start;

    if (prev.source === seg.source) {
      prev.end = seg.end;
    } else if (prevDur < minDur) {
      prev.end = seg.end;
      prev.source = seg.source; // 後続に合わせる
    } else {
      segments.push({ ...seg });
    }
  }

  // 末尾が短すぎる → 前に吸収
  while (segments.length > 1 && (segments[segments.length - 1].end - segments[segments.length - 1].start) < minDur) {
    const last = segments.pop();
    segments[segments.length - 1].end = last.end;
  }

  return segments;
}

// ── ffmpeg filter_complex 生成 ────────────────────────────────────────────────

function buildFfmpegCmd({ segments, sourceVideos, outputPath }) {
  // メイン映像を常に最初のinputにする（音声ソースとして使用するため）
  const mainPath = sourceVideos[SOURCE.MAIN];
  const srcMap = new Map();
  const inputs = [];

  srcMap.set(mainPath, 0);
  inputs.push('-i', mainPath);

  for (const seg of segments) {
    const v = sourceVideos[seg.source];
    if (!srcMap.has(v)) {
      srcMap.set(v, srcMap.size);
      inputs.push('-i', v);
    }
  }

  const mainIdx = 0; // 音声は常にメイン映像から
  const filters = [];
  const n = segments.length;

  // Pexels映像の使用オフセット（同じB-roll素材を再利用しないよう管理）
  const pexelsOffset = new Map();

  for (let i = 0; i < n; i++) {
    const { start: s, end: e, source } = segments[i];
    const srcPath = sourceVideos[source];
    const vidIdx = srcMap.get(srcPath);
    const isLast = i === n - 1;
    const dur = e - s;

    // Pexels素材はB-roll（音声なし・高解像度）のため特別処理
    const isPexels = source === SOURCE.PEXELS && srcPath !== mainPath;
    let vidStart, vidEnd;
    if (isPexels) {
      vidStart = pexelsOffset.get(srcPath) ?? 0;
      vidEnd = vidStart + dur;
      pexelsOffset.set(srcPath, vidEnd);
    } else {
      vidStart = s;
      vidEnd = e;
    }

    // 映像フィルター（Pexelsは解像度をメインに合わせてスケール）
    const scaleFilter = isPexels ? ',scale=1080:1920' : '';
    if (isLast) {
      filters.push(`[${vidIdx}:v]trim=start=${vidStart.toFixed(3)},setpts=PTS-STARTPTS${scaleFilter}[v${i}]`);
    } else {
      filters.push(`[${vidIdx}:v]trim=${vidStart.toFixed(3)}:${vidEnd.toFixed(3)},setpts=PTS-STARTPTS${scaleFilter}[v${i}]`);
    }

    // 音声は常にメイン映像から（Pexelsに音声がないため）
    if (isLast) {
      filters.push(`[${mainIdx}:a]atrim=start=${s.toFixed(3)},asetpts=PTS-STARTPTS[a${i}]`);
    } else {
      filters.push(`[${mainIdx}:a]atrim=${s.toFixed(3)}:${e.toFixed(3)},asetpts=PTS-STARTPTS[a${i}]`);
    }
  }

  const interleaved = Array.from({ length: n }, (_, i) => `[v${i}][a${i}]`).join('');
  filters.push(`${interleaved}concat=n=${n}:v=1:a=1[vout][aout]`);

  return [
    'ffmpeg', '-y',
    ...inputs,
    '-filter_complex', filters.join(';\n'),
    '-map', '[vout]',
    '-map', '[aout]',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '192k',
    '-movflags', '+faststart',
    outputPath,
  ];
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  loadEnv();

  const args = process.argv.slice(2);
  const idIdx      = args.findIndex((a) => a === '--id');
  const ratiosIdx  = args.findIndex((a) => a === '--ratios');
  const minDurIdx  = args.findIndex((a) => a === '--min-dur');

  if (idIdx === -1) {
    console.log(`
マルチソース動画合成
  node scripts/combine-sources.mjs --id <video-id>
  node scripts/combine-sources.mjs --id <video-id> --ratios 70,25,5
  node scripts/combine-sources.mjs --id <video-id> --min-dur 2.5

入力:
  out/mp4/shorts-{id}.mp4         メイン映像 (必須)
  out/pexels/{id}/merged.mp4      Pexels素材 (任意)
  out/talkface/{id}.mp4           トークフェイス (任意)
  out/props/{id}.json             Whisper キャプション (必須)

出力:
  out/mp4/shorts-{id}-combined.mp4
    `);
    process.exit(0);
  }

  const id = args[idIdx + 1];
  const ratioStr = ratiosIdx !== -1 ? args[ratiosIdx + 1] : '80,15,5';
  const minDur   = minDurIdx !== -1 ? parseFloat(args[minDurIdx + 1]) : 3.0;
  const ratios   = ratioStr.split(',').map(Number);

  // パス定義
  const PATHS = {
    main:      resolve(ROOT, `out/mp4/shorts-${id}.mp4`),
    pexels:    resolve(ROOT, `out/pexels/${id}/merged.mp4`),
    talkface:  resolve(ROOT, `out/talkface/${id}.mp4`),
    props:     resolve(ROOT, `out/props/${id}.json`),
    output:    resolve(ROOT, `out/mp4/shorts-${id}-combined.mp4`),
  };

  // バリデーション
  if (!existsSync(PATHS.main)) {
    console.error(`❌ メイン映像が見つかりません: ${PATHS.main}`);
    console.error('   先に render-all.mjs を実行してください');
    process.exit(1);
  }
  if (!existsSync(PATHS.props)) {
    console.error(`❌ props が見つかりません: ${PATHS.props}`);
    process.exit(1);
  }

  const hasPexels    = existsSync(PATHS.pexels);
  const hasTalkface  = existsSync(PATHS.talkface);

  console.log(`\n🎬 combine-sources: ${id}`);
  console.log(`   main     : ✅`);
  console.log(`   pexels   : ${hasPexels   ? '✅' : '⚠️  なし (メインで代替)'}`);
  console.log(`   talkface : ${hasTalkface ? '✅' : '⚠️  なし (メインで代替)'}`);
  console.log(`   比率     : main ${ratios[0]}% / pexels ${ratios[1]}% / talkface ${ratios[2]}%`);
  console.log(`   最小時間 : ${minDur}s`);

  // キャプション読み込み
  const props = JSON.parse(readFileSync(PATHS.props, 'utf8'));
  const captions = props.captions ?? [];

  if (captions.length === 0) {
    console.error('❌ captions が props に見つかりません。generate-captions.mjs を先に実行してください。');
    process.exit(1);
  }

  // キャプション → 時間マージ → ソース割り当て → 同一ソースマージ
  const rawSegs = groupCaptionsToSegments(captions);
  console.log(`\n字幕グループ数: ${rawSegs.length}`);

  const preMerged = premergeByDuration(rawSegs, minDur);
  const assigned  = assignSources(preMerged, ratios, hasPexels, hasTalkface);
  const segments  = mergeSegments(assigned, minDur);

  const sourceNames = ['main', 'pexels', 'talkface'];
  console.log(`統合セグメント数: ${segments.length}`);
  console.log(`ソース内訳: main=${segments.filter(s => s.source === 0).length}, pexels=${segments.filter(s => s.source === 1).length}, talkface=${segments.filter(s => s.source === 2).length}`);

  for (const [i, seg] of segments.entries()) {
    const dur = seg.end - seg.start;
    const src = sourceNames[seg.source];
    console.log(`  [${seg.start.toFixed(1).padStart(5)}-${seg.end.toFixed(1).padStart(5)}] ${dur.toFixed(1).padStart(4)}s ${src.padEnd(8)}`);
  }

  // ソースが1種類だけなら合成不要
  const uniqueSources = new Set(segments.map(s => s.source));
  if (uniqueSources.size === 1 && uniqueSources.has(SOURCE.MAIN)) {
    console.log('\n⚠️  Pexels・talkface素材がないためメイン映像のみです。合成をスキップします。');
    console.log('   Pexels素材を追加するには download-pexels.mjs を実行してください。');
    process.exit(0);
  }

  // ソース動画マッピング（なければ main で代替）
  const sourceVideos = [
    PATHS.main,
    hasPexels   ? PATHS.pexels   : PATHS.main,
    hasTalkface ? PATHS.talkface : PATHS.main,
  ];

  mkdirSync(resolve(ROOT, 'out/mp4'), { recursive: true });

  // ffmpeg実行
  const cmd = buildFfmpegCmd({ segments, sourceVideos, outputPath: PATHS.output });
  console.log(`\n🔧 ffmpeg 実行中...`);
  console.log(`   出力: ${PATHS.output}`);

  try {
    execSync(cmd.map(c => c.includes(' ') || c.includes('\n') ? `"${c}"` : c).join(' '), {
      stdio: 'inherit',
    });
  } catch {
    // ffmpeg が stderr に詳細を出すので、ここでは再スローのみ
    console.error('\n❌ ffmpeg 失敗');
    process.exit(1);
  }

  const { statSync } = await import('fs');
  const size = statSync(PATHS.output).size;
  console.log(`\n✅ SUCCESS! ${(size / 1024 / 1024).toFixed(1)} MB → ${PATHS.output}`);
}

main().catch((e) => { console.error(`❌ ${e.message}`); process.exit(1); });
