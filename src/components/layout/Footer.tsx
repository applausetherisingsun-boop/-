import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1c1917] text-[#c4b49a] py-24 px-8">
      <div className="max-w-6xl mx-auto">

        {/* Top — brand + tagline */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-px h-8 bg-[#a8895a]/30"></div>
            <span className="text-[#faf8f4] text-xs font-sans tracking-[0.35em] uppercase font-light">SHIROKUMA</span>
            <div className="w-px h-8 bg-[#a8895a]/30"></div>
          </div>
          <p className="text-[#7a7065] text-sm font-serif italic leading-relaxed">
            日本の長寿の叡智を、科学で世界へ。
          </p>
          <p className="text-[#4a4440] text-[11px] font-sans tracking-[0.2em] mt-2">
            Decoding Japan&apos;s longevity wisdom through science.
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div>
            <p className="text-[#faf8f4] text-[9px] font-sans tracking-[0.35em] uppercase mb-6 font-light">Platform</p>
            <ul className="space-y-3">
              {[
                { href: '/diagnosis', label: 'Free Diagnosis' },
                { href: '/science',   label: 'Science' },
                { href: '/marketplace', label: 'Marketplace' },
                { href: '/core',      label: 'CORE Membership' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#7a7065] hover:text-[#c4b49a] text-xs font-sans transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[#faf8f4] text-[9px] font-sans tracking-[0.35em] uppercase mb-6 font-light">6 Axes</p>
            <ul className="space-y-3 text-[#7a7065] text-xs font-sans">
              <li>Inflammation</li>
              <li>Gut Microbiome</li>
              <li>Neural · Stress</li>
              <li>Metabolic</li>
              <li>Hormonal · Sleep</li>
              <li>Social · Ikigai</li>
            </ul>
          </div>

          <div>
            <p className="text-[#faf8f4] text-[9px] font-sans tracking-[0.35em] uppercase mb-6 font-light">Partners</p>
            <ul className="space-y-3">
              {[
                { href: '/seller', label: 'List Your Product' },
                { href: '/core',   label: 'PRIME Membership' },
                { href: '/science', label: 'Research Access' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#7a7065] hover:text-[#c4b49a] text-xs font-sans transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[#faf8f4] text-[9px] font-sans tracking-[0.35em] uppercase mb-6 font-light">Origin</p>
            <p className="text-[#4a4440] text-xs font-serif italic leading-relaxed">
              &ldquo;老化は宿命ではない&rdquo;
            </p>
            <p className="text-[#4a4440] text-[10px] font-sans mt-4 leading-relaxed">
              Designed & built in Japan<br />
              For the world.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#3d3832] pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[#4a4440] text-[10px] font-sans tracking-[0.15em]">
            © 2025 SHIROKUMA · drshirokuma.online
          </p>
          <p className="text-[#4a4440] text-[10px] font-sans">
            For educational purposes only. Not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
