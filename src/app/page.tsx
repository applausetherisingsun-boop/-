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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050505]">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 80px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 80px)',
          }}
        />
        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/40 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto text-center pt-32 pb-20">
          {/* Label */}
          <div className="inline-flex items-center gap-3 border border-white/8 px-5 py-2 mb-14">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse-dot" />
            <span className="text-[9px] font-bold tracking-[0.5em] text-[#5a5040] uppercase">
              日本発 · International House Culture Platform
            </span>
          </div>

          <h1 className="text-[clamp(2.8rem,9vw,7rem)] font-black text-[#ede8e0] leading-[0.88] tracking-tight mb-8">
            HOUSE<br />IS A<br />
            <span className="text-gold">STATE</span>
          </h1>

          <p className="text-[#5a5040] text-sm tracking-[0.6em] mb-10 uppercase">
            Not a genre. A state of being.
          </p>

          <p className="text-[#7a7060] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-14">
            ジャンルではなく、状態。消費ではなく、共鳴。<br />
            ハウスミュージックを媒介に、身体・創造・コミュニティを接続する<br className="hidden md:block" />
            日本発の国際文化プラットフォーム。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/circle"
              className="group flex items-center justify-center gap-3 border border-[#c9a96e]/50 text-[#c9a96e] px-10 py-4 font-black tracking-wide hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-300"
            >
              Enter STATE Circle
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-center border border-white/8 text-[#7a7060] px-10 py-4 font-medium tracking-wide hover:border-white/15 hover:text-[#ede8e0] transition-all duration-300"
            >
              Read the Concept
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[#3a3628] text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#c9a96e]/40 to-transparent" />
        </div>
      </section>

      {/* ── STATE の三つの意味 ── */}
      <section className="py-28 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-4">STATE とは何か</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#ede8e0]">三つの意味が重なる</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {stateMeanings.map((s) => (
              <div key={s.ja} className="bg-[#050505] p-10 hover:bg-[#0d0d0d] transition-colors group">
                <div className="mb-5">
                  <p className="text-[#c9a96e] font-black text-2xl mb-1">{s.ja}</p>
                  <p className="text-[#3a3628] text-xs tracking-widest">{s.en}</p>
                </div>
                <p className="text-[#7a7060] text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Concept ── */}
      <section className="py-28 px-6 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-6">起源</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#ede8e0] leading-tight mb-6">
                ハウスは「聴く」ものではなく、<br />
                <span className="text-gold">「なる」ものだった。</span>
              </h2>
              <p className="text-[#7a7060] text-base leading-relaxed mb-6">
                1970〜80年代、シカゴのアフリカ系・ラテン系・クィアコミュニティから生まれたハウスミュージック。
                それは単なる音楽ジャンルではなく、マイノリティが生存と祝祭を同時に行う身体的実践だった。
              </p>
              <p className="text-[#7a7060] text-base leading-relaxed mb-8">
                4つ打ちのキック。繰り返されるグルーヴ。汗と暗闇と集団同期。
                しかし21世紀において、ハウスは消費されるコンテンツになった。
                HOUSE IS A STATE は、この喪失に対するカウンターである。
              </p>
              <Link href="/roots" className="text-[#c9a96e] text-sm hover:underline">
                ROOTS — 歴史と起源を読む →
              </Link>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Boiler Room', desc: '配信の「場」を作った → DJが集まった' },
                { label: 'Bandcamp', desc: '売るインフラを作った → クリエイターが集まった' },
                { label: 'Substack', desc: '書く場所を作った → ライターが集まった' },
                { label: 'HOUSE IS A STATE', desc: '文化的権威 × 流通インフラ × コミュニティを同時設計する', highlight: true },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`p-5 border transition-colors ${
                    item.highlight
                      ? 'border-[#c9a96e]/30 bg-[#c9a96e]/5'
                      : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <p className={`font-bold text-sm mb-1 ${item.highlight ? 'text-[#c9a96e]' : 'text-[#ede8e0]'}`}>
                    {item.label}
                  </p>
                  <p className="text-[#7a7060] text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI時代における三つの実践 ── */}
      <section className="py-28 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-4">AI時代における三つの実践</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#ede8e0]">
              AIが代替できないものを<br />設計する
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {three.map((item) => (
              <div key={item.num} className="bg-[#050505] p-10 hover:bg-[#0d0d0d] transition-colors group flex flex-col">
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-[#3a3628] font-black text-4xl leading-none">{item.num}</span>
                  <div>
                    <h3 className="text-[#ede8e0] font-black text-xl group-hover:text-[#c9a96e] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[#3a3628] text-xs">{item.ja}</span>
                  </div>
                </div>
                <p className="text-[#7a7060] text-sm leading-relaxed mb-6 flex-1">{item.body}</p>
                <Link href={item.href} className="text-[#c9a96e] text-xs font-bold tracking-wide hover:underline">
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Structure ── */}
      <section className="py-28 px-6 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-4">Platform Structure</p>
              <h2 className="text-3xl md:text-4xl font-black text-[#ede8e0]">
                ROOTS → NOW → NEXT
              </h2>
            </div>
            <p className="text-[#5a5040] text-sm max-w-xs leading-relaxed">
              思想レイヤー → コミュニティレイヤー → 流通レイヤー → 収益レイヤー
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
            {platform.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`bg-[#0d0d0d] p-8 hover:bg-[#141414] transition-colors group ${
                  item.href === '#' ? 'pointer-events-none opacity-40' : ''
                }`}
              >
                <h3 className="text-[#ede8e0] font-black text-lg mb-1 group-hover:text-[#c9a96e] transition-colors">
                  {item.label}
                </h3>
                <p className="text-[#5a5040] text-xs">{item.sub}</p>
                {item.href === '#' && (
                  <p className="text-[#3a3628] text-[9px] tracking-widest mt-2 uppercase">Coming Phase 2</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder Quote ── */}
      <section className="py-28 px-6 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#3a3628] text-[9px] tracking-[0.5em] uppercase mb-10">Founder</p>
          <blockquote className="text-2xl md:text-3xl text-[#7a7060] leading-relaxed font-light mb-10">
            「高校生のとき、ハウスダンスを初めて見て、人間の本質が見える気がした。
            その問いは20年間、形を変えながらも変わっていない。
            ダンス、身体、意識、禅、バイオハック——
            すべて同じ問いへの、異なるアクセス経路だった。」
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-[#c9a96e]/40" />
            <p className="text-[#3a3628] text-[10px] tracking-[0.4em] uppercase">
              NISHI · Founder · 20 years · Physician
            </p>
            <div className="w-8 h-px bg-[#c9a96e]/40" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-t border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-[#ede8e0] mb-4 leading-tight">
            場を作る。<br />
            <span className="text-gold">あとは育つ。</span>
          </h2>
          <p className="text-[#7a7060] mb-10 leading-relaxed">
            Phase 1が始まる。先着クリエイター100名の招待、Ritual Night 第1回、STATE Circleの立ち上げ。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/circle"
              className="group flex items-center justify-center gap-3 border border-[#c9a96e]/50 text-[#c9a96e] px-10 py-4 font-black tracking-wide hover:bg-[#c9a96e] hover:text-[#050505] transition-all duration-300"
            >
              Enter STATE Circle
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/ritual"
              className="flex items-center justify-center border border-white/8 text-[#7a7060] px-10 py-4 font-medium tracking-wide hover:border-white/15 hover:text-[#ede8e0] transition-all"
            >
              Ritual Night を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
