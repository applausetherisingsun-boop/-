#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — Pexels ストック映像ダウンローダー
 *
 * 動画のaxis・tags・titleを元にPexels APIで縦型動画を検索し、
 * out/pexels/{id}/ にダウンロードして merged.mp4 に結合する。
 *
 * --smart モードではClaudeがトランスクリプトを解析し、
 * 各ナレーションセグメントに最適なPexels検索クエリを自動生成する。
 *
 * Usage:
 *   node scripts/download-pexels.mjs --id natto-nattokinase
 *   node scripts/download-pexels.mjs --id natto-nattokinase --smart       # Claude自動クエリ生成
 *   node scripts/download-pexels.mjs --id natto-nattokinase --query "gut bacteria microscope"
 *   node scripts/download-pexels.mjs --id natto-nattokinase --count 4
 *
 * Requires .env.local:
 *   PEXELS_API_KEY=...
 *   ANTHROPIC_API_KEY=...  (--smart モード時)
 *
 * 出力:
 *   out/pexels/{id}/clip-0.mp4
 *   out/pexels/{id}/clip-1.mp4
 *   ...
 *   out/pexels/{id}/merged.mp4   ← combine-sources.mjs で使用
 *   out/pexels/{id}/clips.json   ← セグメントマッチング用
 */

import { createWriteStream, mkdirSync, existsSync, writeFileSync, readFileSync, unlinkSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { pipeline } from 'stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const PEXELS_API = 'https://api.pexels.com/videos/search';

// ── axis → デフォルト検索クエリ ───────────────────────────────────────────────
// 6つの長寿軸に対応するPexels検索語

const AXIS_QUERIES = {
  inflammation : ['blood cells microscope', 'inflammation body science', 'molecular biology'],
  mitochondria : ['energy cell biology', 'mitochondria science', 'cellular energy'],
  autophagy    : ['cell renewal biology', 'fasting health', 'molecular science'],
  gut          : ['gut bacteria microscope', 'digestive system', 'microbiome science'],
  hormones     : ['hormones biology', 'endocrine system', 'body health science'],
  telomere     : ['dna helix science', 'genetics biology', 'cell aging'],
  default      : ['health science biology', 'human body microscope', 'molecular medicine'],
};

// ── Claude API: スマートクエリ生成 ────────────────────────────────────────────

/**
 * Claudeにトランスクリプトを解析させ、セグメントごとの最適なPexels検索クエリを生成する
 * @param {object} props - 動画のprops (transcript, transcriptJa, title, axis, tags)
 * @param {number} count - 生成するクエリ数
 * @param {string} apiKey - Anthropic APIキー
 * @returns {Promise<Array<{query: string, segment: string}>>}
 */
async function generateSmartQueries(props, count, apiKey) {
  const transcript = props.transcriptJa ?? props.transcript ?? '';
  const title = props.title ?? '';
  const tags = (props.tags ?? []).join(', ');

  const prompt = `You are a video editor choosing B-roll footage for a Japanese health science YouTube Short.

Video title: "${title}"
Topic tags: ${tags}
Axis: ${props.axis ?? 'health'}

Narration script:
"${transcript}"

Task: Generate exactly ${count} specific English search queries for Pexels stock footage that would visually complement DIFFERENT PARTS of this narration.

Requirements for each query:
- Be SPECIFIC to a visual moment in the narration (NOT generic like "health science")
- Optimize for finding relevant stock footage (e.g., "blood cells flowing microscope", "fermented soybeans close up", "dna helix rotating", "gut bacteria microbiome")
- 3-6 words maximum per query
- Each query should represent a DIFFERENT visual concept from the narration
- Prefer scientific/microscopic visuals, food close-ups, nature, body processes

Return ONLY valid JSON array of ${count} objects:
[
  { "query": "specific pexels search query", "segment": "brief description of which part of narration this covers" },
  ...
]`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) throw new Error(`Claude API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const raw = data.content[0].text.trim();
  const jsonStr = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
  return JSON.parse(jsonStr);
}

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

/**
 * Pexels API で縦型動画を検索
 */
async function searchPexels(query, apiKey, perPage = 10) {
  const url = new URL(PEXELS_API);
  url.searchParams.set('query', query);
  url.searchParams.set('orientation', 'portrait');
  url.searchParams.set('size', 'medium');
  url.searchParams.set('per_page', String(perPage));

  const res = await fetch(url.toString(), {
    headers: { Authorization: apiKey },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Pexels API ${res.status}: ${err}`);
  }

  return res.json();
}

/**
 * 動画ファイルURLを選択（縦型 + できるだけ高解像度）
 * 1080×1920 > 720×1280 > 他の縦型
 */
function pickVideoFile(video) {
  const files = video.video_files ?? [];
  const portrait = files.filter(f => f.height > f.width);

  if (portrait.length === 0) return null;

  // 解像度スコア: 高いほど良い、ただし4Kは重いので720p以上1440p以下を優先
  const scored = portrait.map(f => ({
    ...f,
    score: f.height >= 1280 && f.height <= 1440 ? 1000 + f.height : f.height,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0];
}

/**
 * URLからファイルにストリームダウンロード
 */
async function downloadFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  const file = createWriteStream(dest);
  await pipeline(res.body, file);
}

/**
 * ffmpegでクリップを結合してmerged.mp4を生成
 */
function mergeClips(clipPaths, outputPath) {
  const listPath = outputPath.replace('.mp4', '_list.txt');
  const content = clipPaths.map(p => `file '${p.replace(/\\/g, '/')}'`).join('\n');
  writeFileSync(listPath, content, 'utf8');

  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${listPath}" -c:v libx264 -preset fast -crf 23 -pix_fmt yuv420p -an "${outputPath}"`,
    { stdio: 'pipe' }
  );

  unlinkSync(listPath);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  loadEnv();

  const args = process.argv.slice(2);
  const idIdx    = args.findIndex((a) => a === '--id');
  const queryIdx = args.findIndex((a) => a === '--query');
  const countIdx = args.findIndex((a) => a === '--count');
  const smartMode = args.includes('--smart');
  const forceMode = args.includes('--force');

  if (idIdx === -1) {
    console.log(`
Pexels ストック映像ダウンローダー
  node scripts/download-pexels.mjs --id <video-id>
  node scripts/download-pexels.mjs --id <video-id> --smart        # Claude自動クエリ生成 (推奨)
  node scripts/download-pexels.mjs --id <video-id> --smart --count 5
  node scripts/download-pexels.mjs --id <video-id> --query "gut bacteria microscope"
  node scripts/download-pexels.mjs --id <video-id> --count 4
  node scripts/download-pexels.mjs --id <video-id> --force        # キャッシュを無視して再ダウンロード

Requires .env.local:
  PEXELS_API_KEY=...           (https://www.pexels.com/api/ で無料取得)
  ANTHROPIC_API_KEY=sk-ant-... (--smart モード時: Claude自動クエリ生成)

出力:
  out/pexels/{id}/clip-0.mp4 ...
  out/pexels/{id}/merged.mp4   ← combine-sources.mjs が自動的に使用
  out/pexels/{id}/clips.json   ← ナレーション内容マッチング用
    `);
    process.exit(0);
  }

  const pexelsKey = process.env.PEXELS_API_KEY;
  if (!pexelsKey || pexelsKey.startsWith('ここに')) {
    console.error('❌ PEXELS_API_KEY が .env.local に設定されていません');
    console.error('   https://www.pexels.com/api/ で無料取得してください');
    process.exit(1);
  }

  const id    = args[idIdx + 1];
  const count = countIdx !== -1 ? parseInt(args[countIdx + 1]) : (smartMode ? 4 : 2);
  const outDir = resolve(ROOT, `out/pexels/${id}`);

  // props 読み込み
  const propsPath = resolve(ROOT, `out/props/${id}.json`);
  if (!existsSync(propsPath)) {
    console.error(`❌ props not found: ${propsPath}`);
    process.exit(1);
  }
  const props = JSON.parse(readFileSync(propsPath, 'utf8'));

  // 検索クエリ決定
  let queries = []; // { query: string, segment?: string }[]

  if (queryIdx !== -1) {
    queries = [{ query: args[queryIdx + 1], segment: 'manual' }];
  } else if (smartMode) {
    // Claude にトランスクリプトを解析させてセグメントごとのクエリを生成
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) {
      console.error('❌ ANTHROPIC_API_KEY が .env.local に設定されていません（--smart モードに必要）');
      process.exit(1);
    }
    console.log(`\n🤖 Claude でスマートクエリを生成中...`);
    try {
      const smartQueries = await generateSmartQueries(props, count, anthropicKey);
      queries = smartQueries.map(q => ({ query: q.query, segment: q.segment }));
      console.log(`   生成されたクエリ:`);
      queries.forEach((q, i) => console.log(`   ${i + 1}. "${q.query}" (${q.segment})`));
    } catch (e) {
      console.warn(`   ⚠️  Claude クエリ生成失敗: ${e.message} → フォールバック`);
      smartMode = false; // fall through to default
    }
  }

  if (queries.length === 0) {
    // axis → デフォルトクエリ
    const axisKey = Object.keys(AXIS_QUERIES).find(k => props.axis?.includes(k)) ?? 'default';
    const axisQ = AXIS_QUERIES[axisKey].slice(0, 3).map(q => ({ query: q, segment: 'axis-default' }));

    // タグから追加クエリ
    if (props.tags?.length) {
      const tagQuery = props.tags.slice(0, 2).join(' ') + ' science';
      queries = [{ query: tagQuery, segment: 'tags' }, ...axisQ];
    } else {
      queries = axisQ;
    }
  }

  console.log(`\n📹 Pexels ダウンロード: ${id}`);
  console.log(`   axis   : ${props.axis ?? '(未設定)'}`);
  console.log(`   mode   : ${smartMode ? 'Claude スマート' : queryIdx !== -1 ? '手動クエリ' : 'axis デフォルト'}`);
  console.log(`   queries: ${queries.slice(0, 2).map(q => q.query).join(' / ')}`);
  console.log(`   count  : ${count}本`);

  mkdirSync(outDir, { recursive: true });

  // 既存の merged.mp4 があればスキップ（--force で上書き）
  const mergedPath = resolve(outDir, 'merged.mp4');
  if (existsSync(mergedPath) && !forceMode) {
    console.log(`⏭  キャッシュあり: ${mergedPath}`);
    console.log(`   再ダウンロードするには --force を使用してください`);
    process.exit(0);
  }

  // 検索 & ダウンロード
  // --smart モードでは 1クエリにつき 1クリップを取得（セグメントごとに異なる素材）
  // 通常モードでは count 本に達するまで順番に検索
  const downloaded = []; // {file: string, query: string, segment?: string}

  for (const queryObj of queries) {
    if (downloaded.length >= count) break;

    const queryStr = typeof queryObj === 'string' ? queryObj : queryObj.query;
    const segmentLabel = typeof queryObj === 'object' ? queryObj.segment : null;

    console.log(`\n🔍 検索: "${queryStr}"${segmentLabel ? ` [${segmentLabel}]` : ''}`);

    let data;
    try {
      data = await searchPexels(queryStr, pexelsKey, 15);
    } catch (e) {
      console.warn(`   ⚠️  ${e.message}`);
      continue;
    }

    const videos = data.videos ?? [];
    console.log(`   ${videos.length}件ヒット`);

    // --smart モードでは各クエリから1本だけ取得（違う素材を確保）
    const targetForThisQuery = smartMode ? downloaded.length + 1 : count;

    for (const video of videos) {
      if (downloaded.length >= targetForThisQuery) break;

      const file = pickVideoFile(video);
      if (!file) continue;

      const clipName = `clip-${downloaded.length}.mp4`;
      const clipPath = resolve(outDir, clipName);

      // すでにダウンロード済みならスキップ（--force の場合はスキップしない）
      if (existsSync(clipPath) && !forceMode) {
        console.log(`   ⏭  ${clipName} (キャッシュ)`);
        downloaded.push({ file: clipName, query: queryStr, segment: segmentLabel });
        break;
      }

      try {
        process.stdout.write(`   ⬇  ${clipName} (${file.width}×${file.height}) ... `);
        await downloadFile(file.link, clipPath);
        console.log('OK');
        downloaded.push({ file: clipName, query: queryStr, segment: segmentLabel });
        break; // --smart モードでは1クエリ1クリップ
      } catch (e) {
        console.log(`FAILED: ${e.message}`);
      }
    }
  }

  if (downloaded.length === 0) {
    console.error('\n❌ 動画をダウンロードできませんでした');
    process.exit(1);
  }

  // clips.json 保存（combine-sources.mjs がセグメントと照合するために使用）
  const clipsJsonPath = resolve(outDir, 'clips.json');
  writeFileSync(clipsJsonPath, JSON.stringify(downloaded, null, 2), 'utf8');
  console.log(`\nclips.json 保存: ${downloaded.length}本`);
  downloaded.forEach((d, i) =>
    console.log(`  ${i + 1}. ${d.file} — "${d.query}"${d.segment ? ` [${d.segment}]` : ''}`)
  );

  // クリップを結合（後方互換のため merged.mp4 も維持）
  const clipPaths = downloaded.map(d => resolve(outDir, d.file));
  if (downloaded.length === 1) {
    const { copyFileSync } = await import('fs');
    copyFileSync(clipPaths[0], mergedPath);
  } else {
    console.log(`\n[merge] ${downloaded.length}本を結合中...`);
    try {
      mergeClips(clipPaths, mergedPath);
    } catch (e) {
      console.error(`ffmpeg結合失敗: ${e.message}`);
      process.exit(1);
    }
  }

  const { statSync } = await import('fs');
  const size = statSync(mergedPath).size;
  console.log(`\n[done] merged.mp4 完成: ${(size / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  -> combine-sources.mjs または pexels-direct.mjs で使用`);
}

main().catch((e) => { console.error(`❌ ${e.message}`); process.exit(1); });
