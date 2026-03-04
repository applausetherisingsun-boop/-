#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — One-Command Production Pipeline
 *
 *  ① Claude API  → 台本・データ生成
 *  ② OpenAI TTS  → ナレーション音声 (MP3)
 *  ③ Remotion    → MP4レンダリング (1080×1920)
 *  ④ out/mp4/    → YouTubeにそのままアップロード可能
 *
 * Usage:
 *   node scripts/pipeline.mjs --topic "腸内細菌と長寿"
 *   node scripts/pipeline.mjs --all          # 20本まとめて
 *   node scripts/pipeline.mjs --no-tts       # 音声なし
 *   node scripts/pipeline.mjs --no-render    # 生成のみ（レンダーなし）
 *
 * Requires .env.local:
 *   ANTHROPIC_API_KEY=sk-ant-...
 *   OPENAI_API_KEY=sk-...           (TTSを使う場合)
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(new URL(import.meta.url).pathname);
const ROOT = resolve(__dirname, '..');

// Load .env.local
function loadEnv() {
  const envPath = resolve(ROOT, '.env.local');
  if (existsSync(envPath)) {
    const lines = readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
    }
  }
}
loadEnv();

// ── Helpers ───────────────────────────────────────────────────────────────────

function run(command) {
  try {
    execSync(command, { stdio: 'inherit', cwd: ROOT });
    return true;
  } catch {
    return false;
  }
}

async function generateTTS(id, transcript, voice = 'nova') {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log('⚠️  OPENAI_API_KEY not set → skipping TTS');
    return null;
  }

  mkdirSync(resolve(ROOT, 'public/audio'), { recursive: true });
  const outputPath = resolve(ROOT, `public/audio/${id}.mp3`);

  if (existsSync(outputPath)) {
    console.log(`⏭  TTS cached: ${id}.mp3`);
    return `audio/${id}.mp3`;
  }

  console.log(`🎙  TTS: ${id} (${transcript.split(' ').length} words)`);

  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'tts-1-hd',
      input: transcript,
      voice,   // nova = natural female, onyx = deep male, alloy = neutral
      speed: 1.1,
    }),
  });

  if (!res.ok) {
    console.error(`❌ TTS error ${res.status}: ${await res.text()}`);
    return null;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(outputPath, buf);
  console.log(`✅ Audio: public/audio/${id}.mp3`);
  return `audio/${id}.mp3`;
}

function updatePropsWithAudio(id, audioFile) {
  const propsPath = resolve(ROOT, `out/props/${id}.json`);
  if (!existsSync(propsPath)) return;
  const props = JSON.parse(readFileSync(propsPath, 'utf8'));
  props.audioFile = audioFile;
  writeFileSync(propsPath, JSON.stringify(props, null, 2), 'utf8');
}

function renderVideo(id, propsPath) {
  mkdirSync(resolve(ROOT, 'out/mp4'), { recursive: true });
  const mp4 = resolve(ROOT, `out/mp4/shorts-${id}.mp4`);

  if (existsSync(mp4)) {
    console.log(`⏭  Already rendered: shorts-${id}.mp4`);
    return mp4;
  }

  const ok = run(
    `npx remotion render remotion/index.ts shorts-${id} "${mp4}" --codec=h264 --props="${propsPath}"`
  );
  if (ok) {
    console.log(`✅ MP4: out/mp4/shorts-${id}.mp4`);
    return mp4;
  }
  console.error(`❌ Render failed: ${id}`);
  return null;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function processTopic(topic, { doTTS, doRender }) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`📽  ${topic}`);

  // ① Generate
  const { generateVideo, saveProps } = await import('./generate-video.mjs');
  const { data, propsPath } = await generateVideo(topic);

  // ② TTS
  let audioFile = null;
  if (doTTS && data.transcript) {
    audioFile = await generateTTS(data.id, data.transcript);
    if (audioFile) updatePropsWithAudio(data.id, audioFile);
  }

  // ③ Render
  if (doRender) {
    renderVideo(data.id, propsPath);
  }

  return data.id;
}

async function main() {
  const args = process.argv.slice(2);
  const topicIdx = args.findIndex((a) => a === '--topic');
  const doAll    = args.includes('--all');
  const noTTS    = args.includes('--no-tts');
  const noRender = args.includes('--no-render');

  if (!doAll && topicIdx === -1) {
    console.log(`
SHIROKUMA Shorts Pipeline
══════════════════════════
  node scripts/pipeline.mjs --topic "トピック"   1本生成
  node scripts/pipeline.mjs --all               20本まとめて
  node scripts/pipeline.mjs --all --no-tts      音声なし
  node scripts/pipeline.mjs --all --no-render   データのみ

必要な環境変数 (.env.local):
  ANTHROPIC_API_KEY=sk-ant-...   (台本生成)
  OPENAI_API_KEY=sk-...          (音声生成、省略可)

出力: out/mp4/shorts-{id}.mp4 → YouTubeにそのままアップ可
    `);
    process.exit(0);
  }

  const { TOPIC_SEEDS } = await import('./generate-video.mjs');
  const topics = doAll
    ? TOPIC_SEEDS
    : [args[topicIdx + 1]];

  const opts = { doTTS: !noTTS, doRender: !noRender };

  console.log(`\n🚀 SHIROKUMA Shorts Pipeline`);
  console.log(`   Topics: ${topics.length} | TTS: ${opts.doTTS} | Render: ${opts.doRender}\n`);

  mkdirSync(resolve(ROOT, 'out/mp4'), { recursive: true });
  mkdirSync(resolve(ROOT, 'out/props'), { recursive: true });
  mkdirSync(resolve(ROOT, 'public/audio'), { recursive: true });

  const results = [];
  for (const topic of topics) {
    try {
      const id = await processTopic(topic, opts);
      results.push({ topic, id, ok: true });
    } catch (e) {
      console.error(`❌ Failed: ${topic}\n   ${e.message}`);
      results.push({ topic, ok: false });
    }
    // Rate limiting
    if (topics.length > 1) await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`🏁 Pipeline complete!\n`);
  console.log(`✅ Success: ${results.filter((r) => r.ok).length}/${results.length}`);
  if (opts.doRender) {
    console.log(`📁 MP4 files: out/mp4/`);
    console.log(`📤 Ready to upload to YouTube Shorts / TikTok / Instagram Reels`);
  }
}

main().catch(console.error);
