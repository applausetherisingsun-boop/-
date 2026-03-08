'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#philosophy', label: '診療哲学' },
  { href: '#axes', label: '6軸アプローチ' },
  { href: '#programs', label: 'プログラム' },
  { href: '#author', label: '医師紹介' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#faf8f3]/96 backdrop-blur-md shadow-sm border-b border-[#a07830]/15'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #c4a05a, #a07830)' }}
          >
            <span className="text-white font-bold text-sm" style={{ fontFamily: 'serif' }}>白</span>
          </div>
          <div className="flex flex-col leading-none">
            <span
              className="font-bold text-[17px] tracking-[0.12em]"
              style={{ color: '#2c2417', fontFamily: 'Georgia, serif' }}
            >
              Dr. Shirokuma
            </span>
            <span
              className="text-[9px] tracking-[0.35em] uppercase"
              style={{ color: '#a07830', fontFamily: 'sans-serif' }}
            >
              Anti-Aging Clinic
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors duration-200 hover:text-[#a07830]"
              style={{ color: '#5c4a30', fontFamily: 'sans-serif', letterSpacing: '0.05em' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #c4a05a, #a07830)',
              color: '#fff',
              fontFamily: 'sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            無料相談を予約
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="メニュー"
          style={{ color: '#2c2417' }}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden border-t px-6 py-6 flex flex-col gap-4"
          style={{ backgroundColor: '#faf8f3', borderColor: '#a07830/20' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 border-b text-sm transition-colors hover:text-[#a07830]"
              style={{
                color: '#2c2417',
                borderColor: '#ede5d8',
                fontFamily: 'sans-serif',
                letterSpacing: '0.05em',
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="mt-2 py-3 rounded-full text-center text-sm font-medium"
            style={{
              background: 'linear-gradient(135deg, #c4a05a, #a07830)',
              color: '#fff',
              fontFamily: 'sans-serif',
            }}
            onClick={() => setIsOpen(false)}
          >
            無料相談を予約
          </a>
        </div>
      )}
    </nav>
  );
}
