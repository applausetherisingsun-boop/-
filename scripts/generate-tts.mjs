#!/usr/bin/env node
/**
 * TTS Audio Generator
 * Converts video transcript → MP3 via OpenAI TTS
 * Output: out/audio/{id}.mp3
 */

import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

export async function generateTTS({ id, transcript, voice = 'alloy' }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  mkdirSync(resolve(ROOT, 'out/audio'), { recursive: true });
  const outputPath = resolve(ROOT, `out/audio/${id}.mp3`);

  console.log(`🎙 Generating TTS for: ${id} (voice: ${voice})`);

  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1-hd',
      input: transcript,
      voice,           // alloy | echo | fable | onyx | nova | shimmer
      speed: 1.1,      // slightly faster = more engaging
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI TTS error ${res.status}: ${err}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  writeFileSync(outputPath, buffer);
  console.log(`✅ Audio: ${outputPath}`);
  return outputPath;
}

// CLI usage: node scripts/generate-tts.mjs --id natto-nattokinase
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const idIdx = args.findIndex((a) => a === '--id');
  if (idIdx === -1) {
    console.log('Usage: node scripts/generate-tts.mjs --id <video-id>');
    process.exit(1);
  }
  const id = args[idIdx + 1];

  // Load transcript from props file
  const propsPath = resolve(ROOT, `out/props/${id}.json`);
  const props = JSON.parse(readFileSync(propsPath, 'utf8'));

  generateTTS({ id, transcript: props.transcript ?? props.description })
    .catch(console.error);
}
