#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — Pexels ストック映像ダウンローダー
 *
 * 動画のaxis・tags・titleを元にPexels APIで縦型動画を検索し、
 * out/pexels/{id}/ にダウンロードして merged.mp4 に結合する。
 *
 * Usage:
 *   node scripts/download-pexels.mjs --id natto-nattokinase
 *   node scripts/download-pexels.mjs --id natto-nattokinase --query "gut bacteria microscope"
 *   node scripts/download-pexels.mjs --id natto-nattokinase --count 3
 *
 * Requires .env.local:
 *   PEXELS_API_KEY=...
 *
 * 出力:
 *   out/pexels/{id}/clip-0.mp4
 *   out/pexels/{id}/clip-1.mp4
 *   ...
 *   out/pexels/{id}/merged.mp4   ← combine-sources.mjs で使用
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

  if (idIdx === -1) {
    console.log(`
Pexels ストック映像ダウンローダー
  node scripts/download-pexels.mjs --id <video-id>
  node scripts/download-pexels.mjs --id <video-id> --query "gut bacteria microscope"
  node scripts/download-pexels.mjs --id <video-id> --count 3

Requires .env.local:
  PEXELS_API_KEY=...   (https://www.pexels.com/api/ で無料取得)

出力:
  out/pexels/{id}/clip-0.mp4 ...
  out/pexels/{id}/merged.mp4  ← combine-sources.mjs が自動的に使用
    `);
    process.exit(0);
  }

  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey || apiKey.startsWith('ここに')) {
    console.error('❌ PEXELS_API_KEY が .env.local に設定されていません');
    console.error('   https://www.pexels.com/api/ で無料取得してください');
    process.exit(1);
  }

  const id    = args[idIdx + 1];
  const count = countIdx !== -1 ? parseInt(args[countIdx + 1]) : 2;
  const outDir = resolve(ROOT, `out/pexels/${id}`);

  // props 読み込み
  const propsPath = resolve(ROOT, `out/props/${id}.json`);
  if (!existsSync(propsPath)) {
    console.error(`❌ props not found: ${propsPath}`);
    process.exit(1);
  }
  const props = JSON.parse(readFileSync(propsPath, 'utf8'));

  // 検索クエリ決定
  let queries = [];
  if (queryIdx !== -1) {
    queries = [args[queryIdx + 1]];
  } else {
    // axis → デフォルトクエリ
    const axisKey = Object.keys(AXIS_QUERIES).find(k => props.axis?.includes(k)) ?? 'default';
    queries = AXIS_QUERIES[axisKey].slice(0, 3);

    // タグから追加クエリ
    if (props.tags?.length) {
      const tagQuery = props.tags.slice(0, 2).join(' ') + ' science';
      queries.unshift(tagQuery);
    }
  }

  console.log(`\n📹 Pexels ダウンロード: ${id}`);
  console.log(`   axis   : ${props.axis ?? '(未設定)'}`);
  console.log(`   queries: ${queries.slice(0, 2).join(' / ')}`);
  console.log(`   count  : ${count}本`);

  mkdirSync(outDir, { recursive: true });

  // 既存の merged.mp4 があればスキップ
  const mergedPath = resolve(outDir, 'merged.mp4');
  if (existsSync(mergedPath)) {
    console.log(`⏭  キャッシュあり: ${mergedPath}`);
    process.exit(0);
  }

  // 検索 & ダウンロード
  const downloaded = [];

  for (const query of queries) {
    if (downloaded.length >= count) break;

    console.log(`\n🔍 検索: "${query}"`);

    let data;
    try {
      data = await searchPexels(query, apiKey, 15);
    } catch (e) {
      console.warn(`   ⚠️  ${e.message}`);
      continue;
    }

    const videos = data.videos ?? [];
    console.log(`   ${videos.length}件ヒット`);

    for (const video of videos) {
      if (downloaded.length >= count) break;

      const file = pickVideoFile(video);
      if (!file) continue;

      const clipPath = resolve(outDir, `clip-${downloaded.length}.mp4`);

      // すでにダウンロード済みならスキップ
      if (existsSync(clipPath)) {
        console.log(`   ⏭  clip-${downloaded.length}.mp4 (キャッシュ)`);
        downloaded.push(clipPath);
        continue;
      }

      try {
        process.stdout.write(`   ⬇  clip-${downloaded.length}.mp4 (${file.width}×${file.height}) ... `);
        await downloadFile(file.link, clipPath);
        console.log('✅');
        downloaded.push(clipPath);
      } catch (e) {
        console.log(`❌ ${e.message}`);
      }
    }
  }

  if (downloaded.length === 0) {
    console.error('\n❌ 動画をダウンロードできませんでした');
    process.exit(1);
  }

  // クリップを結合
  if (downloaded.length === 1) {
    // 1本だけならそのままリネーム
    const { copyFileSync } = await import('fs');
    copyFileSync(downloaded[0], mergedPath);
  } else {
    console.log(`\n🔧 ${downloaded.length}本を結合中...`);
    try {
      mergeClips(downloaded, mergedPath);
    } catch (e) {
      console.error(`❌ ffmpeg結合失敗: ${e.message}`);
      process.exit(1);
    }
  }

  const { statSync } = await import('fs');
  const size = statSync(mergedPath).size;
  console.log(`\n✅ merged.mp4 完成: ${(size / 1024 / 1024).toFixed(1)} MB`);
  console.log(`   → combine-sources.mjs で自動的に使用されます`);
}

main().catch((e) => { console.error(`❌ ${e.message}`); process.exit(1); });
