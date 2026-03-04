#!/usr/bin/env node
/**
 * SHIROKUMA Shorts — YouTube Data API v3 Auto-Upload
 *
 * OAuth2 refresh token を使って YouTube Shorts に動画を自動投稿する。
 *
 * ── 初回セットアップ ────────────────────────────────────────────────────────
 * 1. Google Cloud Console でプロジェクトを作成
 *    https://console.cloud.google.com/
 * 2. YouTube Data API v3 を有効化
 * 3. OAuth2 クライアント ID を作成 (種類: デスクトップアプリ)
 * 4. .env.local に追加:
 *    YOUTUBE_CLIENT_ID=your-client-id.apps.googleusercontent.com
 *    YOUTUBE_CLIENT_SECRET=your-client-secret
 * 5. 認可URLを生成して refresh_token を取得:
 *    node scripts/upload-youtube.mjs --auth
 * 6. ブラウザで表示されたURLにアクセス → コードをコピー → ターミナルに貼り付け
 * 7. .env.local に追加:
 *    YOUTUBE_REFRESH_TOKEN=your-refresh-token
 *
 * ── 通常使用 ────────────────────────────────────────────────────────────────
 * node scripts/upload-youtube.mjs --id natto-nattokinase
 * node scripts/upload-youtube.mjs --id natto-nattokinase --private  (限定公開)
 * node scripts/upload-youtube.mjs --id natto-nattokinase --schedule "2026-03-10T09:00:00+09:00"
 *
 * ── Requires .env.local ─────────────────────────────────────────────────────
 * YOUTUBE_CLIENT_ID=...
 * YOUTUBE_CLIENT_SECRET=...
 * YOUTUBE_REFRESH_TOKEN=...
 */

import { readFileSync, existsSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { URL as NodeURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── .env.local ロード ─────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = resolve(ROOT, '.env.local');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
}

// ── OAuth2 ────────────────────────────────────────────────────────────────────

const OAUTH_TOKEN_URL  = 'https://oauth2.googleapis.com/token';
const OAUTH_AUTH_URL   = 'https://accounts.google.com/o/oauth2/v2/auth';
const REDIRECT_URI     = 'http://localhost:8080/oauth2callback';
const SCOPES           = 'https://www.googleapis.com/auth/youtube.upload';

/**
 * refresh_token からアクセストークンを取得する
 */
async function getAccessToken() {
  const clientId     = process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
  const refreshToken = process.env.YOUTUBE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'YouTube OAuth2 credentials が設定されていません。\n' +
      '.env.local に以下を追加してください:\n' +
      '  YOUTUBE_CLIENT_ID=...\n' +
      '  YOUTUBE_CLIENT_SECRET=...\n' +
      '  YOUTUBE_REFRESH_TOKEN=...\n\n' +
      '初回のみ: node scripts/upload-youtube.mjs --auth'
    );
  }

  const params = new URLSearchParams({
    client_id:     clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type:    'refresh_token',
  });

  const res = await fetch(OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) throw new Error(`Token refresh failed: ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

/**
 * 初回認可フロー: ブラウザで認可 → refresh_token を取得して表示
 */
async function runAuthFlow() {
  const clientId     = process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('.env.local に YOUTUBE_CLIENT_ID と YOUTUBE_CLIENT_SECRET を設定してください');
  }

  const authUrl = `${OAUTH_AUTH_URL}?` + new URLSearchParams({
    client_id:     clientId,
    redirect_uri:  REDIRECT_URI,
    response_type: 'code',
    scope:         SCOPES,
    access_type:   'offline',
    prompt:        'consent',
  });

  console.log('\n📺 YouTube OAuth2 認可フロー');
  console.log('────────────────────────────────────────');
  console.log('以下のURLをブラウザで開いてください:\n');
  console.log(authUrl);
  console.log('\n認可後、localhost:8080 にリダイレクトされます...');

  // 認可コードをローカルサーバーで受け取る
  const code = await new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      const url = new NodeURL(req.url, 'http://localhost:8080');
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      if (code) {
        res.end('<h2>✅ 認可成功！ターミナルに戻ってください。</h2>');
        server.close();
        resolve(code);
      } else {
        res.end(`<h2>❌ エラー: ${error}</h2>`);
        server.close();
        reject(new Error(`Auth error: ${error}`));
      }
    });
    server.listen(8080, () => console.log('\n⏳ localhost:8080 で待機中...'));
  });

  // code → refresh_token
  const tokenRes = await fetch(OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id:     clientId,
      client_secret: clientSecret,
      redirect_uri:  REDIRECT_URI,
      grant_type:    'authorization_code',
    }).toString(),
  });

  if (!tokenRes.ok) throw new Error(`Token exchange failed: ${await tokenRes.text()}`);
  const tokens = await tokenRes.json();

  console.log('\n✅ 認可成功！\n');
  console.log('以下を .env.local に追加してください:');
  console.log(`\nYOUTUBE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
}

// ── YouTube Upload ────────────────────────────────────────────────────────────

/**
 * YouTube Data API v3 の Resumable Upload で動画をアップロードする
 *
 * @param {object} opts
 * @param {string} opts.videoPath  - MP4ファイルの絶対パス
 * @param {string} opts.title      - 動画タイトル (#Shorts 追加済み)
 * @param {string} opts.description
 * @param {string[]} opts.tags
 * @param {'public'|'private'|'unlisted'} opts.privacyStatus
 * @param {string|null} opts.scheduledAt - ISO8601 (例: "2026-03-10T09:00:00+09:00")
 * @returns {Promise<{videoId: string, url: string}>}
 */
export async function uploadToYouTube({ videoPath, title, description, tags, privacyStatus = 'public', scheduledAt = null }) {
  const accessToken = await getAccessToken();
  const fileSize = statSync(videoPath).size;

  // タイトルに #Shorts を追加（未追加の場合）
  const finalTitle = title.includes('#Shorts') ? title : `${title} #Shorts`;
  // 説明文に #Shorts タグを追加
  const finalDescription = `${description}\n\n#Shorts #シロクマ科学 #長寿 #健康`;

  // YouTube のカテゴリID 22 = "People & Blogs" (Shortsに最適)
  const metadata = {
    snippet: {
      title: finalTitle.slice(0, 100),
      description: finalDescription.slice(0, 5000),
      tags: [...tags, 'Shorts', 'ShortVideo', 'シロクマ', 'longevity'].slice(0, 30),
      categoryId: '22',
      defaultLanguage: 'ja',
    },
    status: {
      privacyStatus: scheduledAt ? 'private' : privacyStatus,
      selfDeclaredMadeForKids: false,
      ...(scheduledAt ? { publishAt: new Date(scheduledAt).toISOString() } : {}),
    },
  };

  console.log(`📤 YouTube upload: "${finalTitle}"`);
  console.log(`   File: ${(fileSize / 1024 / 1024).toFixed(1)} MB`);

  // ① Resumable upload session を開始
  const initRes = await fetch(
    'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Upload-Content-Type': 'video/mp4',
        'X-Upload-Content-Length': String(fileSize),
      },
      body: JSON.stringify(metadata),
    }
  );

  if (!initRes.ok) {
    throw new Error(`Upload init failed ${initRes.status}: ${await initRes.text()}`);
  }

  const uploadUrl = initRes.headers.get('location');
  if (!uploadUrl) throw new Error('Upload URL not returned from YouTube');

  // ② ファイルをチャンク送信 (256KB の倍数、最大50MB/チャンク)
  const CHUNK_SIZE = 8 * 1024 * 1024; // 8MB
  const fileBuffer = readFileSync(videoPath);
  let uploaded = 0;

  while (uploaded < fileSize) {
    const end = Math.min(uploaded + CHUNK_SIZE, fileSize);
    const chunk = fileBuffer.slice(uploaded, end);

    const chunkRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Range': `bytes ${uploaded}-${end - 1}/${fileSize}`,
        'Content-Type': 'video/mp4',
        'Content-Length': String(chunk.length),
      },
      body: chunk,
    });

    if (chunkRes.status === 308) {
      // Resume Incomplete — 次のチャンクへ
      const range = chunkRes.headers.get('range');
      uploaded = range ? parseInt(range.split('-')[1], 10) + 1 : end;
      const progress = Math.round((uploaded / fileSize) * 100);
      process.stdout.write(`\r   Progress: ${progress}%`);
    } else if (chunkRes.status === 200 || chunkRes.status === 201) {
      // 完了
      process.stdout.write('\r   Progress: 100%\n');
      const result = await chunkRes.json();
      const videoId = result.id;
      const url = `https://www.youtube.com/shorts/${videoId}`;
      console.log(`✅ Upload complete!`);
      console.log(`   Video ID: ${videoId}`);
      console.log(`   URL: ${url}`);
      if (scheduledAt) console.log(`   Scheduled: ${scheduledAt}`);
      return { videoId, url };
    } else {
      throw new Error(`Chunk upload failed ${chunkRes.status}: ${await chunkRes.text()}`);
    }
  }

  throw new Error('Upload loop ended without completion');
}

// ── CLI ───────────────────────────────────────────────────────────────────────
async function main() {
  loadEnv();

  const args = process.argv.slice(2);

  // 認可フロー
  if (args.includes('--auth')) {
    await runAuthFlow();
    return;
  }

  const idIdx = args.findIndex((a) => a === '--id');
  if (idIdx === -1) {
    console.log(`
YouTube Shorts 自動投稿
════════════════════════════════════════
  node scripts/upload-youtube.mjs --auth           # 初回OAuth認可
  node scripts/upload-youtube.mjs --id <video-id>  # 公開投稿
  node scripts/upload-youtube.mjs --id <video-id> --private           # 限定公開
  node scripts/upload-youtube.mjs --id <video-id> --schedule "2026-03-10T09:00:00+09:00"

必要な .env.local:
  YOUTUBE_CLIENT_ID=...
  YOUTUBE_CLIENT_SECRET=...
  YOUTUBE_REFRESH_TOKEN=...
    `);
    process.exit(0);
  }

  const id = args[idIdx + 1];
  const isPrivate = args.includes('--private');
  const scheduleIdx = args.findIndex((a) => a === '--schedule');
  const scheduledAt = scheduleIdx !== -1 ? args[scheduleIdx + 1] : null;

  // props から動画メタデータを読み込む
  const propsPath = resolve(ROOT, `out/props/${id}.json`);
  if (!existsSync(propsPath)) {
    console.error(`❌ Props not found: ${propsPath}`);
    console.error('   先に pipeline.mjs を実行してください');
    process.exit(1);
  }
  const props = JSON.parse(readFileSync(propsPath, 'utf8'));

  const videoPath = resolve(ROOT, `out/mp4/shorts-${id}.mp4`);
  if (!existsSync(videoPath)) {
    console.error(`❌ MP4 not found: ${videoPath}`);
    console.error('   先に pipeline.mjs でレンダリングしてください');
    process.exit(1);
  }

  await uploadToYouTube({
    videoPath,
    title: props.title,
    description: props.description,
    tags: props.tags ?? [],
    privacyStatus: isPrivate ? 'private' : 'public',
    scheduledAt,
  });
}

main().catch((e) => { console.error(`❌ ${e.message}`); process.exit(1); });
