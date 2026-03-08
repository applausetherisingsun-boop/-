import Link from 'next/link';
const tickerItems = [
  'SHIROKUMA', 'NATURAL CODE', 'INNER CIRCLE', 'ADAPT OR DECLINE',
  '老化という文明病', 'SHIROKUMA', 'NATURAL CODE', 'INNER CIRCLE',
  'ADAPT OR DECLINE', '老化という文明病',
];
const axes = [
  {
    num: '01', icon: '🔥',
    en: 'Inflammation',
    ja: '炎症・免疫軸',
    body: '慢性炎症こそが老化の正体。免疫システムを最適化する。',
  },
  {
    num: '02', icon: '🦠',
    en: 'Microbiome',
    ja: '腸内環境軸',
    body: '全身の免疫の70%は腸にある。腸内細菌叢を整える。',
  },
  {
    num: '03', icon: '🧠',
    en: 'Nervous System',
    ja: '神経軸',
    body: 'コルチゾールの暴走を止める。神経系を再調整する。',
  },
  {
    num: '04', icon: '⚡',
    en: 'Metabolism',
    ja: '代謝軸',
    body: 'ミトコンドリアを若返らせる。細胞レベルの代謝を最適化する。',
  },
  {
    num: '05', icon: '🌙',
    en: 'Hormonal',
    ja: 'ホルモン軸',
    body: '内分泌を最適化する。ホルモンバランスを取り戻す。',
  },
  {
    num: '06', icon: '🤝',
    en: 'Social',
    ja: '社会軸',
    body: '孤独は1日15本のタバコに相当するリスク。つながりが寿命を延ばす。',
  },
];
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
          aria-hidden
        >
          <span
            className="text-[clamp(6rem,22vw,18rem)] font-black text-[#1a1814]/[0.04] tracking-tight leading-none whitespace-nowrap"
          >
            SHIROKUMA
          </span>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-12">
            <h1
              className="text-[clamp(4rem,14vw,11rem)] font-black text-[#1a1814] leading-[0.85] tracking-tight"
              style={{ fontStyle: 'italic', letterSpacing: '-0.03em' }}
            >
              SHIRO<br />KUMA
            </h1>
            <div
              className="absolute -bottom-2 -right-4 w-[120%] h-px bg-[#1a1814]/20 origin-left"
              style={{ transform: 'rotate(-8deg)' }}
            />
          </div>
          <p className="text-[#6b6355] text-[10px] tracking-[0.5em] uppercase mb-2">
            Scroll
          </p>
          <div className="w-px h-10 bg-gradient-to-b from-[#a07830]/50 to-transparent" />
        </div>
      </section>
      {/* ── Ticker ── */}
      <div className="overflow-hidden border-y border-[rgba(26,24,20,0.08)] py-4 bg-[#f5f0e8]">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="text-[#b0a898] text-[9px] font-bold tracking-[0.5em] uppercase mx-8"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      {/* ── PHILOSOPHY ── */}
      <section className="py-28 px-6 md:px-12 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-8 h-px bg-[#a07830]" />
            <p className="text-[#a07830] text-[9px] tracking-[0.5em] uppercase font-bold">Philosophy</p>
          </div>
          <div className="ja-serif text-[clamp(2rem,5vw,3.5rem)] text-[#1a1814] leading-[1.6] mb-16 space-y-2">
            <p>ホッキョクグマは今、絶滅の危機</p>
            <p>にある。</p>
            <p>
              それでも——
              <span className="text-gold">適応しようとしてい</span>
            </p>
            <p>
              <span className="text-gold">る。</span>
            </p>
            <p>人間は、どうか。</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#6b6355] text-base leading-relaxed mb-4">
                老化の本質的な原因は、現代文明そのものにある。
                <span className="text-gold font-medium">社会構造が慢性炎症を生み出し、孤独がコルチゾールを上昇させ、加工食品が腸内細菌を破壊する。</span>
              </p>
              <p className="text-[#6b6355] text-base leading-relaxed">
                これは個人の努力の問題ではなく、文明とのミスマッチの問題だ。
              </p>
            </div>
            <div className="border border-[rgba(26,24,20,0.08)] p-8 bg-[#ede8df]">
              <p className="text-[clamp(3rem,8vw,5rem)] font-black text-[#a07830] leading-none mb-3">80%</p>
              <p className="text-[#6b6355] text-sm leading-relaxed mb-2">
                遺伝子が長寿を決めるのはわずか20%。残り80%は生活習慣が決定する。
              </p>
              <p className="text-[#b0a898] text-[10px] tracking-wider">（Belsky et al., PNAS, 2015）</p>
            </div>
          </div>
        </div>
      </section>
      {/* ── NATURAL CODE / 6 AXES ── */}
      <section className="py-28 px-6 md:px-12 bg-[#ede8df]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <p className="text-[#a07830] text-[9px] tracking-[0.5em] uppercase font-bold mb-3">Natural Code</p>
              <h2 className="text-[clamp(3rem,8vw,6rem)] font-black text-[#1a1814] leading-none tracking-tight">
                6 AXES
              </h2>
            </div>
            <p className="text-[#6b6355] text-sm text-right max-w-xs leading-relaxed">
              文明に適応するための<br />6軸実践フレームワーク
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(26,24,20,0.08)]">
            {axes.map((axis) => (
              <div
                key={axis.num}
                className="bg-[#ede8df] p-10 hover:bg-[#e5dfd5] transition-colors"
              >
                <p className="text-[#b0a898] text-xs font-bold mb-5">{axis.num}</p>
                <p className="text-2xl mb-3">{axis.icon}</p>
                <h3 className="text-[#1a1814] font-bold text-lg mb-1">{axis.en}</h3>
                <p className="text-[#6b6355] text-xs tracking-wider mb-4">{axis.ja}</p>
                <p className="text-[#6b6355] text-sm leading-relaxed">{axis.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/natural-code"
              className="inline-flex items-center gap-2 text-[#a07830] text-xs font-bold tracking-[0.3em] uppercase hover:gap-4 transition-all"
            >
              6軸モデルを詳しく読む →
            </Link>
          </div>
        </div>
      </section>
      {/* ── PROGRAMS ── */}
      <section className="py-28 px-6 md:px-12 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-8 h-px bg-[#a07830]" />
            <p className="text-[#a07830] text-[9px] tracking-[0.5em] uppercase font-bold">Programs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[rgba(26,24,20,0.08)]">
            {[
              {
                label: '書籍',
                title: '老化は文明病である',
                sub: '論文477本引用・医師が書いた思想書',
                tag: 'Coming 2026',
              },
              {
                label: 'note マガジン',
                title: '月額 ¥1,000',
                sub: '最新論文解説・6軸深掘り・月4本更新',
                tag: 'Available',
                href: 'https://note.com',
              },
              {
                label: 'Inner Circle',
                title: '年額 ¥300,000',
                sub: '医師・経営者・研究者向け四半期ラウンドテーブル（招待制）',
                tag: 'Invitation Only',
                href: '/inner-circle',
              },
            ].map((p) => (
              <div key={p.label} className="bg-[#f5f0e8] p-10 hover:bg-[#ede8df] transition-colors">
                <p className="text-[#b0a898] text-[9px] tracking-[0.3em] uppercase mb-4">{p.label}</p>
                <p className="text-[#1a1814] font-black text-xl mb-3 ja-serif">{p.title}</p>
                <p className="text-[#6b6355] text-sm leading-relaxed mb-6">{p.sub}</p>
                <span className="inline-block border border-[rgba(26,24,20,0.1)] text-[#6b6355] text-[9px] tracking-[0.3em] uppercase px-3 py-1">
                  {p.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Author ── */}
      <section className="py-28 px-6 md:px-12 bg-[#ede8df] border-t border-[rgba(26,24,20,0.06)]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#b0a898] text-[9px] tracking-[0.5em] uppercase mb-10">Author</p>
          <blockquote className="ja-serif text-[clamp(1.2rem,3vw,1.8rem)] text-[#6b6355] leading-relaxed mb-10">
            「日本は世界最長寿国でありながら、<br className="hidden md:block" />
            その理由を科学的に解体した医師がいない。<br className="hidden md:block" />
            和食・発酵・禅・森林浴——<br className="hidden md:block" />
            これらは単なる文化ではなく、<br className="hidden md:block" />
            <span className="text-gold">文明病への答えだった。</span>」
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#a07830]/40" />
            <p className="text-[#b0a898] text-[10px] tracking-[0.4em] uppercase">
              NISHI · 現役医師 · SHIROKUMA Founder
            </p>
            <div className="w-8 h-px bg-[#a07830]/40" />
          </div>
        </div>
      </section>
      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-[#f5f0e8] border-t border-[rgba(26,24,20,0.06)] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="ja-serif text-[clamp(1.8rem,4vw,2.8rem)] text-[#1a1814] mb-4 leading-relaxed">
            老化を文明の問題として捉え直す。
          </h2>
          <p className="text-[#6b6355] mb-10 text-sm leading-relaxed">
            進化医学・炎症科学・マイクロバイオームの6軸で、あなたの生活習慣を再設計する。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inner-circle"
              className="inline-flex items-center justify-center border border-[#a07830]/50 text-[#a07830] px-10 py-4 text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#a07830] hover:text-[#f5f0e8] transition-all duration-300"
            >
              Inner Circle に参加する
            </Link>
            <Link
              href="/philosophy"
              className="inline-flex items-center justify-center border border-[rgba(26,24,20,0.12)] text-[#6b6355] px-10 py-4 text-xs font-medium tracking-wider hover:border-[rgba(26,24,20,0.25)] hover:text-[#1a1814] transition-all"
            >
              思想を読む
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
