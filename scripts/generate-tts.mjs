#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — Google Cloud TTS Neural2
 *
 * OpenAI TTS から Google Cloud TTS Neural2 (ja-JP) に切り替え。
 * 日本語ネイティブのピッチアクセント・イントネーションで自然な読み上げを実現。
 *
 * 推奨ボイス:
 *   ja-JP-Neural2-B  男性・落ち着いた科学解説向け  ← デフォルト
 *   ja-JP-Neural2-C  女性・明るく親しみやすい
 *   ja-JP-Neural2-D  男性・若め
 *
 * Usage:
 *   node scripts/generate-tts.mjs --id natto-nattokinase
 *   node scripts/generate-tts.mjs --id natto-nattokinase --voice ja-JP-Neural2-C
 *
 * Requires .env.local:
 *   GOOGLE_TTS_API_KEY=AIza...
 *
 * セットアップ:
 *   1. https://console.cloud.google.com/ → APIとサービス → 認証情報
 *   2. 「APIキーを作成」→ Cloud Text-to-Speech API を制限
 *   3. .env.local に GOOGLE_TTS_API_KEY=AIza... を追加
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const TTS_ENDPOINT = 'https://texttospeech.googleapis.com/v1/text:synthesize';

/**
 * Google Cloud TTS Neural2 で MP3 を生成する
 *
 * @param {object} opts
 * @param {string} opts.id         - 動画ID (ファイル名に使用)
 * @param {string} opts.transcript - 読み上げるテキスト (日本語推奨)
 * @param {string} [opts.voice]    - ボイス名 (デフォルト: ja-JP-Neural2-B)
 * @param {number} [opts.speed]    - 読み上げ速度 0.25〜4.0 (デフォルト: 1.1)
 * @param {number} [opts.pitch]    - ピッチ -20.0〜20.0 (デフォルト: 0.0)
 * @returns {Promise<string>} staticFile() 用の相対パス "audio/{id}.mp3"
 */
export async function generateTTS({
  id,
  transcript,
  voice = 'ja-JP-Neural2-B',
  speed = 1.1,
  pitch = 0.0,
}) {
  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_TTS_API_KEY not set in .env.local');

  // public/audio/ は Remotion の staticFile() が参照するディレクトリ
  mkdirSync(resolve(ROOT, 'public/audio'), { recursive: true });
  const outputPath = resolve(ROOT, `public/audio/${id}.mp3`);

  if (existsSync(outputPath)) {
    console.log(`⏭  TTS cached: public/audio/${id}.mp3`);
    return `audio/${id}.mp3`;
  }

  console.log(`🎙 Google TTS Neural2: ${id} (voice: ${voice})`);

  // 言語コードをボイス名から自動判定 (ja-JP-Neural2-B → ja-JP)
  const languageCode = voice.split('-').slice(0, 2).join('-');

  const body = {
    input: { text: transcript },
    voice: {
      languageCode,
      name: voice,
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: speed,
      pitch,
      // effectsProfileId: ['headphone-class-device'],  // お好みで有効化
    },
  };

  const res = await fetch(`${TTS_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google TTS error ${res.status}: ${err}`);
  }

  const data = await res.json();
  if (!data.audioContent) {
    throw new Error('Google TTS: audioContent が空です。APIキーの権限を確認してください。');
  }

  // レスポンスは base64 エンコードされた MP3
  const buffer = Buffer.from(data.audioContent, 'base64');
  writeFileSync(outputPath, buffer);

  const kb = (buffer.length / 1024).toFixed(0);
  console.log(`✅ Audio: public/audio/${id}.mp3 (${kb} KB)`);
  return `audio/${id}.mp3`; // staticFile() 用の相対パス
}

// ── CLI ───────────────────────────────────────────────────────────────────────
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // .env.local を読み込む
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
Google Cloud TTS Neural2
  node scripts/generate-tts.mjs --id <video-id>
  node scripts/generate-tts.mjs --id <video-id> --voice ja-JP-Neural2-C

ボイス一覧:
  ja-JP-Neural2-B  男性・落ち着き (デフォルト)
  ja-JP-Neural2-C  女性・自然
  ja-JP-Neural2-D  男性・若め

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

  // transcriptJa を優先、なければ transcript にフォールバック
  const text = props.transcriptJa ?? props.transcript ?? props.description;
  if (!text) {
    console.error('❌ transcript / transcriptJa が props に見つかりません');
    process.exit(1);
  }

  generateTTS({ id, transcript: text, ...(voice ? { voice } : {}) })
    .catch((e) => { console.error(`❌ ${e.message}`); process.exit(1); });
}
