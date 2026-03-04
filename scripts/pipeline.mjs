#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — One-Command Production Pipeline
 *
 *  ① Claude API   → 台本・データ生成 (claude-sonnet-4-6)
 *  ② OpenAI TTS   → ナレーション音声 MP3 (public/audio/)
 *  ③ Whisper API  → 単語タイムスタンプ → カラオケ字幕同期
 *  ④ Remotion     → MP4レンダリング 1080×1920
 *  ⑤ YouTube API  → Shorts 自動投稿 (--upload フラグ時)
 *
 * Usage:
 *   node scripts/pipeline.mjs --topic "腸内細菌と長寿"
 *   node scripts/pipeline.mjs --all               # 20本まとめて
 *   node scripts/pipeline.mjs --no-tts            # 音声なし（字幕もスキップ）
 *   node scripts/pipeline.mjs --no-render         # 生成のみ
 *   node scripts/pipeline.mjs --upload            # レンダー後 YouTube に自動投稿
 *   node scripts/pipeline.mjs --upload --private  # 限定公開で投稿
 *   node scripts/pipeline.mjs --upload --schedule "2026-03-10T09:00:00+09:00"
 *
 * Requires .env.local:
 *   ANTHROPIC_API_KEY=sk-ant-...   (台本生成)
 *   OPENAI_API_KEY=sk-...          (TTS + Whisper)
 *   YOUTUBE_CLIENT_ID=...          (投稿時のみ)
 *   YOUTUBE_CLIENT_SECRET=...      (投稿時のみ)
 *   YOUTUBE_REFRESH_TOKEN=...      (投稿時のみ)
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

function updateProps(id, updates) {
  const propsPath = resolve(ROOT, `out/props/${id}.json`);
  if (!existsSync(propsPath)) return;
  const props = JSON.parse(readFileSync(propsPath, 'utf8'));
  Object.assign(props, updates);
  writeFileSync(propsPath, JSON.stringify(props, null, 2), 'utf8');
}

// 後方互換: audioFile のみ更新
function updatePropsWithAudio(id, audioFile) {
  updateProps(id, { audioFile });
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

async function processTopic(topic, { doTTS, doRender, doUpload, uploadPrivate, scheduledAt }) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`📽  ${topic}`);

  // ① 台本生成 (Claude API)
  const { generateVideo, saveProps } = await import('./generate-video.mjs');
  const { data, propsPath } = await generateVideo(topic);

  // ② TTS (OpenAI → public/audio/)
  let audioFile = null;
  if (doTTS && data.transcript) {
    audioFile = await generateTTS(data.id, data.transcript);
    if (audioFile) updatePropsWithAudio(data.id, audioFile);
  }

  // ③ Whisper カラオケ字幕生成
  if (doTTS && audioFile) {
    const audioPath = resolve(ROOT, `public/${audioFile}`);
    if (existsSync(audioPath)) {
      try {
        const { generateCaptions, saveCaptionsToProps } = await import('./generate-captions.mjs');
        const captions = await generateCaptions(audioPath);
        saveCaptionsToProps(data.id, captions);
        console.log(`🎤 Captions: ${captions.length} words synced`);
      } catch (e) {
        console.warn(`⚠️  Captions skipped: ${e.message}`);
      }
    }
  }

  // ④ Remotion レンダリング
  let mp4Path = null;
  if (doRender) {
    mp4Path = renderVideo(data.id, propsPath);
  }

  // ⑤ YouTube 投稿
  if (doUpload && mp4Path) {
    try {
      const { uploadToYouTube } = await import('./upload-youtube.mjs');
      const props = JSON.parse(readFileSync(propsPath, 'utf8'));
      const { videoId, url } = await uploadToYouTube({
        videoPath: mp4Path,
        title: props.title,
        description: props.description,
        tags: props.tags ?? [],
        privacyStatus: uploadPrivate ? 'private' : 'public',
        scheduledAt: scheduledAt ?? null,
      });
      updateProps(data.id, { youtubeId: videoId, youtubeUrl: url });
    } catch (e) {
      console.error(`❌ YouTube upload failed: ${e.message}`);
    }
  }

  return data.id;
}

async function main() {
  const args = process.argv.slice(2);
  const topicIdx    = args.findIndex((a) => a === '--topic');
  const doAll       = args.includes('--all');
  const noTTS       = args.includes('--no-tts');
  const noRender    = args.includes('--no-render');
  const doUpload    = args.includes('--upload');
  const uploadPrivate = args.includes('--private');
  const schedIdx    = args.findIndex((a) => a === '--schedule');
  const scheduledAt = schedIdx !== -1 ? args[schedIdx + 1] : null;

  if (!doAll && topicIdx === -1) {
    console.log(`
SHIROKUMA Shorts Pipeline
══════════════════════════════════════════════════════════════
  node scripts/pipeline.mjs --topic "トピック"           1本生成
  node scripts/pipeline.mjs --all                       20本まとめて
  node scripts/pipeline.mjs --all --no-tts              音声・字幕なし
  node scripts/pipeline.mjs --all --no-render           データのみ
  node scripts/pipeline.mjs --topic "..." --upload      生成後 YouTube 投稿
  node scripts/pipeline.mjs --topic "..." --upload --private
  node scripts/pipeline.mjs --topic "..." --upload --schedule "2026-03-10T09:00:00+09:00"

必要な環境変数 (.env.local):
  ANTHROPIC_API_KEY=sk-ant-...   (台本生成 ← Claude API)
  OPENAI_API_KEY=sk-...          (TTS + Whisper字幕)
  YOUTUBE_CLIENT_ID=...          (投稿時のみ)
  YOUTUBE_CLIENT_SECRET=...      (投稿時のみ)
  YOUTUBE_REFRESH_TOKEN=...      (投稿時のみ → --auth で取得)

初回 YouTube 認可:
  node scripts/upload-youtube.mjs --auth

出力: out/mp4/shorts-{id}.mp4 → YouTube Shorts / TikTok / Reels
    `);
    process.exit(0);
  }

  const { TOPIC_SEEDS } = await import('./generate-video.mjs');
  const topics = doAll
    ? TOPIC_SEEDS
    : [args[topicIdx + 1]];

  const opts = {
    doTTS:    !noTTS,
    doRender: !noRender,
    doUpload,
    uploadPrivate,
    scheduledAt,
  };

  console.log(`\n🚀 SHIROKUMA Shorts Pipeline`);
  console.log(`   Topics: ${topics.length} | TTS: ${opts.doTTS} | Render: ${opts.doRender} | Upload: ${opts.doUpload}\n`);

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
    if (!opts.doUpload) {
      console.log(`📤 YouTube投稿するには --upload フラグを追加してください`);
    }
  }
}

main().catch(console.error);
