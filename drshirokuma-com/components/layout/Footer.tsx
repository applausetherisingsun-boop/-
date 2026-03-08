export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1c1710', color: '#b0a090' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #c4a05a, #a07830)' }}
              >
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'serif' }}>白</span>
              </div>
              <div>
                <div className="text-white font-bold text-base tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
                  Dr. Shirokuma
                </div>
                <div className="text-[9px] tracking-[0.35em] uppercase" style={{ color: '#a07830', fontFamily: 'sans-serif' }}>
                  Anti-Aging Clinic
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ fontFamily: 'sans-serif', color: '#8a7060' }}>
              エビデンスに基づく統合アンチエイジング医療で、
              あなたの老化プロセスを科学的に制御します。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-5"
              style={{ color: '#a07830', fontFamily: 'sans-serif' }}
            >
              メニュー
            </h4>
            <ul className="space-y-3">
              {[
                { href: '#philosophy', label: '診療哲学' },
                { href: '#axes', label: '6軸アプローチ' },
                { href: '#programs', label: 'プログラム・料金' },
                { href: '#author', label: '医師紹介' },
                { href: '#cta', label: 'ご予約・お問い合わせ' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[#c4a05a]"
                    style={{ color: '#8a7060', fontFamily: 'sans-serif' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs tracking-[0.3em] uppercase mb-5"
              style={{ color: '#a07830', fontFamily: 'sans-serif' }}
            >
              クリニック情報
            </h4>
            <div className="space-y-3 text-sm" style={{ fontFamily: 'sans-serif', color: '#8a7060' }}>
              <p>診療時間：月〜金 10:00 – 19:00</p>
              <p>土曜：10:00 – 14:00</p>
              <p>日・祝：休診</p>
              <p className="pt-2">
                <a href="mailto:info@drshirokuma.com" className="hover:text-[#c4a05a] transition-colors">
                  info@drshirokuma.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: '#2a2218' }}
        >
          <p className="text-xs" style={{ color: '#5c4a30', fontFamily: 'sans-serif' }}>
            © {new Date().getFullYear()} Dr. Shirokuma Anti-Aging Clinic. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ fontFamily: 'sans-serif' }}>
            <a href="#" className="hover:text-[#c4a05a] transition-colors" style={{ color: '#5c4a30' }}>
              プライバシーポリシー
            </a>
            <a href="#" className="hover:text-[#c4a05a] transition-colors" style={{ color: '#5c4a30' }}>
              特定商取引法に基づく表記
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
