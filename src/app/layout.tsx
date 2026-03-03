import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'SHIROKUMA — Japan Longevity Science Platform',
  description:
    'Decoding Japan\'s longevity wisdom through science. Evidence-based anti-aging platform built on 6 axes: inflammation, gut microbiome, neural, metabolic, hormonal, and social health.',
  keywords: 'anti-aging, longevity, Japan, microbiome, inflammation, ikigai, evidence-based health',
  openGraph: {
    title: 'SHIROKUMA — Japan Longevity Science Platform',
    description: 'Decoding Japan\'s 120-year longevity secrets through modern science.',
    url: 'https://drshirokuma.online',
    siteName: 'SHIROKUMA',
    locale: 'en_US',
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
      <body className="antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
