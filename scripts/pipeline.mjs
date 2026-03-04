#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — One-Command Production Pipeline
 *
 *  ① Claude API       → 台本・データ生成 (claude-sonnet-4-6)
 *  ② Google TTS Neural2→ 日本語ナレーション MP3 ja-JP-Neural2 (public/audio/)
 *  ③ Google STT       → 単語タイムスタンプ → カラオケ字幕同期 (ja-JP)
 *  ④ Remotion          → MP4レンダリング 1080×1920
 *  ⑤ YouTube API       → Shorts 自動投稿 (--upload フラグ時)
 *
 * Usage:
 *   node scripts/pipeline.mjs --topic "腸内細菌と長寿"
 *   node scripts/pipeline.mjs --all                   # 20本まとめて
 *   node scripts/pipeline.mjs --no-tts                # 音声なし（字幕もスキップ）
 *   node scripts/pipeline.mjs --no-render             # 生成のみ
 *   node scripts/pipeline.mjs --upload                # レンダー後 YouTube に自動投稿
 *   node scripts/pipeline.mjs --upload --private      # 限定公開で投稿
 *   node scripts/pipeline.mjs --upload --schedule "2026-03-10T09:00:00+09:00"
 *   node scripts/pipeline.mjs --voice ja-JP-Neural2-C # 女性ボイスに変更
 *
 * Requires .env.local:
 *   ANTHROPIC_API_KEY=sk-ant-...   (台本生成)
 *   GOOGLE_TTS_API_KEY=AIza...     (音声生成 ← Google Cloud Console で取得)
 *   # OPENAI_API_KEY 不要 → Google STT に統一
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

// TTS は generate-tts.mjs (Google Cloud TTS Neural2) に委譲
// processTopic() 内で動的 import して呼ぶ

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

async function processTopic(topic, { doTTS, doRender, doUpload, uploadPrivate, scheduledAt, voice }) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`📽  ${topic}`);

  // ① 台本生成 (Claude API claude-sonnet-4-6)
  const { generateVideo } = await import('./generate-video.mjs');
  const { data, propsPath } = await generateVideo(topic);

  // ② TTS (Google Cloud TTS Neural2 → public/audio/)
  //    transcriptJa(日本語)を優先、なければ transcript にフォールバック
  let audioFile = null;
  const ttsText = data.transcriptJa ?? data.transcript;
  if (doTTS && ttsText) {
    try {
      const { generateTTS } = await import('./generate-tts.mjs');
      audioFile = await generateTTS({ id: data.id, transcript: ttsText, ...(voice ? { voice } : {}) });
    } catch (e) {
      if (!process.env.GOOGLE_TTS_API_KEY) {
        console.warn('⚠️  GOOGLE_TTS_API_KEY not set → TTS skipped');
      } else {
        console.error(`❌ TTS failed: ${e.message}`);
      }
    }
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
  const topicIdx      = args.findIndex((a) => a === '--topic');
  const doAll         = args.includes('--all');
  const noTTS         = args.includes('--no-tts');
  const noRender      = args.includes('--no-render');
  const doUpload      = args.includes('--upload');
  const uploadPrivate = args.includes('--private');
  const schedIdx      = args.findIndex((a) => a === '--schedule');
  const scheduledAt   = schedIdx !== -1 ? args[schedIdx + 1] : null;
  const voiceIdx      = args.findIndex((a) => a === '--voice');
  const voice         = voiceIdx !== -1 ? args[voiceIdx + 1] : 'ja-JP-Neural2-B';

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
  node scripts/pipeline.mjs --topic "..." --voice ja-JP-Neural2-C  # 女性ボイス

TTS ボイス (Google Cloud Neural2 ja-JP):
  ja-JP-Neural2-B  男性・落ち着き  ← デフォルト
  ja-JP-Neural2-C  女性・自然
  ja-JP-Neural2-D  男性・若め

必要な環境変数 (.env.local):
  ANTHROPIC_API_KEY=sk-ant-...   (台本生成 ← Claude API)
  GOOGLE_TTS_API_KEY=AIza...     (音声生成 ← Google Cloud Console)
  OPENAI_API_KEY=sk-...          (Whisper字幕同期)
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
    doTTS: !noTTS,
    doRender: !noRender,
    doUpload,
    uploadPrivate,
    scheduledAt,
    voice,
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
