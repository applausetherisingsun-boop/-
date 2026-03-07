#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — TTS (Google AI Studio Gemini / OpenAI fallback)
 *
 * Usage:
 *   node scripts/generate-tts.mjs --id natto-nattokinase
 *   node scripts/generate-tts.mjs --id natto-nattokinase --voice Erinome
 *   node scripts/generate-tts.mjs --id natto-nattokinase --engine openai --voice nova
 *
 * Requires .env.local:
 *   GOOGLE_AI_STUDIO_API_KEY=AIzaSy...   (Gemini TTS ← 優先)
 *   OPENAI_API_KEY=sk-...                (fallback)
 *
 * Gemini ボイス一覧 (2.5 TTS):
 *   Erinome   女性・自然    ← デフォルト
 *   Aoede     女性・明るい
 *   Charon    男性・落ち着き
 *   Fenrir    男性・力強い
 *   Kore      女性・柔らか
 *   Leda      女性・温かみ
 *   Orus      男性・低音
 *   Puck      男性・若め
 *   Zephyr    女性・爽やか
 *
 * OpenAI ボイス一覧 (fallback):
 *   onyx    男性・落ち着き
 *   nova    女性・自然
 *   echo    男性・若め
 *   shimmer 女性・明るい
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync, unlinkSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── WAV ヘッダー生成（PCM raw → WAV） ────────────────────────────────────────

function pcmToWav(pcmBuffer, sampleRate = 24000, channels = 1, bitDepth = 16) {
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);                                   // PCM
  header.writeUInt16LE(channels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * channels * (bitDepth / 8), 28);
  header.writeUInt16LE(channels * (bitDepth / 8), 32);
  header.writeUInt16LE(bitDepth, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);
  return Buffer.concat([header, pcmBuffer]);
}

// ── Gemini TTS ────────────────────────────────────────────────────────────────

async function generateTTSGemini({ id, transcript, voice = 'Erinome', style = 'calm, clear, friendly, natural' }) {
  const apiKey = process.env.GOOGLE_AI_STUDIO_API_KEY;
  if (!apiKey || apiKey.startsWith('ここに')) throw new Error('GOOGLE_AI_STUDIO_API_KEY not set');

  const model = 'gemini-2.5-pro-preview-tts';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  console.log(`🎙 Gemini TTS: ${id} (voice: ${voice})`);

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `[Style: ${style}] ${transcript.replace(/\n/g, '')}` }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini TTS error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const pcmBase64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!pcmBase64) throw new Error('Gemini TTS: no audio data in response');

  const pcmBuffer = Buffer.from(pcmBase64, 'base64');
  const wavBuffer = pcmToWav(pcmBuffer, 24000, 1, 16);

  mkdirSync(resolve(ROOT, 'public/audio'), { recursive: true });
  const wavPath = resolve(ROOT, `public/audio/${id}_temp.wav`);
  const mp3Path = resolve(ROOT, `public/audio/${id}.mp3`);

  writeFileSync(wavPath, wavBuffer);

  try {
    execSync(`ffmpeg -y -i "${wavPath}" -codec:a libmp3lame -b:a 128k "${mp3Path}"`, { stdio: 'pipe' });
  } finally {
    if (existsSync(wavPath)) unlinkSync(wavPath);
  }

  const kb = (Buffer.byteLength(pcmBase64, 'base64') / 1024).toFixed(0);
  console.log(`✅ Audio: public/audio/${id}.mp3 (${kb} KB PCM → MP3)`);
  return `audio/${id}.mp3`;
}

// ── OpenAI TTS (fallback) ─────────────────────────────────────────────────────

async function generateTTSOpenAI({ id, transcript, voice = 'onyx', speed = 1.1 }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.startsWith('ここに')) throw new Error('OPENAI_API_KEY not set');

  // Google Neural2 ボイス名が渡された場合はマッピング
  const voiceMap = {
    'ja-JP-Neural2-B': 'onyx',
    'ja-JP-Neural2-C': 'nova',
    'ja-JP-Neural2-D': 'echo',
  };
  const openaiVoice = voiceMap[voice] ?? voice;

  console.log(`🎙 OpenAI TTS: ${id} (voice: ${openaiVoice})`);

  const res = await fetch('https://api.openai.com/v1/audio/speech', {
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

  mkdirSync(resolve(ROOT, 'public/audio'), { recursive: true });
  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(resolve(ROOT, `public/audio/${id}.mp3`), buffer);

  const kb = (buffer.length / 1024).toFixed(0);
  console.log(`✅ Audio: public/audio/${id}.mp3 (${kb} KB)`);
  return `audio/${id}.mp3`;
}

// ── 公開 API ──────────────────────────────────────────────────────────────────

/**
 * TTS で MP3 を生成する
 * GOOGLE_AI_STUDIO_API_KEY があれば Gemini TTS を使用、なければ OpenAI TTS にフォールバック
 *
 * @param {object} opts
 * @param {string} opts.id         - 動画ID
 * @param {string} opts.transcript - 読み上げるテキスト
 * @param {string} [opts.voice]    - ボイス名 (Gemini: Erinome / OpenAI: onyx)
 * @param {string} [opts.engine]   - "gemini" | "openai" | "auto" (デフォルト: auto)
 * @param {string} [opts.style]    - Gemini スタイル指示文
 * @returns {Promise<string>} "audio/{id}.mp3"
 */
export async function generateTTS({
  id,
  transcript,
  voice,
  engine = 'auto',
  style,
}) {
  const outputPath = resolve(ROOT, `public/audio/${id}.mp3`);
  if (existsSync(outputPath)) {
    console.log(`⏭  TTS cached: public/audio/${id}.mp3`);
    return `audio/${id}.mp3`;
  }

  const hasGemini = process.env.GOOGLE_AI_STUDIO_API_KEY && !process.env.GOOGLE_AI_STUDIO_API_KEY.startsWith('ここに');
  const hasOpenAI = process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.startsWith('ここに');

  const useGemini = engine === 'gemini' || (engine === 'auto' && hasGemini);

  if (useGemini) {
    return generateTTSGemini({
      id,
      transcript,
      voice: voice ?? 'Erinome',
      ...(style ? { style } : {}),
    });
  }

  if (hasOpenAI) {
    return generateTTSOpenAI({ id, transcript, voice: voice ?? 'onyx' });
  }

  throw new Error('TTS: GOOGLE_AI_STUDIO_API_KEY または OPENAI_API_KEY が必要です');
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
  const idIdx     = args.findIndex((a) => a === '--id');
  const voiceIdx  = args.findIndex((a) => a === '--voice');
  const engineIdx = args.findIndex((a) => a === '--engine');
  const styleIdx  = args.findIndex((a) => a === '--style');

  if (idIdx === -1) {
    console.log(`
Gemini TTS / OpenAI TTS
  node scripts/generate-tts.mjs --id <video-id>
  node scripts/generate-tts.mjs --id <video-id> --voice Erinome
  node scripts/generate-tts.mjs --id <video-id> --engine openai --voice nova
  node scripts/generate-tts.mjs --id <video-id> --style "calm, deep, authoritative"

Gemini ボイス: Erinome(デフォルト) Aoede Charon Fenrir Kore Leda Orus Puck Zephyr
OpenAI ボイス: onyx nova echo shimmer alloy fable

Input:  out/props/{id}.json の transcriptJa (なければ transcript)
Output: public/audio/{id}.mp3
    `);
    process.exit(1);
  }

  const id     = args[idIdx + 1];
  const voice  = voiceIdx  !== -1 ? args[voiceIdx + 1]  : undefined;
  const engine = engineIdx !== -1 ? args[engineIdx + 1] : 'auto';
  const style  = styleIdx  !== -1 ? args[styleIdx + 1]  : undefined;

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

  generateTTS({ id, transcript: text, voice, engine, style })
    .catch((e) => { console.error(`❌ ${e.message}`); process.exit(1); });
}
