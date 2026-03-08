'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/about',  label: 'About',       sub: 'コンセプト' },
  { href: '/roots',  label: 'ROOTS',        sub: '歴史と起源' },
  { href: '/ritual', label: 'Ritual Night', sub: '体験' },
  { href: '/circle', label: 'STATE Circle', sub: 'コミュニティ' },
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
          ? 'bg-[#050505]/96 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="text-[#ede8e0] font-black text-sm tracking-[0.22em] group-hover:text-[#c9a96e] transition-colors">
            HOUSE IS A STATE
          </span>
          <span className="text-[#3a3628] text-[8px] tracking-[0.45em] uppercase">
            Not a genre. A state of being.
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group flex flex-col items-center gap-0.5">
              <span className="text-[#7a7060] text-sm font-medium tracking-wide hover:text-[#ede8e0] transition-colors">
                {link.label}
              </span>
              <span className="text-[#3a3628] text-[9px] tracking-widest group-hover:text-[#5a5040] transition-colors">
                {link.sub}
              </span>
            </Link>
          ))}
          <Link
            href="/circle"
            className="border border-[#c9a96e]/40 text-[#c9a96e] px-6 py-2.5 text-sm font-bold tracking-wide hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-300"
          >
            Enter Circle →
          </Link>
        </div>

        {/* Mobile */}
        <button className="md:hidden p-2 text-[#7a7060]" onClick={() => setIsOpen(!isOpen)}>
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
              <span className="text-[#ede8e0] font-medium">{link.label}</span>
              <span className="text-[#3a3628] text-xs">{link.sub}</span>
            </Link>
          ))}
          <Link
            href="/circle"
            className="border border-[#c9a96e]/40 text-[#c9a96e] px-6 py-3 text-center font-bold tracking-wide mt-2"
            onClick={() => setIsOpen(false)}
          >
            Enter Circle →
          </Link>
        </div>
      )}
    </nav>
  );
}
