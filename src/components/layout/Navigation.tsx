'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const navLinks = [
  { href: '/diagnosis',   en: 'Diagnosis',   ja: '診断' },
  { href: '/science',     en: 'Science',     ja: '科学' },
  { href: '/marketplace', en: 'Marketplace', ja: '市場' },
  { href: '/core',        en: 'CORE',        ja: '会員' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? 'bg-[#faf8f4]/96 backdrop-blur-sm border-b border-[#c4b49a]/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-8 h-8 border border-[#a8895a]/40 flex items-center justify-center">
            <span className="text-[#a8895a] font-serif text-sm font-light">白</span>
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="text-[#1c1917] text-base tracking-[0.25em] font-sans font-light"
              style={{ letterSpacing: '0.25em' }}
            >
              SHIROKUMA
            </span>
            <span className="text-[#a8895a] text-[8px] tracking-[0.4em] uppercase font-sans font-light mt-0.5">
              {lang === 'en' ? 'Longevity · Japan' : '長寿科学 · 日本'}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#7a7065] text-xs font-sans tracking-[0.2em] uppercase hover:text-[#1c1917] transition-colors duration-300"
            >
              {lang === 'en' ? link.en : link.ja}
            </Link>
          ))}

          {/* Language Toggle */}
          <div className="flex items-center gap-2 text-[10px] font-sans tracking-[0.15em]">
            <button
              onClick={() => setLang('en')}
              className={`transition-colors duration-300 ${
                lang === 'en' ? 'text-[#1c1917]' : 'text-[#c4b49a] hover:text-[#7a7065]'
              }`}
            >
              EN
            </button>
            <span className="text-[#c4b49a]">·</span>
            <button
              onClick={() => setLang('ja')}
              className={`transition-colors duration-300 ${
                lang === 'ja' ? 'text-[#1c1917]' : 'text-[#c4b49a] hover:text-[#7a7065]'
              }`}
            >
              JP
            </button>
          </div>

          <Link
            href="/diagnosis"
            className="border border-[#1c1917]/30 text-[#1c1917] px-6 py-2 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-[#1c1917] hover:text-[#faf8f4] transition-all duration-500"
          >
            {lang === 'en' ? 'Begin' : '始める'}
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-5">
          <div className="flex items-center gap-2 text-[10px] font-sans tracking-widest">
            <button
              onClick={() => setLang('en')}
              className={lang === 'en' ? 'text-[#1c1917]' : 'text-[#c4b49a]'}
            >EN</button>
            <span className="text-[#c4b49a]">·</span>
            <button
              onClick={() => setLang('ja')}
              className={lang === 'ja' ? 'text-[#1c1917]' : 'text-[#c4b49a]'}
            >JP</button>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#1c1917] text-[10px] font-sans tracking-widest uppercase"
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#faf8f4] border-t border-[#c4b49a]/20 px-8 py-10 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#7a7065] text-xs font-sans tracking-[0.25em] uppercase hover:text-[#1c1917] transition-colors py-2 border-b border-[#c4b49a]/15"
              onClick={() => setIsOpen(false)}
            >
              {lang === 'en' ? link.en : link.ja}
            </Link>
          ))}
          <Link
            href="/diagnosis"
            className="border border-[#1c1917]/30 text-[#1c1917] px-6 py-3 text-[10px] font-sans tracking-[0.2em] uppercase text-center mt-4 hover:bg-[#1c1917] hover:text-[#faf8f4] transition-all duration-500"
            onClick={() => setIsOpen(false)}
          >
            {lang === 'en' ? 'Begin Free Diagnosis' : '無料診断を始める'}
          </Link>
        </div>
      )}
    </nav>
  );
}
