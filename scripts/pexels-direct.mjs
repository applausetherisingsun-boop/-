#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — Pexels直接合成
 *
 * Remotionレンダー不要で、TTS音声 + Pexelsクリップだけで
 * 完成MP4を生成する。字幕テロップはffmpegで焼き込む。
 *
 * フロー:
 *   public/audio/{id}.mp3          ← TTS音声 (generate-tts.mjs で生成済み)
 *   out/pexels/{id}/clips.json     ← Pexelsクリップリスト (download-pexels.mjs で生成済み)
 *   out/pexels/{id}/clip-*.mp4     ← Pexelsクリップ
 *   out/props/{id}.json            ← captions (Whisper) + transcript
 *       ↓
 *   out/mp4/shorts-{id}-pexels.mp4 ← 完成MP4 (1080x1920)
 *
 * Usage:
 *   node scripts/pexels-direct.mjs --id natto-nattokinase
 *   node scripts/pexels-direct.mjs --id natto-nattokinase --no-captions
 *   node scripts/pexels-direct.mjs --id natto-nattokinase --force
 *
 * Requires: ffmpeg in PATH
 */

import { execFileSync, execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── Env ───────────────────────────────────────────────────────────────────────

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

// ── 音声長さ取得 ──────────────────────────────────────────────────────────────

function getAudioDuration(audioPath) {
  try {
    const out = execSync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    return parseFloat(out.trim());
  } catch {
    return null;
  }
}

// ── 動画長さ取得 ──────────────────────────────────────────────────────────────

function getVideoDuration(videoPath) {
  try {
    const out = execSync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    );
    return parseFloat(out.trim());
  } catch {
    return null;
  }
}

// ── captions → SRT ────────────────────────────────────────────────────────────

function formatSrtTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 1000);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

/**
 * Whisper word-level captions をSRTに変換（行ごとに2〜5単語）
 */
function captionsToSrt(captions, { wordsPerLine = 5, pauseThreshold = 0.5 } = {}) {
  if (!captions?.length) return '';

  const lines = [];
  let current = { start: captions[0].start, end: captions[0].end, words: [captions[0].word] };

  for (let i = 1; i < captions.length; i++) {
    const w = captions[i];
    const gap = w.start - current.end;

    if (gap > pauseThreshold || current.words.length >= wordsPerLine) {
      lines.push({ ...current });
      current = { start: w.start, end: w.end, words: [w.word] };
    } else {
      current.end = w.end;
      current.words.push(w.word);
    }
  }
  lines.push(current);

  return lines.map((line, i) => [
    `${i + 1}`,
    `${formatSrtTime(line.start)} --> ${formatSrtTime(line.end)}`,
    line.words.join(''),
    '',
  ].join('\n')).join('\n');
}

// ── Pexelsクリップをタイムライン割り付け ─────────────────────────────────────

/**
 * 音声の長さに合わせてPexelsクリップを繰り返し割り付ける
 * clips: [{file, query, segment}]
 * returns: [{clipPath, start, end}]  (音声タイムラインでの時間)
 */
function assignClipsToTimeline(clips, audioDuration, clipsDir) {
  if (!clips.length) return [];

  const segments = [];
  const perClipDuration = audioDuration / clips.length;
  let cursor = 0;

  for (let i = 0; i < clips.length; i++) {
    const end = i === clips.length - 1 ? audioDuration : cursor + perClipDuration;
    segments.push({
      clipPath: resolve(clipsDir, clips[i].file),
      query: clips[i].query,
      start: parseFloat(cursor.toFixed(3)),
      end: parseFloat(end.toFixed(3)),
    });
    cursor = end;
  }

  return segments;
}

// ── ffmpeg filter_complex 組み立て ────────────────────────────────────────────

function buildCmd({ audioPath, segments, outputPath, srtPath, title }) {
  // inputs: audio + each unique clip
  const uniqueClips = [...new Set(segments.map(s => s.clipPath))];
  const clipIdx = new Map(uniqueClips.map((p, i) => [p, i + 1])); // audio = 0

  const inputs = ['-i', audioPath];
  for (const p of uniqueClips) inputs.push('-i', p);

  const filters = [];
  const vidLabels = [];

  // Pexelsクリップのトリム追跡（同一クリップを複数セグメントで再利用するときオフセット管理）
  const clipOffset = new Map();

  for (let i = 0; i < segments.length; i++) {
    const { clipPath, start, end } = segments[i];
    const idx = clipIdx.get(clipPath);
    const audioDur = end - start;

    // クリップのどの位置から使うか（使った分だけ進める）
    const clipStart = clipOffset.get(clipPath) ?? 0;
    const clipEnd = clipStart + audioDur;
    clipOffset.set(clipPath, clipEnd);

    // クリップ実長を確認してループが必要なら setpts でループ
    const clipDur = getVideoDuration(clipPath) ?? 99999;
    const actualEnd = Math.min(clipEnd, clipDur);

    // 映像トリム + 1080x1920 に強制スケール (縦型 Shorts)
    filters.push(
      `[${idx}:v]trim=start=${clipStart.toFixed(3)}:end=${actualEnd.toFixed(3)},` +
      `setpts=PTS-STARTPTS,` +
      `scale=1080:1920:force_original_aspect_ratio=increase,` +
      `crop=1080:1920[v${i}]`
    );
    vidLabels.push(`[v${i}]`);
  }

  // 映像 concat
  filters.push(`${vidLabels.join('')}concat=n=${segments.length}:v=1:a=0[vraw]`);

  // 字幕があればsubtitles フィルタを追加（白テキスト・中央下部）
  if (srtPath && existsSync(srtPath)) {
    const escapedSrt = srtPath.replace(/\\/g, '/').replace(/:/g, '\\:');
    filters.push(
      `[vraw]subtitles='${escapedSrt}':` +
      `force_style='FontName=Noto Sans CJK JP,FontSize=22,PrimaryColour=&Hffffff,` +
      `OutlineColour=&H80000000,BackColour=&H40000000,Outline=2,Shadow=1,` +
      `Alignment=2,MarginV=60'[vout]`
    );
  } else {
    filters.push(`[vraw]copy[vout]`);
  }

  return [
    'ffmpeg', '-y',
    ...inputs,
    '-filter_complex', filters.join(';'),
    '-map', '[vout]',
    '-map', '0:a',
    '-c:v', 'libx264', '-preset', 'fast', '-crf', '20', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '192k',
    '-shortest',
    '-movflags', '+faststart',
    outputPath,
  ];
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  loadEnv();

  const args = process.argv.slice(2);
  const idIdx       = args.findIndex(a => a === '--id');
  const noCaptions  = args.includes('--no-captions');
  const forceMode   = args.includes('--force');

  if (idIdx === -1) {
    console.log(`
SHIROKUMA Shorts — Pexels直接合成 (Remotion不要)
  node scripts/pexels-direct.mjs --id <video-id>
  node scripts/pexels-direct.mjs --id <video-id> --no-captions   # 字幕なし
  node scripts/pexels-direct.mjs --id <video-id> --force         # 上書き再生成

入力 (事前に生成が必要):
  public/audio/{id}.mp3         TTS音声  (npm run tts -- --id <id>)
  out/pexels/{id}/clip-*.mp4    Pexelsクリップ (npm run pexels -- --id <id> --smart)
  out/props/{id}.json           Whisper字幕 (npm run captions -- --id <id>)

出力:
  out/mp4/shorts-{id}-pexels.mp4
    `);
    process.exit(0);
  }

  const id = args[idIdx + 1];
  const PATHS = {
    audio:    resolve(ROOT, `public/audio/${id}.mp3`),
    pexelDir: resolve(ROOT, `out/pexels/${id}`),
    clips:    resolve(ROOT, `out/pexels/${id}/clips.json`),
    props:    resolve(ROOT, `out/props/${id}.json`),
    srt:      resolve(ROOT, `out/pexels/${id}/captions.srt`),
    output:   resolve(ROOT, `out/mp4/shorts-${id}-pexels.mp4`),
  };

  // バリデーション
  if (!existsSync(PATHS.audio)) {
    console.error(`[error] TTS音声が見つかりません: ${PATHS.audio}`);
    console.error(`  まず実行: node scripts/generate-tts.mjs --id ${id}`);
    process.exit(1);
  }
  if (!existsSync(PATHS.clips)) {
    console.error(`[error] Pexelsクリップが見つかりません: ${PATHS.clips}`);
    console.error(`  まず実行: node scripts/download-pexels.mjs --id ${id} --smart`);
    process.exit(1);
  }

  if (existsSync(PATHS.output) && !forceMode) {
    console.log(`[skip] 出力済み: ${PATHS.output}`);
    console.log(`  上書きするには --force を使用してください`);
    process.exit(0);
  }

  // データ読み込み
  const clips = JSON.parse(readFileSync(PATHS.clips, 'utf8'));
  const props = existsSync(PATHS.props) ? JSON.parse(readFileSync(PATHS.props, 'utf8')) : {};

  // 音声長さ取得
  const audioDuration = getAudioDuration(PATHS.audio);
  if (!audioDuration) {
    console.error(`[error] 音声長さを取得できませんでした: ${PATHS.audio}`);
    process.exit(1);
  }

  console.log(`\n[pexels-direct] ${id}`);
  console.log(`  audio   : ${audioDuration.toFixed(1)}s`);
  console.log(`  clips   : ${clips.length}本`);

  // SRT字幕生成
  let srtPath = null;
  if (!noCaptions && props.captions?.length) {
    const srtContent = captionsToSrt(props.captions);
    writeFileSync(PATHS.srt, srtContent, 'utf8');
    srtPath = PATHS.srt;
    console.log(`  captions: ${props.captions.length}words -> ${PATHS.srt}`);
  } else if (!noCaptions) {
    console.log(`  captions: なし (字幕なしで出力)`);
  }

  // クリップをタイムラインに割り付け
  const segments = assignClipsToTimeline(clips, audioDuration, PATHS.pexelDir);
  console.log(`\n  タイムライン割り付け:`);
  for (const seg of segments) {
    const dur = (seg.end - seg.start).toFixed(1);
    const clipName = seg.clipPath.split(/[\\/]/).pop();
    console.log(`    [${seg.start.toFixed(1)}-${seg.end.toFixed(1)}] ${dur}s -> ${clipName} ("${seg.query}")`);
  }

  // 出力ディレクトリ作成
  mkdirSync(resolve(ROOT, 'out/mp4'), { recursive: true });

  // ffmpeg 実行
  const cmd = buildCmd({
    audioPath: PATHS.audio,
    segments,
    outputPath: PATHS.output,
    srtPath,
    title: props.title ?? id,
  });

  console.log(`\n[ffmpeg] 合成中...`);
  try {
    execFileSync(cmd[0], cmd.slice(1), { stdio: 'inherit' });
  } catch {
    console.error('[error] ffmpeg 失敗');
    process.exit(1);
  }

  const { statSync } = await import('fs');
  const size = statSync(PATHS.output).size;
  console.log(`\n[done] ${(size / 1024 / 1024).toFixed(1)} MB -> ${PATHS.output}`);
  console.log(`  YouTube Shorts / TikTok / Reels にそのままアップロード可能`);
}

main().catch(e => { console.error(`[error] ${e.message}`); process.exit(1); });
