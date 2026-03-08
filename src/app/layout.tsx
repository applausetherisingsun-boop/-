import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/contexts/LanguageContext';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Cormorant+SC:wght@300;400;500&family=Noto+Serif+JP:wght@200;300;400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
