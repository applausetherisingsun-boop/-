import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'FLOOR — House Dance Culture Platform',
  description:
    'The global platform for house dance culture. Community, history, events, and the philosophy of movement. Built by practitioners, for practitioners.',
  keywords: 'house dance, footwork, jack, cipher, house music, Chicago, culture, global community',
  openGraph: {
    title: 'FLOOR — House Dance Culture Platform',
    description: 'Where the body speaks. The global home for house dance culture.',
    siteName: 'FLOOR',
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
