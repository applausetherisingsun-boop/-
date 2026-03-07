'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/culture', label: 'Culture', sub: '文化' },
  { href: '/events',  label: 'Events',  sub: 'イベント' },
  { href: '/community', label: 'Community', sub: 'コミュニティ' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#070707]/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-[#FF5A1F] flex items-center justify-center">
            <span className="text-white font-black text-xs tracking-widest">F</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-lg tracking-[0.3em]">FLOOR</span>
            <span className="text-[#FF5A1F] text-[8px] tracking-[0.4em] uppercase">House Dance · Global</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col items-center gap-0.5"
            >
              <span className="text-[#a09880] text-sm font-medium tracking-wide hover:text-white transition-colors">
                {link.label}
              </span>
              <span className="text-[#4a4640] text-[9px] tracking-widest group-hover:text-[#7a7060] transition-colors">
                {link.sub}
              </span>
            </Link>
          ))}
          <Link
            href="/community"
            className="bg-[#FF5A1F] text-white px-6 py-2.5 text-sm font-bold tracking-wide hover:bg-[#e84e17] transition-all duration-300"
          >
            Join the Cipher →
          </Link>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden p-2 text-[#a09880]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex justify-between items-center py-2 border-b border-white/5"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-[#f0ece4] font-medium">{link.label}</span>
              <span className="text-[#4a4640] text-xs">{link.sub}</span>
            </Link>
          ))}
          <Link
            href="/community"
            className="bg-[#FF5A1F] text-white px-6 py-3 text-center font-bold tracking-wide mt-2"
            onClick={() => setIsOpen(false)}
          >
            Join the Cipher →
          </Link>
        </div>
      )}
    </nav>
  );
}
