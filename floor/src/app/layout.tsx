import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://shirokuma-biohack.com'),
  title: 'HOUSE IS A STATE — 日本発ハウス国際文化プラットフォーム',
  description:
    'ハウスミュージックを媒介に、身体・創造・コミュニティを接続する日本発の国際文化プラットフォーム。ジャンルではなく、状態。消費ではなく、共鳴。',
  keywords: 'house music, house dance, ハウスミュージック, STATE Circle, Ritual Night, ROOTS, culture platform, Japan, Chicago',
  openGraph: {
    title: 'HOUSE IS A STATE',
    description: 'Not a genre. A state of being. — ジャンルではなく、状態。',
    siteName: 'HOUSE IS A STATE',
    url: 'https://shirokuma-biohack.com',
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
