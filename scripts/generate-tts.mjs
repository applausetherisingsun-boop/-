#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — OpenAI TTS
 *
 * Usage:
 *   node scripts/generate-tts.mjs --id natto-nattokinase
 *   node scripts/generate-tts.mjs --id natto-nattokinase --voice nova
 *
 * Requires .env.local:
 *   OPENAI_API_KEY=sk-...
 *
 * ボイス一覧 (OpenAI):
 *   onyx    男性・落ち着き (デフォルト)
 *   nova    女性・自然
 *   echo    男性・若め
 *   alloy   中性
 *   shimmer 女性・明るい
 *   fable   男性・語り口
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const TTS_ENDPOINT = 'https://api.openai.com/v1/audio/speech';

/**
 * OpenAI TTS で MP3 を生成する
 *
 * @param {object} opts
 * @param {string} opts.id         - 動画ID
 * @param {string} opts.transcript - 読み上げるテキスト
 * @param {string} [opts.voice]    - ボイス名 (デフォルト: onyx)
 * @param {number} [opts.speed]    - 読み上げ速度 0.25〜4.0 (デフォルト: 1.1)
 * @returns {Promise<string>} staticFile() 用の相対パス "audio/{id}.mp3"
 */
export async function generateTTS({
  id,
  transcript,
  voice = 'onyx',
  speed = 1.1,
}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set in .env.local');

  // Google Neural2 ボイス名が渡された場合はマッピング
  const voiceMap = {
    'ja-JP-Neural2-B': 'onyx',
    'ja-JP-Neural2-C': 'nova',
    'ja-JP-Neural2-D': 'echo',
  };
  const openaiVoice = voiceMap[voice] ?? voice;

  mkdirSync(resolve(ROOT, 'public/audio'), { recursive: true });
  const outputPath = resolve(ROOT, `public/audio/${id}.mp3`);

  if (existsSync(outputPath)) {
    console.log(`⏭  TTS cached: public/audio/${id}.mp3`);
    return `audio/${id}.mp3`;
  }

  console.log(`🎙 OpenAI TTS: ${id} (voice: ${openaiVoice})`);

  const res = await fetch(TTS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1-hd',
      input: transcript,
      voice: openaiVoice,
      response_format: 'mp3',
      speed,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI TTS error ${res.status}: ${err}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(outputPath, buffer);

  const kb = (buffer.length / 1024).toFixed(0);
  console.log(`✅ Audio: public/audio/${id}.mp3 (${kb} KB)`);
  return `audio/${id}.mp3`;
}

// ── CLI ───────────────────────────────────────────────────────────────────────
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const envPath = resolve(ROOT, '.env.local');
  if (existsSync(envPath)) {
    for (const line of readFileSync(envPath, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...rest] = trimmed.split('=');
      if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
    }
  }

  const args = process.argv.slice(2);
  const idIdx    = args.findIndex((a) => a === '--id');
  const voiceIdx = args.findIndex((a) => a === '--voice');

  if (idIdx === -1) {
    console.log(`
OpenAI TTS
  node scripts/generate-tts.mjs --id <video-id>
  node scripts/generate-tts.mjs --id <video-id> --voice nova

ボイス一覧:
  onyx    男性・落ち着き (デフォルト)
  nova    女性・自然
  echo    男性・若め
  alloy   中性
  shimmer 女性・明るい

Input:  out/props/{id}.json の transcriptJa (なければ transcript)
Output: public/audio/{id}.mp3
    `);
    process.exit(1);
  }

  const id    = args[idIdx + 1];
  const voice = voiceIdx !== -1 ? args[voiceIdx + 1] : undefined;

  const propsPath = resolve(ROOT, `out/props/${id}.json`);
  if (!existsSync(propsPath)) {
    console.error(`❌ Props not found: ${propsPath}`);
    process.exit(1);
  }
  const props = JSON.parse(readFileSync(propsPath, 'utf8'));
  const text = props.transcriptJa ?? props.transcript ?? props.description;
  if (!text) {
    console.error('❌ transcript / transcriptJa が props に見つかりません');
    process.exit(1);
  }

  generateTTS({ id, transcript: text, ...(voice ? { voice } : {}) })
    .catch((e) => { console.error(`❌ ${e.message}`); process.exit(1); });
}
