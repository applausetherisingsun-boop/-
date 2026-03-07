#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — Video Generator (Claude API)
 *
 * Usage:
 *   node scripts/generate-video.mjs --topic "腸内細菌と長寿"
 *   node scripts/generate-video.mjs --all
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const VIDEOS_LIB = resolve(ROOT, 'src/lib/videos.ts');

// ── 20 viral anti-aging seed topics ──────────────────────────────────────────
export const TOPIC_SEEDS = [
  '腸内細菌の多様性が寿命を左右する最新研究',
  '睡眠中の記憶固定と脳の老化防止メカニズム',
  'ポリフェノールがDNAを守るエピジェネティクス',
  'レスベラトロールとサーチュイン長寿遺伝子の関係',
  '断食16時間でオートファジーが始まる科学的証拠',
  '日本人の腸年齢が世界最若の理由',
  '筋肉が最強の抗老化臓器である理由',
  '昆布フコイダンがNF-κB炎症経路を阻害する仕組み',
  '瞑想8週間で海馬灰白質が増えるfMRI研究',
  '冷水2分でノルエピネフリン300%上昇の実験データ',
  'コラーゲン前駆体グリシンが深睡眠を延ばす理由',
  'ミトコンドリア機能低下が老化の本質的原因である証拠',
  '社会的絆がオキシトシンを介してNK細胞を増やす',
  '夜のブルーライトがメラトニンを3時間抑制するデータ',
  'ナットウキナーゼと抗血栓薬の効果比較臨床データ',
  'テロメラーゼを活性化する食品と生活習慣の科学',
  'インスリン感受性を回復させる空腹時間のメカニズム',
  'セラミドが腸バリアと肌バリアを同時に修復する仕組み',
  '週150分歩行で死亡率30%低下のメタ解析データ',
  '発酵食品が脳腸軸を通じてうつ・不安を改善する研究',
];

// ── Viral prompt (optimized for hook + science + shareability) ────────────────
function buildPrompt(topic) {
  return `You are a viral science educator creating YouTube Shorts for SHIROKUMA, Japan's top longevity science platform.

Topic: "${topic}"

CONTENT STYLE — "Journey Inside the Body":
Every video must explain what physically happens INSIDE the human body, step by step:
  摂取 (ingestion) → 消化・吸収 (digestion/absorption) → 作用機序 (mechanism of action at cellular/molecular level) → 生理的効果 (physiological effect) → 長期的結果 (long-term outcome)

Your job: Create a short video that is:
1. VIRAL: Opens with a shocking body-science stat (e.g. "Your gut produces 95% of your serotonin")
2. MECHANISTIC: Explains the exact biological process — enzymes, receptors, signaling pathways, organs involved
3. VISUAL LANGUAGE: Use vivid body-interior imagery ("as it enters your bloodstream", "binds to the ACE2 receptor in your gut lining", "triggers mitochondrial biogenesis in muscle fibers")
4. CREDIBLE: Cites real researchers, journals, or specific study data
5. CONCISE: Script is exactly 200-240 words (60-second speaking pace at 1.1x speed)
6. ACTIONABLE: Ends with one concrete thing the viewer can do today

Return ONLY valid JSON (no markdown, no code fences):

{
  "id": "<kebab-case-english-slug, max 40 chars>",
  "title": "<English title. Must start with a number OR 'How' OR 'Why' OR provocative body-science claim. Max 60 chars.>",
  "titleJa": "<Japanese title, max 22 chars>",
  "description": "<2 sentences. First = shocking body-science stat. Second = the physiological mechanism that explains it. English only.>",
  "axis": "<inflammation | gut | neural | metabolic | hormonal | social>",
  "duration": "<0:52 | 0:58 | 1:05 | 1:12 | 1:18 | 1:25>",
  "views": <integer 120000-1800000>,
  "likes": <views * 0.065 rounded>,
  "thumbnail": "<single most relevant emoji>",
  "gradient": "from-[#HEX]/20 to-[#HEX]/20",
  "publishedAt": "2024-<MM>-<DD>",
  "tags": ["<Tag1>", "<Tag2>", "<Tag3>", "<Tag4>"],
  "transcript": "<Full script in English. 200-240 words. Structure: [HOOK: shocking body-science stat] → [STEP 1 - INGESTION: what happens when consumed] → [STEP 2 - MECHANISM: molecular/cellular process, name the enzyme/receptor/pathway] → [STEP 3 - EFFECT: what changes in the body, cite researcher/study] → [ACTION: one specific thing to do today]. Conversational, fast-paced, zero filler words. Use vivid interior-body language.>",
  "transcriptJa": "<同じ内容の日本語台本。250〜300字。構成: [フック：衝撃的な体内事実] → [摂取：体に入ったとき何が起きるか] → [吸収・作用機序：酵素・受容体・シグナル経路など分子レベルで説明、研究者名・論文名を含む] → [生理的効果：体の中で何が変わるか] → [今日できること：具体的な1つのアクション]。会話調・テンポよく・無駄な言葉ゼロ。TTS読み上げ用なので漢字には読み仮名を振らずそのまま記述。>",
  "points": [
    { "icon": "<emoji>", "text": "<STEP 1: what happens at ingestion/digestion, max 8 words>" },
    { "icon": "<emoji>", "text": "<STEP 2: the key molecular mechanism, max 8 words>" },
    { "icon": "<emoji>", "text": "<STEP 3: the resulting physiological effect, max 8 words>" }
  ]
}

Gradient hex guidelines (match axis):
- inflammation: #e07b54 → #c9a96e
- gut: #7a9e7e → #c9a96e
- neural: #7b68ee → #3d5a80
- metabolic: #e8a838 → #c9a96e
- hormonal: #3d5a80 → #7b68ee
- social: #c9a96e → #7a9e7e`;
}

// ── Anthropic Claude API ──────────────────────────────────────────────────────
async function callClaude(topic) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('ANTHROPIC_API_KEY not set in .env.local');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [
        { role: 'user', content: buildPrompt(topic) },
      ],
    }),
  });

  if (!res.ok) throw new Error(`Claude API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const raw = data.content[0].text.trim();

  // Strip markdown code fences if present
  const jsonStr = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();
  return JSON.parse(jsonStr);
}

// ── Inject into videos.ts ─────────────────────────────────────────────────────
function injectVideo(v) {
  const src = readFileSync(VIDEOS_LIB, 'utf8');
  if (src.includes(`id: '${v.id}'`)) {
    console.log(`⏭  Already exists: ${v.id}`);
    return false;
  }
  const entry = `  {
    id: '${v.id}',
    title: '${v.title.replace(/'/g, "\\'")}',
    titleJa: '${v.titleJa}',
    description: '${v.description.replace(/'/g, "\\'")}',
    axis: '${v.axis}',
    duration: '${v.duration}',
    views: ${v.views},
    likes: ${v.likes},
    thumbnail: '${v.thumbnail}',
    gradient: '${v.gradient}',
    publishedAt: '${v.publishedAt}',
    tags: [${v.tags.map((t) => `'${t}'`).join(', ')}],
    transcript: '${v.transcript.replace(/'/g, "\\'").replace(/\n/g, ' ')}',
  },`;

  const updated = src.replace(
    /(export const videos: ShortVideo\[\] = \[[\s\S]*?)(^];)/m,
    (_, arr, end) => `${arr}${entry}\n${end}`
  );
  writeFileSync(VIDEOS_LIB, updated, 'utf8');
  console.log(`✅ Injected: ${v.id}`);
  return true;
}

// ── Save props for Remotion ───────────────────────────────────────────────────
export function saveProps(v) {
  mkdirSync(resolve(ROOT, 'out/props'), { recursive: true });
  const path = resolve(ROOT, `out/props/${v.id}.json`);

  // Preserve fields from previous runs (audioFile, captions) to avoid losing them on re-run
  let existing = {};
  if (existsSync(path)) {
    try { existing = JSON.parse(readFileSync(path, 'utf8')); } catch {}
  }

  writeFileSync(path, JSON.stringify({
    title: v.title,
    titleJa: v.titleJa,
    description: v.description,
    axis: v.axis,
    thumbnail: v.thumbnail,
    tags: v.tags.map((t) => t.replace(/\s+/g, '')),
    transcript: v.transcript,
    transcriptJa: v.transcriptJa ?? null,
    points: v.points ?? [
      { icon: '🔬', text: v.tags[0] ?? '' },
      { icon: '📖', text: v.tags[1] ?? '' },
      { icon: '✅', text: v.tags[2] ?? '' },
    ],
    audioFile: existing.audioFile ?? null,
    captions: existing.captions ?? null,
  }, null, 2), 'utf8');
  return path;
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function generateVideo(topic) {
  console.log(`\n🤖 Claude (claude-sonnet-4-6): "${topic}"`);
  const data = await callClaude(topic);
  console.log(`📝 "${data.title}" [${data.axis}]`);
  injectVideo(data);
  const propsPath = saveProps(data);
  return { data, propsPath };
}

// ── CLI ───────────────────────────────────────────────────────────────────────
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const topicIdx = args.findIndex((a) => a === '--topic');
  const doAll = args.includes('--all');

  const topics = doAll
    ? TOPIC_SEEDS
    : topicIdx !== -1 ? [args[topicIdx + 1]] : null;

  if (!topics) {
    console.log('Usage: node scripts/generate-video.mjs --topic "<topic>" | --all');
    process.exit(0);
  }

  for (const topic of topics) {
    try {
      await generateVideo(topic);
    } catch (e) {
      console.error(`❌ ${topic}:`, e.message);
    }
    if (topics.length > 1) await new Promise((r) => setTimeout(r, 800));
  }
  console.log('\n🏁 Done.');
}

