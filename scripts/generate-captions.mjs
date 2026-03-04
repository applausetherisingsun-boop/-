#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — OpenAI Whisper 字幕タイミング生成
 *
 * Usage:
 *   node scripts/generate-captions.mjs --id natto-nattokinase
 *
 * Requires .env.local:
 *   OPENAI_API_KEY=sk-...
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

/**
 * OpenAI Whisper で単語タイムスタンプを取得する
 * @param {string} audioPath - 音声ファイルの絶対パス (MP3)
 * @returns {Promise<Array<{word: string, start: number, end: number}>>}
 */
export async function generateCaptions(audioPath) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set in .env.local');

  if (!existsSync(audioPath)) {
    throw new Error(`Audio file not found: ${audioPath}`);
  }

  console.log(`🎤 OpenAI Whisper: analyzing ${audioPath.split('/').pop()}`);

  const audioBuffer = readFileSync(audioPath);
  const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });

  const formData = new FormData();
  formData.append('file', blob, 'audio.mp3');
  formData.append('model', 'whisper-1');
  formData.append('language', 'ja');
  formData.append('response_format', 'verbose_json');
  formData.append('timestamp_granularities[]', 'word');

  const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI Whisper error ${res.status}: ${err}`);
  }

  const data = await res.json();

  const words = (data.words ?? []).map((w) => ({
    word: w.word,
    start: Number(w.start.toFixed(3)),
    end: Number(w.end.toFixed(3)),
  }));

  const preview = data.text?.slice(0, 30) ?? '';
  console.log(`✅ Captions: ${words.length} words | "${preview}..."`);
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
