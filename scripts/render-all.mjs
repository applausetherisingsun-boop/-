/**
 * Batch render all SHIROKUMA Shorts videos.
 * Run: node scripts/render-all.mjs
 *
 * Each video renders to: out/shorts-{id}.mp4  (1080×1920, 30fps, 60s)
 */

import { execSync } from 'child_process';
import { mkdirSync } from 'fs';

const videoIds = [
  'natto-nattokinase',
  'hara-hachi-bu',
  'shinrin-yoku-nk-cells',
  'miso-gut-barrier',
  'onsen-heat-shock',
  'matcha-l-theanine',
  'ikigai-mortality',
  'circadian-melatonin',
  'fermentation-bifidobacterium',
  'cortisol-telomeres',
  'washoku-inflammation',
  'zazen-cortisol',
  'social-bonds-longevity',
  'cold-exposure-hormesis',
  'autophagy-fasting',
];

mkdirSync('out', { recursive: true });

console.log(`\n🎬 SHIROKUMA Shorts — Batch Renderer`);
console.log(`📹 Rendering ${videoIds.length} videos...\n`);

for (const id of videoIds) {
  const compositionId = `shorts-${id}`;
  const outputPath = `out/shorts-${id}.mp4`;
  console.log(`▶ Rendering: ${compositionId}`);
  try {
    execSync(
      `npx remotion render remotion/index.ts ${compositionId} ${outputPath} --codec=h264`,
      { stdio: 'inherit' }
    );
    console.log(`✅ Done: ${outputPath}\n`);
  } catch (err) {
    console.error(`❌ Failed: ${compositionId}`, err.message);
  }
}

console.log('🏁 All renders complete. Files saved to ./out/');
