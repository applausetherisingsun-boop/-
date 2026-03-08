'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { label: 'PHILOSOPHY', href: '/philosophy' },
  { label: 'NATURAL CODE', href: '/natural-code' },
  { label: 'PROGRAMS', href: '/programs' },
  { label: 'INNER CIRCLE', href: '/inner-circle' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#f5f0e8]/90 backdrop-blur-sm">
        <Link href="/" className="text-[#1a1814] font-black tracking-[0.25em] text-sm uppercase">
          SHIROKUMA
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-[#6b6355] text-[10px] font-medium tracking-[0.35em] uppercase hover:text-[#1a1814] transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-[#1a1814] transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-[#1a1814] transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[#1a1814] transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-[#f5f0e8] pt-20 px-8 md:hidden">
          <ul className="flex flex-col gap-8 pt-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-[#1a1814] text-2xl font-black tracking-widest uppercase"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
