#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — Google Cloud Speech-to-Text 字幕タイミング生成
 *
 * OpenAI Whisper から Google Cloud Speech-to-Text (ja-JP) に切り替え。
 * TTS と同じ GOOGLE_TTS_API_KEY を使用（同一GCPプロジェクト）。
 *
 * セットアップ:
 *   Google Cloud Console → APIとサービス → 「Cloud Speech-to-Text API」を有効化
 *   （TTS用APIキーと同じキーで動作、追加費用 ~$0.024/動画）
 *
 * Usage:
 *   node scripts/generate-captions.mjs --id natto-nattokinase
 *
 * Input:  public/audio/{id}.mp3
 * Output: out/props/{id}.json に captions フィールドを追加
 *
 * captions 形式:
 *   [{ word: "腸内細菌", start: 0.0, end: 0.45 }, ...]
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const STT_ENDPOINT = 'https://speech.googleapis.com/v1p1beta1/speech:recognize';

/**
 * Google Cloud STT で単語タイムスタンプを取得する
 * @param {string} audioPath - 音声ファイルの絶対パス (MP3)
 * @returns {Promise<Array<{word: string, start: number, end: number}>>}
 */
export async function generateCaptions(audioPath) {
  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) throw new Error('GOOGLE_TTS_API_KEY not set in .env.local');

  if (!existsSync(audioPath)) {
    throw new Error(`Audio file not found: ${audioPath}`);
  }

  console.log(`🎤 Google STT: analyzing ${audioPath.split('/').pop()}`);

  // MP3 を base64 でインラインリクエスト（60秒・10MB以内なら同期APIで可）
  const audioBuffer = readFileSync(audioPath);
  const audioBase64 = audioBuffer.toString('base64');

  const body = {
    config: {
      encoding: 'MP3',
      languageCode: 'ja-JP',
      enableWordTimeOffsets: true,
      model: 'latest_long',        // 日本語長尺で最高精度
      useEnhanced: true,           // 拡張モデル（精度向上）
    },
    audio: {
      content: audioBase64,
    },
  };

  const res = await fetch(`${STT_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    // Speech-to-Text API が有効化されていない場合のわかりやすいエラー
    if (err.includes('SERVICE_DISABLED') || err.includes('has not been used')) {
      throw new Error(
        'Cloud Speech-to-Text API が有効化されていません。\n' +
        'Google Cloud Console → APIとサービス → 「Cloud Speech-to-Text API」を有効化してください。'
      );
    }
    throw new Error(`Google STT error ${res.status}: ${err}`);
  }

  const data = await res.json();

  // results[] → alternatives[0].words[] に単語タイムスタンプが入る
  const words = [];
  for (const result of data.results ?? []) {
    const alt = result.alternatives?.[0];
    for (const w of alt?.words ?? []) {
      words.push({
        word: w.word,
        start: Number(parseFloat(w.startTime ?? '0').toFixed(3)),
        end: Number(parseFloat(w.endTime ?? '0').toFixed(3)),
      });
    }
  }

  const transcript = (data.results ?? [])
    .map((r) => r.alternatives?.[0]?.transcript ?? '')
    .join('');
  console.log(`✅ Captions: ${words.length} words | "${transcript.slice(0, 30)}..."`);
  return words;
}

/**
 * out/props/{id}.json に captions を書き込む
 */
export function saveCaptionsToProps(id, captions) {
  const propsPath = resolve(ROOT, `out/props/${id}.json`);
  if (!existsSync(propsPath)) {
    throw new Error(`Props file not found: ${propsPath}  → 先に generate-video.mjs を実行してください`);
  }
  const props = JSON.parse(readFileSync(propsPath, 'utf8'));
  props.captions = captions;
  writeFileSync(propsPath, JSON.stringify(props, null, 2), 'utf8');
  console.log(`📝 Saved captions to: out/props/${id}.json`);
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
  const idIdx = args.findIndex((a) => a === '--id');
  if (idIdx === -1) {
    console.log('Usage: node scripts/generate-captions.mjs --id <video-id>');
    process.exit(1);
  }

  const id = args[idIdx + 1];
  const audioPath = resolve(ROOT, `public/audio/${id}.mp3`);

  generateCaptions(audioPath)
    .then((captions) => saveCaptionsToProps(id, captions))
    .catch((e) => { console.error(`❌ ${e.message}`); process.exit(1); });
}
