#!/usr/bin/env node
/**
 * SHIROKUMA Shorts Auto-Generator
 *
 * Usage:
 *   node scripts/generate-video.mjs --topic "腸内細菌と老化"
 *   node scripts/generate-video.mjs --topic "睡眠と長寿" --render
 *   node scripts/generate-video.mjs --all   # generate all from topics list
 *
 * Requires: ANTHROPIC_API_KEY in .env
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── Config ───────────────────────────────────────────────────────────────────

const API_KEY = process.env.ANTHROPIC_API_KEY;
const VIDEOS_LIB = resolve(ROOT, 'src/lib/videos.ts');

// Viral anti-aging topic seeds
const TOPIC_SEEDS = [
  '腸内細菌の多様性と寿命の関係',
  '睡眠中の記憶固定と老化防止',
  'ポリフェノールが遺伝子を守る仕組み',
  '赤ワインのレスベラトロールと長寿遺伝子サーチュイン',
  '断食で増えるオートファジーの科学',
  '日本人の腸年齢が若い理由',
  '紫外線ダメージとテロメア短縮の関係',
  '筋肉はなぜ最高の抗老化臓器なのか',
  '昆布とフコイダンが炎症を止める仕組み',
  '瞑想で海馬の灰白質が増える科学的証拠',
  '冷水シャワーがノルエピネフリンを300%上げる',
  'セラミドと肌バリア修復の最新科学',
  '週150分の歩行が死亡率を30%下げるデータ',
  '発酵食品が脳腸軸を整えるメカニズム',
  '空腹時間がインスリン感受性を回復させる理由',
  'グリシン（コラーゲン前駆体）と深い睡眠の関係',
  'ミトコンドリアが老化の司令塔である理由',
  '社会的絆がオキシトシンを介して免疫を強化する',
  '光の色温度と概日リズムの破壊',
  'ナットウキナーゼvs抗血栓薬：比較データ',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
}

function buildPrompt(topic) {
  return `You are a science communicator creating viral YouTube Shorts scripts for SHIROKUMA, a Japanese longevity science platform.

Topic: "${topic}"

Create a structured short video script. Return ONLY valid JSON (no markdown, no explanation), exactly in this format:

{
  "id": "<url-friendly-slug-in-english>",
  "title": "<English title, punchy, under 60 chars, fact-forward>",
  "titleJa": "<Japanese title, 20 chars max>",
  "description": "<2-3 sentence hook with a specific stat or surprising claim. English only.>",
  "axis": "<one of: inflammation | gut | neural | metabolic | hormonal | social>",
  "duration": "<one of: 0:45 | 0:52 | 0:58 | 1:02 | 1:08 | 1:15 | 1:22 | 1:30>",
  "views": <realistic number between 80000 and 1200000>,
  "likes": <roughly views * 0.07>,
  "thumbnail": "<single emoji that represents the topic>",
  "gradient": "from-[#<hex1>]/20 to-[#<hex2>]/20",
  "publishedAt": "2024-<MM>-<DD>",
  "tags": ["<Tag1>", "<Tag2>", "<Tag3>", "<Tag4>"],
  "transcript": "<Full 60-90 second script. Evidence-based. Cite real researchers or studies. Conversational, direct. 200-280 words.>",
  "points": [
    { "icon": "<emoji>", "text": "<key fact 1, under 10 words>" },
    { "icon": "<emoji>", "text": "<key fact 2, under 10 words>" },
    { "icon": "<emoji>", "text": "<key fact 3, under 10 words>" }
  ]
}

Guidelines:
- Title must start with a number, "How", "Why", "The", or a provocative claim
- Include at least one specific clinical study or researcher name
- The transcript must be persuasive but scientifically accurate
- Axis must match the primary biological mechanism
- Gradient hex colors should match the topic's axis color:
  inflammation=#e07b54, gut=#7a9e7e, neural=#7b68ee, metabolic=#e8a838, hormonal=#3d5a80, social=#c9a96e`;
}

// ─── Claude API call ──────────────────────────────────────────────────────────

async function generateVideoData(topic) {
  if (!API_KEY) {
    throw new Error('ANTHROPIC_API_KEY not set. Add it to .env or export it.');
  }

  console.log(`🤖 Calling Claude API for topic: "${topic}"`);

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: buildPrompt(topic) }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Claude API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const raw = data.content[0].text.trim();

  // Strip potential markdown code fences
  const jsonStr = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');

  try {
    return JSON.parse(jsonStr);
  } catch {
    console.error('Raw response:', raw);
    throw new Error('Failed to parse JSON from Claude response');
  }
}

// ─── Inject into videos.ts ────────────────────────────────────────────────────

function injectVideo(videoData) {
  const src = readFileSync(VIDEOS_LIB, 'utf8');

  // Check if ID already exists
  if (src.includes(`id: '${videoData.id}'`)) {
    console.log(`⏭  Video "${videoData.id}" already exists in library. Skipping inject.`);
    return false;
  }

  const entry = `  {
    id: '${videoData.id}',
    title: '${videoData.title.replace(/'/g, "\\'")}',
    titleJa: '${videoData.titleJa}',
    description: '${videoData.description.replace(/'/g, "\\'")}',
    axis: '${videoData.axis}',
    duration: '${videoData.duration}',
    views: ${videoData.views},
    likes: ${videoData.likes},
    thumbnail: '${videoData.thumbnail}',
    gradient: '${videoData.gradient}',
    publishedAt: '${videoData.publishedAt}',
    tags: [${videoData.tags.map((t) => `'${t}'`).join(', ')}],
    transcript: '${videoData.transcript.replace(/'/g, "\\'").replace(/\n/g, ' ')}',
  },`;

  // Insert before the closing ]; of the videos array
  const updated = src.replace(
    /^(export const videos: ShortVideo\[\] = \[[\s\S]*?)(^\];)/m,
    (_, arr, closing) => `${arr}${entry}\n${closing}`
  );

  writeFileSync(VIDEOS_LIB, updated, 'utf8');
  console.log(`✅ Injected video "${videoData.id}" into src/lib/videos.ts`);
  return true;
}

// ─── Save points to a sidecar JSON (for Remotion props) ───────────────────────

function saveProps(videoData) {
  mkdirSync(resolve(ROOT, 'out/props'), { recursive: true });
  const propsPath = resolve(ROOT, `out/props/${videoData.id}.json`);
  writeFileSync(
    propsPath,
    JSON.stringify({
      title: videoData.title,
      titleJa: videoData.titleJa,
      description: videoData.description,
      axis: videoData.axis,
      thumbnail: videoData.thumbnail,
      tags: videoData.tags.map((t) => t.replace(/\s+/g, '')),
      points: videoData.points ?? [
        { icon: '🔬', text: videoData.tags[0] ?? '' },
        { icon: '📖', text: videoData.tags[1] ?? '' },
        { icon: '✅', text: videoData.tags[2] ?? '' },
      ],
    }, null, 2),
    'utf8'
  );
  console.log(`💾 Props saved to ${propsPath}`);
  return propsPath;
}

// ─── Render via Remotion ──────────────────────────────────────────────────────

function renderVideo(id, propsPath) {
  mkdirSync(resolve(ROOT, 'out/mp4'), { recursive: true });
  const outputPath = resolve(ROOT, `out/mp4/shorts-${id}.mp4`);
  const cmd = `npx remotion render remotion/index.ts shorts-${id} ${outputPath} --codec=h264 --props="${propsPath}"`;

  console.log(`\n🎬 Rendering: ${id}`);
  console.log(`   Command: ${cmd}\n`);

  try {
    execSync(cmd, { stdio: 'inherit', cwd: ROOT });
    console.log(`\n✅ Rendered: ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.error(`❌ Render failed for ${id}:`, err.message);
    return null;
  }
}

// ─── CLI ──────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const topicFlag = args.findIndex((a) => a === '--topic');
  const shouldRender = args.includes('--render');
  const doAll = args.includes('--all');

  let topics = [];

  if (doAll) {
    topics = TOPIC_SEEDS;
    console.log(`\n📋 Batch mode: ${topics.length} topics queued\n`);
  } else if (topicFlag !== -1 && args[topicFlag + 1]) {
    topics = [args[topicFlag + 1]];
  } else {
    console.log(`
SHIROKUMA Shorts Auto-Generator
================================
Usage:
  node scripts/generate-video.mjs --topic "<topic>"        Generate 1 video
  node scripts/generate-video.mjs --topic "<topic>" --render  Generate + render
  node scripts/generate-video.mjs --all                    Generate all seeds
  node scripts/generate-video.mjs --all --render           Generate + render all

Requires: ANTHROPIC_API_KEY env variable
    `);
    process.exit(0);
  }

  for (const topic of topics) {
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`📽  Topic: ${topic}`);

    try {
      const videoData = await generateVideoData(topic);
      console.log(`📝 Generated: "${videoData.title}" [${videoData.axis}]`);

      injectVideo(videoData);
      const propsPath = saveProps(videoData);

      if (shouldRender) {
        renderVideo(videoData.id, propsPath);
      } else {
        console.log(`ℹ️  To render: npm run render -- --id ${videoData.id}`);
      }
    } catch (err) {
      console.error(`❌ Error processing "${topic}":`, err.message);
    }

    // Rate limit: wait 1s between API calls
    if (topics.length > 1) await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`\n🏁 Done.`);
}

main().catch(console.error);
