#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — Whisper Caption Generator
 *
 * OpenAI Whisper APIを使って音声ファイルから単語レベルのタイムスタンプを取得する。
 * Remotion の KaraokeOverlay に渡すことでフレーム精度の字幕同期を実現。
 *
 * Usage:
 *   node scripts/generate-captions.mjs --id natto-nattokinase
 *
 * Input:  public/audio/{id}.mp3
 * Output: out/props/{id}.json に captions フィールドを追加
 *
 * captions 形式:
 *   [{ word: "Hello", start: 0.0, end: 0.32 }, ...]
 */

import { createReadStream, readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

/**
 * Whisper API で単語タイムスタンプを取得する
 * @param {string} audioPath - 音声ファイルの絶対パス
 * @returns {Promise<Array<{word: string, start: number, end: number}>>}
 */
export async function generateCaptions(audioPath) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set in .env.local');

  if (!existsSync(audioPath)) {
    throw new Error(`Audio file not found: ${audioPath}`);
  }

  console.log(`🎤 Whisper: analyzing ${audioPath.split('/').pop()}`);

  // multipart/form-data を手動で構築（Node.js 内蔵fetch対応）
  const boundary = `----FormBoundary${Math.random().toString(36).slice(2)}`;
  const audioBuffer = readFileSync(audioPath);
  const filename = audioPath.split('/').pop();

  const formParts = [
    `--${boundary}\r\nContent-Disposition: form-data; name="model"\r\n\r\nwhisper-1`,
    `--${boundary}\r\nContent-Disposition: form-data; name="response_format"\r\n\r\nverbose_json`,
    `--${boundary}\r\nContent-Disposition: form-data; name="timestamp_granularities[]"\r\n\r\nword`,
    `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: audio/mpeg\r\n\r\n`,
  ];

  const formPrefix = Buffer.from(formParts.join('\r\n') + '\r\n');
  const formSuffix = Buffer.from(`\r\n--${boundary}--\r\n`);
  const body = Buffer.concat([formPrefix, audioBuffer, formSuffix]);

  const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': String(body.length),
    },
    body,
  });

  if (!res.ok) {
    throw new Error(`Whisper API ${res.status}: ${await res.text()}`);
  }

  const data = await res.json();

  // verbose_json は words[] に単語タイムスタンプを持つ
  const words = (data.words ?? []).map((w) => ({
    word: w.word.replace(/^\s+/, ''), // 先頭スペースを除去
    start: Number(w.start.toFixed(3)),
    end: Number(w.end.toFixed(3)),
  }));

  console.log(`✅ Captions: ${words.length} words (${data.text?.split(' ').length ?? 0} text words)`);
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
