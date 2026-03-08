# プロジェクト概要

このリポジトリは applausetherisingsun-boop の複数サイトを管理しています。

## サイト構成

| サイト | ドメイン | Vercel プロジェクト | ブランチ |
|--------|----------|---------------------|----------|
| 日本発・海外向けアンチエイジング | `drshirokuma.online` | `shirokuma-abroad` | `claude/deploy-drshirokuma-vercel-gFCu4` |
| 国内向けアンチエイジング | `drshirokuma.com` / `www.drshirokuma.com` | `drshirokuma-com` | `claude/setup-shirokuma-project-Nasw6` |
| ハウスカルチャープラットフォーム | `shirokuma-biohack.com` | `deepundergroundhousenation` | `claude/house-dance-platform-z2Clp` |

## ディレクトリ構成

- `/` (ルート) → 国内向けサイト (`drshirokuma.com`) のソースコード
  - `src/app/page.tsx` — ホームページ
  - `src/components/layout/Navigation.tsx` — ナビゲーション
  - `src/contexts/LanguageContext.tsx` — EN/JP 言語切替
- `drshirokuma-com/` → 国内向けサイト用サブプロジェクト（`claude/deploy-drshirokuma-vercel-gFCu4` ブランチ）
- `chapters/` — コンテンツ原稿（Markdown）

## デプロイ方法

- 各ブランチに push すると Vercel が自動デプロイ
- 作業ブランチへの push のみ可能（セッションIDが一致するブランチのみ）

## DNS（ムームードメイン）

- `drshirokuma.com` → A: `216.198.79.1` / CNAME(www): `208e443c5ed0fde6.vercel-dns-017.com.`
- `shirokuma-biohack.com` → A: `76.76.21.21` / CNAME(www): `cname.vercel-dns.com`

## 更新方法

このチャット（新規トークでも可）で「〇〇を変更して」と指示するだけで OK。
Claude がコードを修正・push → Vercel が自動デプロイします。
