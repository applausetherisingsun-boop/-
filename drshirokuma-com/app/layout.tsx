import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://drshirokuma.com'),
  title: 'SHIROKUMA — 老化は文明病である',
  description:
    '進化医学・炎症科学・腸内マイクロバイオームの6軸フレームワークで老化を解体する。現役医師NISHIによる思想プラットフォーム。',
  keywords: 'アンチエイジング, 老化, 文明病, 進化医学, 腸内環境, 炎症, SHIROKUMA, NISHI, 医師',
  openGraph: {
    title: 'SHIROKUMA — 老化は文明病である',
    description: '文明の設計ミスが老化を加速している。進化医学×日本長寿文化の知的体系。',
    siteName: 'SHIROKUMA',
    url: 'https://drshirokuma.com',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
