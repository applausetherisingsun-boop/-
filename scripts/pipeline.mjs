#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — Full Automation Pipeline
 *
 * 1. Generate video data via Claude API
 * 2. Render MP4 via Remotion
 * 3. Output: out/mp4/shorts-{id}.mp4 (1080×1920, ready for YouTube Shorts)
 *
 * Usage:
 *   node scripts/pipeline.mjs --topic "腸内細菌と長寿"
 *   node scripts/pipeline.mjs --all        # all 20 topic seeds
 *   ANTHROPIC_API_KEY=sk-... node scripts/pipeline.mjs --topic "..."
 */

import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: 'inherit', cwd: ROOT, ...opts });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`"${cmd} ${args.join(' ')}" exited with code ${code}`));
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const topicIdx = args.findIndex((a) => a === '--topic');
  const doAll = args.includes('--all');
  const noRender = args.includes('--no-render');

  if (!topicIdx && !doAll) {
    console.log(`
SHIROKUMA Shorts Pipeline
==========================
node scripts/pipeline.mjs --topic "<topic>"        1 video
node scripts/pipeline.mjs --all                    20 videos
node scripts/pipeline.mjs --topic "<t>" --no-render  skip render step

Steps: Claude API → src/lib/videos.ts → out/props/ → Remotion → out/mp4/
    `);
    process.exit(0);
  }

  // Step 1: Generate
  const generateArgs = ['scripts/generate-video.mjs'];
  if (doAll) {
    generateArgs.push('--all');
  } else {
    generateArgs.push('--topic', args[topicIdx + 1]);
  }

  console.log('\n📡 STEP 1: Generating video data via Claude API...\n');
  await run('node', generateArgs);

  // Step 2: Render (optional)
  if (!noRender) {
    console.log('\n🎬 STEP 2: Rendering videos via Remotion...\n');

    // Find all props files that have corresponding mp4 missing
    const propsDir = resolve(ROOT, 'out/props');
    if (existsSync(propsDir)) {
      const { readdirSync } = await import('fs');
      const propFiles = readdirSync(propsDir).filter((f) => f.endsWith('.json'));

      for (const propFile of propFiles) {
        const id = propFile.replace('.json', '');
        const mp4Path = resolve(ROOT, `out/mp4/shorts-${id}.mp4`);
        if (existsSync(mp4Path)) {
          console.log(`⏭  ${id} already rendered, skipping.`);
          continue;
        }

        const propsPath = resolve(propsDir, propFile);
        console.log(`\n▶ Rendering: ${id}`);
        try {
          await run('npx', [
            'remotion', 'render',
            'remotion/index.ts',
            `shorts-${id}`,
            mp4Path,
            '--codec=h264',
            `--props=${propsPath}`,
          ]);
          console.log(`✅ ${mp4Path}`);
        } catch (err) {
          console.error(`❌ Render failed: ${id}`);
        }
      }
    }
  }

  console.log('\n🏁 Pipeline complete!');
  console.log('📁 MP4 files ready in: out/mp4/');
  console.log('📤 Upload to YouTube Shorts / TikTok / Instagram Reels');
}

main().catch(console.error);
