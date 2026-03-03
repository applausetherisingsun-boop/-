'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const navLinks = [
  { href: '/diagnosis',   en: 'Diagnosis',    ja: '診断' },
  { href: '/science',     en: 'Science',      ja: 'サイエンス' },
  { href: '/marketplace', en: 'Marketplace',  ja: 'マーケット' },
  { href: '/core',        en: 'CORE',         ja: 'メンバー' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#fafaf8]/95 backdrop-blur-md shadow-sm border-b border-[#e8d5b7]/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#7a9e7e] flex items-center justify-center">
            <span className="text-white font-bold text-sm">白</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[#1a1a18] font-bold text-lg tracking-widest font-sans">
              SHIROKUMA
            </span>
            <span className="text-[#c9a96e] text-[9px] tracking-[0.3em] uppercase font-sans">
              {lang === 'en' ? 'Longevity Science' : '長寿科学'}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col items-center gap-0.5"
            >
              <span className="text-[#1a1a18] font-sans text-sm font-medium hover:text-[#c9a96e] transition-colors">
                {lang === 'en' ? link.en : link.ja}
              </span>
            </Link>
          ))}

          {/* Language Toggle */}
          <div className="flex items-center border border-[#1a1a18]/20 rounded-full overflow-hidden text-xs font-sans">
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 transition-all ${
                lang === 'en'
                  ? 'bg-[#1a1a18] text-[#fafaf8]'
                  : 'text-[#1a1a18]/60 hover:text-[#1a1a18]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ja')}
              className={`px-3 py-1.5 transition-all ${
                lang === 'ja'
                  ? 'bg-[#1a1a18] text-[#fafaf8]'
                  : 'text-[#1a1a18]/60 hover:text-[#1a1a18]'
              }`}
            >
              JP
            </button>
          </div>

          <Link
            href="/diagnosis"
            className="bg-[#1a1a18] text-[#fafaf8] px-6 py-2.5 rounded-full text-sm font-sans font-medium hover:bg-[#c9a96e] transition-all duration-300"
          >
            {lang === 'en' ? 'Start Free Diagnosis →' : '無料診断を始める →'}
          </Link>
        </div>

        {/* Mobile: Language Toggle + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <div className="flex items-center border border-[#1a1a18]/20 rounded-full overflow-hidden text-xs font-sans">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 transition-all ${lang === 'en' ? 'bg-[#1a1a18] text-[#fafaf8]' : 'text-[#1a1a18]/60'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('ja')}
              className={`px-2.5 py-1 transition-all ${lang === 'ja' ? 'bg-[#1a1a18] text-[#fafaf8]' : 'text-[#1a1a18]/60'}`}
            >
              JP
            </button>
          </div>
          <button
            className="p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#fafaf8] border-t border-[#e8d5b7]/50 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex justify-between items-center py-2 border-b border-[#e8d5b7]/30"
              onClick={() => setIsOpen(false)}
            >
              <span className="font-sans font-medium">{lang === 'en' ? link.en : link.ja}</span>
            </Link>
          ))}
          <Link
            href="/diagnosis"
            className="bg-[#1a1a18] text-[#fafaf8] px-6 py-3 rounded-full text-center font-sans font-medium mt-2"
            onClick={() => setIsOpen(false)}
          >
            {lang === 'en' ? 'Start Free Diagnosis →' : '無料診断を始める →'}
          </Link>
        </div>
      )}
    </nav>
  );
}
