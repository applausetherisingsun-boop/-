import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Dr. Shirokuma | アンチエイジング専門クリニック',
  description:
    'エビデンスに基づく統合アンチエイジング医療。炎症・腸内環境・代謝・ホルモン・神経・社会の6軸から老化の根本原因にアプローチします。初回無料カウンセリング受付中。',
  keywords: 'アンチエイジング, 抗老化, 統合医療, 炎症, 腸内環境, ホルモン, 代謝, テロメア, 白熊クリニック',
  openGraph: {
    title: 'Dr. Shirokuma | アンチエイジング専門クリニック',
    description: 'エビデンスに基づく統合アンチエイジング医療で、老化プロセスを科学的に制御する。',
    url: 'https://drshirokuma.com',
    siteName: 'Dr. Shirokuma Anti-Aging Clinic',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
