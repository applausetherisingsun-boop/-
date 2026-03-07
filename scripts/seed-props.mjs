#!/usr/bin/env node
/**
 * src/lib/videos.ts の静的データから out/props/{id}.json を生成する
 *
 * Usage:
 *   node scripts/seed-props.mjs                    # 全動画
 *   node scripts/seed-props.mjs natto-nattokinase  # 1本だけ
 */

import { mkdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const targetId = process.argv[2] ?? null;

// tsx で TypeScript を直接実行して JSON を取得
let allVideos;
try {
  const json = execSync(
    `npx tsx -e "import { videos } from './src/lib/videos.ts'; process.stdout.write(JSON.stringify(videos));"`,
    { cwd: ROOT, encoding: 'utf8' }
  );
  allVideos = JSON.parse(json);
} catch (e) {
  console.error('❌ videos.ts の読み込みに失敗:', e.message);
  process.exit(1);
}

mkdirSync(resolve(ROOT, 'out/props'), { recursive: true });

const targets = targetId ? allVideos.filter(v => v.id === targetId) : allVideos;

if (targets.length === 0) {
  console.error(`❌ 動画が見つかりません: ${targetId}`);
  process.exit(1);
}

for (const v of targets) {
  const props = {
    id: v.id,
    title: v.title,
    titleJa: v.titleJa,
    description: v.description,
    axis: v.axis,
    thumbnail: v.thumbnail,
    tags: v.tags,
    transcript: v.transcript,
    points: [
      { icon: '🔬', text: v.tags[0] ?? '' },
      { icon: '📖', text: v.tags[1] ?? '' },
      { icon: '✅', text: v.tags[2] ?? '' },
    ],
  };
  writeFileSync(resolve(ROOT, `out/props/${v.id}.json`), JSON.stringify(props, null, 2), 'utf8');
  console.log(`✅ ${v.id}`);
}

console.log(`\n📁 out/props/ に ${targets.length} 件書き出しました`);
