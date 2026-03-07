import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-[#FF5A1F] flex items-center justify-center">
                <span className="text-white font-black text-xs">F</span>
              </div>
              <span className="text-white font-black text-lg tracking-[0.3em]">FLOOR</span>
            </div>
            <p className="text-[#7a746c] text-sm leading-relaxed">
              The global platform for house dance culture. Built by practitioners, for practitioners.
            </p>
            <p className="text-[#4a4640] text-xs mt-4">
              フロアは嘘をつかない。
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-5">Platform</h4>
            <ul className="space-y-3">
              {[
                { href: '/culture',   label: 'Culture & History' },
                { href: '/events',    label: 'Events & Battles' },
                { href: '/community', label: 'Global Community' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#7a746c] hover:text-[#FF5A1F] text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Elements */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-5">Elements</h4>
            <ul className="space-y-3 text-[#7a746c] text-sm">
              <li>Footwork</li>
              <li>Jack</li>
              <li>Loft</li>
              <li>Cipher</li>
              <li>Improv</li>
            </ul>
          </div>

          {/* Origins */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-5">Origins</h4>
            <ul className="space-y-3 text-[#7a746c] text-sm">
              <li>Chicago, 1977</li>
              <li>New York City</li>
              <li>Paris</li>
              <li>Tokyo</li>
              <li>Global → ∞</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#3a3630] text-xs">
            © 2025 FLOOR — House Dance Culture Platform
          </p>
          <div className="flex items-center gap-2 text-[#3a3630] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse-dot inline-block"></span>
            <span>Built by a practitioner. 20 years on the floor.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
