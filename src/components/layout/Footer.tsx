import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-5">
              <p className="text-[#ede8e0] font-black text-sm tracking-[0.22em] mb-1">HOUSE IS A STATE</p>
              <p className="text-[#3a3628] text-[9px] tracking-[0.4em] uppercase">Not a genre. A state of being.</p>
            </div>
            <p className="text-[#7a7060] text-sm leading-relaxed mb-4">
              ハウスミュージックを媒介に、身体・創造・コミュニティを接続する日本発の国際文化プラットフォーム。
            </p>
            <p className="text-[#3a3628] text-xs">場を作る。あとは育つ。</p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-[#ede8e0] text-[9px] font-bold tracking-[0.4em] uppercase mb-5">Platform</h4>
            <ul className="space-y-3">
              {[
                { href: '/about',  label: 'About / Concept' },
                { href: '/roots',  label: 'ROOTS — 歴史' },
                { href: '/ritual', label: 'Ritual Night' },
                { href: '/circle', label: 'STATE Circle' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#7a7060] hover:text-[#c9a96e] text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-[#ede8e0] text-[9px] font-bold tracking-[0.4em] uppercase mb-5">Content</h4>
            <ul className="space-y-3 text-[#7a7060] text-sm">
              <li>ROOTS — 起源</li>
              <li>NOW — 現在</li>
              <li>NEXT — AI時代</li>
              <li>Culture Map</li>
              <li>Discourse</li>
            </ul>
          </div>

          {/* STATE */}
          <div>
            <h4 className="text-[#ede8e0] text-[9px] font-bold tracking-[0.4em] uppercase mb-5">STATE とは</h4>
            <ul className="space-y-3 text-[#7a7060] text-sm">
              <li>状態 <span className="text-[#3a3628]">state of being</span></li>
              <li>場 <span className="text-[#3a3628]">state as place</span></li>
              <li>宣言 <span className="text-[#3a3628]">statement</span></li>
            </ul>
            <div className="mt-6">
              <Link
                href="/circle"
                className="inline-block border border-[#c9a96e]/40 text-[#c9a96e] px-4 py-2 text-xs font-bold tracking-wide hover:bg-[#c9a96e] hover:text-[#050505] transition-all"
              >
                Enter Circle →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#3a3628] text-xs">
            © 2025 HOUSE IS A STATE — Japan Origin · International Platform
          </p>
          <div className="flex items-center gap-2 text-[#3a3628] text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse-dot inline-block"></span>
            <span>Built on 20 years of practice.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
