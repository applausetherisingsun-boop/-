import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const stateMeanings = [
  {
    en: 'State of being',
    ja: '状態',
    body: 'ハウスは「聴く」ものではなく、身体が「なる」状態。4つ打ちのキックに同期したとき、思考が止まり、感覚だけが残る。これは動的瞑想状態だ。',
  },
  {
    en: 'State as place',
    ja: '場',
    body: '文化が根を張るためのインフラ。コンテンツを生産する媒体ではなく、クリエイターとコミュニティが自律的にエコシステムを育てる「場」を設計する。',
  },
  {
    en: 'Statement',
    ja: '宣言',
    body: 'AI時代における身体性の宣言。AIは音楽を生成できる。映像を生成できる。しかしAIは「同じ空間でキックに揺れた後の、あの身体感覚」を生成することはできない。',
  },
];

const three = [
  {
    num: '01',
    title: 'Experience',
    ja: '体験',
    body: 'AIは体験を生成できない。Ritual Nightは20〜30人限定。売るのは情報ではなく「身体状態の変化」。スケールしないことが価値の源泉。',
    href: '/ritual',
    cta: 'Ritual Night →',
  },
  {
    num: '02',
    title: 'Community',
    ja: 'コミュニティ',
    body: 'AIはコミュニティを代替できない。「この人に認められたい」「この空間に属したい」という人間的欲求はAIが満たせない。STATE Circleは深さ > 広さで設計される。',
    href: '/circle',
    cta: 'STATE Circle →',
  },
  {
    num: '03',
    title: 'Creative Practice',
    ja: '創作活動',
    body: 'AIは創造の動機を持てない。人間の創造行為は「AIを使いこなす文脈力」と「AIが生成できない衝動・身体性・関係性」の組み合わせに進化する。',
    href: '/roots',
    cta: 'ROOTS →',
  },
];

const platform = [
  { label: 'ROOTS',       sub: '歴史・思想・系譜', href: '/roots' },
  { label: 'NOW',         sub: '現行シーンのレポート', href: '#' },
  { label: 'NEXT',        sub: 'AI × 身体 × ハウス', href: '#' },
  { label: 'Culture Map', sub: '都市別カルチャー拠点', href: '#' },
  { label: 'Marketplace', sub: '音源・知識・サービスの売買', href: '#' },
  { label: 'Discourse',   sub: '批評・議論・情報交換', href: '#' },
];

const tickerItems = [
  'HOUSE IS A STATE',
  'NOT A GENRE',
  'A STATE OF BEING',
  '身体同期',
  'YOU ARE MY REFLECTION',
  'CHICAGO 1977',
  'TOKYO 2025',
  'EMBODIED INTELLIGENCE',
  'NOT CONSUMPTION — RESONANCE',
  'ジャンルではなく、状態',
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#060606]">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">

        {/* Fine grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,rgba(255,255,255,0.022) 0,rgba(255,255,255,0.022) 1px,transparent 1px,transparent 80px),repeating-linear-gradient(90deg,rgba(255,255,255,0.022) 0,rgba(255,255,255,0.022) 1px,transparent 1px,transparent 80px)',
          }}
        />

        {/* Radial gold glow — behind title */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Side vertical lines */}
        <div className="absolute left-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent hidden lg:block" />
        <div className="absolute right-8 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent hidden lg:block" />

        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/50 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto text-center pt-32 pb-20">

          {/* Label badge */}
          <div className="animate-fade-up inline-flex items-center gap-3 border border-white/[0.07] bg-white/[0.015] backdrop-blur-sm px-5 py-2.5 mb-16 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse-dot" />
            <span className="text-[9px] font-bold tracking-[0.55em] text-[#4a4030] uppercase">
              日本発 · International House Culture Platform
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-display animate-fade-up delay-100 text-[clamp(3.2rem,10vw,8rem)] font-black text-[#ede8e0] leading-[0.86] tracking-[-0.02em] mb-10">
            HOUSE<br />IS A<br />
            <span className="text-gold">STATE</span>
          </h1>

          {/* Divider line */}
          <div className="animate-fade-up delay-200 flex items-center justify-center gap-5 mb-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a96e]/30" />
            <p className="text-[#4a4030] text-[9px] tracking-[0.7em] uppercase">
              Not a genre. A state of being.
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a96e]/30" />
          </div>

          <p className="animate-fade-up delay-300 text-[#6a6050] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-16">
            ジャンルではなく、状態。消費ではなく、共鳴。<br />
            ハウスミュージックを媒介に、身体・創造・コミュニティを接続する<br className="hidden md:block" />
            日本発の国際文化プラットフォーム。
          </p>

          <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/circle"
              className="group relative flex items-center justify-center gap-3 border border-[#c9a96e]/45 text-[#c9a96e] px-10 py-4 font-black tracking-widest text-sm hover:bg-[#c9a96e] hover:text-[#060606] hover:border-[#c9a96e] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Enter STATE Circle
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-center border border-white/[0.07] text-[#6a6050] px-10 py-4 text-sm font-medium tracking-widest hover:border-white/[0.14] hover:text-[#ede8e0] transition-all duration-300"
            >
              Read the Concept
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 animate-fade-up delay-700">
          <span className="text-[#2e2a20] text-[8px] tracking-[0.5em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#c9a96e]/30 to-transparent" />
        </div>
      </section>

      {/* ── Marquee Ticker ── */}
      <div className="border-y border-white/[0.05] py-4 overflow-hidden bg-[#060606]">
        <div className="flex animate-ticker whitespace-nowrap select-none">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-8">
              <span className="text-[10px] tracking-[0.45em] text-[#3a3020] uppercase font-bold">{item}</span>
              <span className="w-1 h-1 rounded-full bg-[#c9a96e]/25 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ── STATE の三つの意味 ── */}
      <section className="py-32 px-6 bg-[#060606]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[#c9a96e] text-[9px] tracking-[0.6em] uppercase mb-5 font-bold">STATE とは何か</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#ede8e0] tracking-tight">
              三つの意味が重なる
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]">
            {stateMeanings.map((s) => (
              <div
                key={s.ja}
                className="bg-[#060606] p-10 hover:bg-[#0c0c0c] transition-all duration-500 group relative overflow-hidden"
              >
                {/* Hover accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/0 to-transparent group-hover:via-[#c9a96e]/40 transition-all duration-500" />
                <div className="mb-6">
                  <p className="font-display text-[#c9a96e] font-black text-3xl mb-1.5 tracking-tight">{s.ja}</p>
                  <p className="text-[#2e2820] text-[9px] tracking-[0.5em] uppercase">{s.en}</p>
                </div>
                <p className="text-[#6a6050] text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Concept ── */}
      <section className="py-32 px-6 bg-[#0a0a0a] border-y border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[#c9a96e] text-[9px] tracking-[0.6em] uppercase mb-7 font-bold">起源</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#ede8e0] leading-tight tracking-tight mb-7">
                ハウスは「聴く」ものではなく、<br />
                <span className="text-gold">「なる」ものだった。</span>
              </h2>
              <p className="text-[#6a6050] text-base leading-relaxed mb-5">
                1970〜80年代、シカゴのアフリカ系・ラテン系・クィアコミュニティから生まれたハウスミュージック。
                それは単なる音楽ジャンルではなく、マイノリティが生存と祝祭を同時に行う身体的実践だった。
              </p>
              <p className="text-[#6a6050] text-base leading-relaxed mb-10">
                4つ打ちのキック。繰り返されるグルーヴ。汗と暗闇と集団同期。
                しかし21世紀において、ハウスは消費されるコンテンツになった。
                HOUSE IS A STATE は、この喪失に対するカウンターである。
              </p>
              <Link href="/roots" className="group inline-flex items-center gap-2 text-[#c9a96e] text-xs font-bold tracking-widest uppercase hover:gap-3 transition-all">
                ROOTS — 歴史と起源を読む
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Boiler Room', desc: '配信の「場」を作った → DJが集まった' },
                { label: 'Bandcamp', desc: '売るインフラを作った → クリエイターが集まった' },
                { label: 'Substack', desc: '書く場所を作った → ライターが集まった' },
                { label: 'HOUSE IS A STATE', desc: '文化的権威 × 流通インフラ × コミュニティを同時設計する', highlight: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`px-6 py-5 border transition-all duration-300 ${
                    item.highlight
                      ? 'border-[#c9a96e]/25 bg-[#c9a96e]/[0.04] hover:border-[#c9a96e]/40'
                      : 'border-white/[0.05] hover:border-white/[0.09] hover:bg-white/[0.015]'
                  }`}
                >
                  <p className={`font-bold text-sm mb-1.5 tracking-wide ${item.highlight ? 'text-[#c9a96e]' : 'text-[#ede8e0]'}`}>
                    {item.label}
                  </p>
                  <p className="text-[#6a6050] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI時代における三つの実践 ── */}
      <section className="py-32 px-6 bg-[#060606]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#c9a96e] text-[9px] tracking-[0.6em] uppercase mb-5 font-bold">AI時代における三つの実践</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#ede8e0] tracking-tight">
              AIが代替できないものを<br />設計する
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]">
            {three.map((item) => (
              <div
                key={item.num}
                className="bg-[#060606] p-10 hover:bg-[#0c0c0c] transition-all duration-500 group flex flex-col relative overflow-hidden"
              >
                {/* Number background */}
                <div className="absolute top-6 right-8 font-display font-black text-[5rem] text-white/[0.02] leading-none pointer-events-none select-none">
                  {item.num}
                </div>
                <div className="flex items-baseline gap-3 mb-7 relative">
                  <span className="text-[#2e2820] font-black text-3xl leading-none font-display">{item.num}</span>
                  <div>
                    <h3 className="font-display text-[#ede8e0] font-black text-xl tracking-tight group-hover:text-[#c9a96e] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <span className="text-[#2e2820] text-[9px] tracking-widest">{item.ja}</span>
                  </div>
                </div>
                <p className="text-[#6a6050] text-sm leading-relaxed mb-7 flex-1">{item.body}</p>
                <Link href={item.href} className="group/cta inline-flex items-center gap-2 text-[#c9a96e] text-[10px] font-bold tracking-[0.4em] uppercase hover:gap-3 transition-all">
                  {item.cta.replace(' →', '')}
                  <ArrowRight size={11} className="group-hover/cta:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Structure ── */}
      <section className="py-32 px-6 bg-[#0a0a0a] border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[#c9a96e] text-[9px] tracking-[0.6em] uppercase mb-5 font-bold">Platform Structure</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#ede8e0] tracking-tight">
                ROOTS → NOW → NEXT
              </h2>
            </div>
            <p className="text-[#4a4030] text-xs max-w-xs leading-relaxed tracking-wide">
              思想レイヤー → コミュニティレイヤー → 流通レイヤー → 収益レイヤー
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.04]">
            {platform.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`bg-[#0a0a0a] p-8 hover:bg-[#111] transition-all duration-300 group ${
                  item.href === '#' ? 'pointer-events-none opacity-35' : ''
                }`}
              >
                <h3 className="font-display text-[#ede8e0] font-black text-lg mb-1.5 tracking-tight group-hover:text-[#c9a96e] transition-colors">
                  {item.label}
                </h3>
                <p className="text-[#4a4030] text-xs tracking-wide">{item.sub}</p>
                {item.href === '#' && (
                  <p className="text-[#2e2820] text-[8px] tracking-[0.4em] mt-3 uppercase font-bold">Coming Phase 2</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder Quote ── */}
      <section className="py-32 px-6 bg-[#060606]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#2e2820] text-[9px] tracking-[0.6em] uppercase mb-14 font-bold">Founder</p>

          {/* Quote marks */}
          <div className="text-[#c9a96e]/15 font-display font-black text-[6rem] leading-none mb-[-1rem] select-none">"</div>

          <blockquote className="font-display text-2xl md:text-3xl text-[#5a5040] leading-relaxed font-light mb-12 tracking-tight">
            高校生のとき、ハウスダンスを初めて見て、人間の本質が見える気がした。
            その問いは20年間、形を変えながらも変わっていない。
            ダンス、身体、意識、禅、バイオハック——
            すべて同じ問いへの、異なるアクセス経路だった。
          </blockquote>
          <div className="flex items-center justify-center gap-5">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#c9a96e]/35" />
            <p className="text-[#2e2820] text-[9px] tracking-[0.5em] uppercase font-bold">
              NISHI · Founder · 20 years · Physician
            </p>
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#c9a96e]/35" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 px-6 bg-[#0a0a0a] border-t border-white/[0.04] text-center overflow-hidden">
        {/* Subtle background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(201,169,110,0.05) 0%, transparent 65%)',
            filter: 'blur(30px)',
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-black text-[#ede8e0] mb-5 leading-tight tracking-tight">
            場を作る。<br />
            <span className="text-gold">あとは育つ。</span>
          </h2>
          <p className="text-[#6a6050] mb-12 leading-relaxed">
            Phase 1が始まる。先着クリエイター100名の招待、Ritual Night 第1回、STATE Circleの立ち上げ。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/circle"
              className="group flex items-center justify-center gap-3 border border-[#c9a96e]/45 text-[#c9a96e] px-10 py-4 font-black tracking-widest text-sm hover:bg-[#c9a96e] hover:text-[#060606] hover:border-[#c9a96e] transition-all duration-300"
            >
              Enter STATE Circle
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/ritual"
              className="flex items-center justify-center border border-white/[0.07] text-[#6a6050] px-10 py-4 text-sm font-medium tracking-widest hover:border-white/[0.14] hover:text-[#ede8e0] transition-all"
            >
              Ritual Night を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
