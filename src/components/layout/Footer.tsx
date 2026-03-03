import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a18] text-[#e8d5b7] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#7a9e7e] flex items-center justify-center">
                <span className="text-white font-bold text-xs">白</span>
              </div>
              <span className="text-white font-bold text-lg tracking-widest font-sans">SHIROKUMA</span>
            </div>
            <p className="text-[#9a9a7a] text-sm leading-relaxed">
              Decoding Japan&apos;s longevity wisdom through modern science. Evidence-based anti-aging for global minds.
            </p>
            <p className="text-[#9a9a7a] text-xs mt-4 font-sans">
              日本の長寿の叡智を、科学で世界へ。
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-sans font-semibold mb-4 text-sm tracking-widest uppercase">Platform</h4>
            <ul className="space-y-2">
              {[
                { href: '/diagnosis', label: 'Free Diagnosis' },
                { href: '/science', label: 'Science Library' },
                { href: '/marketplace', label: 'Marketplace' },
                { href: '/investment', label: 'Investment Strategy' },
                { href: '/core', label: 'CORE Membership' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#9a9a7a] hover:text-[#c9a96e] text-sm transition-colors font-sans">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* The 6 Axes */}
          <div>
            <h4 className="text-white font-sans font-semibold mb-4 text-sm tracking-widest uppercase">6 Axes</h4>
            <ul className="space-y-2 text-[#9a9a7a] text-sm font-sans">
              <li>🔥 Inflammation</li>
              <li>🦠 Gut Microbiome</li>
              <li>🧠 Neural / Stress</li>
              <li>⚡ Metabolic</li>
              <li>🌙 Hormonal / Sleep</li>
              <li>🤝 Social / Ikigai</li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="text-white font-sans font-semibold mb-4 text-sm tracking-widest uppercase">Partners</h4>
            <ul className="space-y-2">
              {[
                { href: '/seller', label: 'List Your Product' },
                { href: '/core', label: 'PRIME Membership' },
                { href: '/science', label: 'Research Access' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#9a9a7a] hover:text-[#c9a96e] text-sm transition-colors font-sans">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/seller"
                className="inline-block border border-[#c9a96e] text-[#c9a96e] px-4 py-2 rounded-full text-xs font-sans hover:bg-[#c9a96e] hover:text-[#1a1a18] transition-all"
              >
                Become a Seller →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#3a3a38] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#6a6a5a] text-xs font-sans">
            © 2024 SHIROKUMA — drshirokuma.online · Designed in Japan
          </p>
          <div className="flex items-center gap-2 text-[#6a6a5a] text-xs font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7a9e7e] inline-block"></span>
            <span>Not medical advice. For educational purposes only.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
