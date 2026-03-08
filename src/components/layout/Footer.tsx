import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#080706', borderTop: '1px solid #2e2822' }} className="text-[#a09080] py-24 px-8">
      <div className="max-w-6xl mx-auto">

        {/* Top — brand + tagline */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-px h-8" style={{ background: '#b8904c', opacity: 0.25 }}></div>
            <span className="text-[#f4f0e8] text-xs font-sans tracking-[0.35em] uppercase font-light">SHIROKUMA</span>
            <div className="w-px h-8" style={{ background: '#b8904c', opacity: 0.25 }}></div>
          </div>
          <p className="text-[#8a7a6a] text-sm font-serif italic leading-relaxed">
            日本の長寿の叡智を、科学で世界へ。
          </p>
          <p className="text-[#3a3028] text-[11px] font-sans tracking-[0.2em] mt-2">
            Decoding Japan&apos;s longevity wisdom through science.
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div>
            <p className="text-[#f4f0e8] text-[9px] font-sans tracking-[0.35em] uppercase mb-6 font-light">Platform</p>
            <ul className="space-y-3">
              {[
                { href: '/diagnosis', label: 'Free Diagnosis' },
                { href: '/science',   label: 'Science' },
                { href: '/marketplace', label: 'Marketplace' },
                { href: '/core',      label: 'CORE Membership' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#6a5e54] hover:text-[#b8904c] text-xs font-sans transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[#f4f0e8] text-[9px] font-sans tracking-[0.35em] uppercase mb-6 font-light">6 Axes</p>
            <ul className="space-y-3 text-[#6a5e54] text-xs font-sans">
              <li>Inflammation</li>
              <li>Gut Microbiome</li>
              <li>Neural · Stress</li>
              <li>Metabolic</li>
              <li>Hormonal · Sleep</li>
              <li>Social · Ikigai</li>
            </ul>
          </div>

          <div>
            <p className="text-[#f4f0e8] text-[9px] font-sans tracking-[0.35em] uppercase mb-6 font-light">Partners</p>
            <ul className="space-y-3">
              {[
                { href: '/seller', label: 'List Your Product' },
                { href: '/core',   label: 'PRIME Membership' },
                { href: '/science', label: 'Research Access' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#6a5e54] hover:text-[#b8904c] text-xs font-sans transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[#f4f0e8] text-[9px] font-sans tracking-[0.35em] uppercase mb-6 font-light">Origin</p>
            <p className="text-[#3a3028] text-xs font-serif italic leading-relaxed">
              &ldquo;老化は宿命ではない&rdquo;
            </p>
            <p className="text-[#3a3028] text-[10px] font-sans mt-4 leading-relaxed">
              Designed & built in Japan<br />
              For the world.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderColor: '#2e2822' }}>
          <p className="text-[#3a3028] text-[10px] font-sans tracking-[0.15em]">
            © 2025 SHIROKUMA · drshirokuma.online
          </p>
          <p className="text-[#3a3028] text-[10px] font-sans">
            For educational purposes only. Not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
