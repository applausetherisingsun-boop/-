import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const purposes = [
  {
    n: '01',
    title: 'カルチャーの継承と進化',
    body: 'ハウスミュージックのオリジネーター精神——マイノリティの祝祭性、身体の解放、集団同期——を次世代に接続する。歴史を博物館化するのではなく、現在の文脈で再活性化する。',
  },
  {
    n: '02',
    title: 'クリエイターの経済的自立',
    body: 'DJ、プロデューサー、セレクター、ビートメイカー、ライターなど、ハウスカルチャーに関わるクリエイターが、プラットフォームを通じて直接マネタイズできる構造を作る。中間搾取を減らし、クリエイターが稼ぐエコシステムを設計する。',
  },
  {
    n: '03',
    title: '身体性の国際的発信',
    body: 'AI時代において失われつつある「身体で感じる」体験と「集団で同期する」感覚を、ハウスカルチャーという文脈で国際的に再提示する。日本のシーンを世界のシーンと接続する。',
  },
];

const japanReasons = [
  'バブル期から続く質の高いDJ文化',
  '細部への執着と音楽的精度',
  'クラブとアートと建築と料理が交差する都市文化',
  'アジア圏で最も成熟したエレクトロニック音楽市場の一つ',
  '過小評価されているが、世界水準のシーンが存在する',
];

const brandPrinciples = [
  { rule: '小規模を守る', detail: 'スケールしないことが価値の源泉' },
  { rule: '思想の深度を下げない', detail: '軽くなった瞬間に死ぬ' },
  { rule: '身体が中心', detail: 'デジタルは補助、常に' },
  { rule: 'クリエイターが主役', detail: 'プラットフォームは黒子' },
  { rule: '選ばれる側でいる', detail: '誰でも入れる場にしない' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-28">

      {/* Header */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-6">About / Concept</p>
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-display font-display font-black text-[#ede8e0] leading-[0.9] tracking-tight mb-10">
            HOUSE IS A STATE<br />
            <span className="text-gold">とは何か</span>
          </h1>
          <div className="max-w-2xl">
            <p className="text-[#a09880] text-xl leading-relaxed mb-4">
              ハウスミュージックを媒介に、身体・創造・コミュニティを接続する日本発の国際文化プラットフォーム。
            </p>
            <p className="text-[#5a5040] text-sm">
              思想（Why）と事業（What/How）と収益（How Much）を往復しながら読まれることを想定している。
            </p>
          </div>
        </div>
      </section>

      {/* Concept: STATEの定義 */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto border border-white/[0.05] p-10 md:p-14">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-8">Core Concept</p>
          <h2 className="text-2xl md:text-3xl font-display font-black text-[#ede8e0] mb-8">
            「STATE」には三つの意味が重なっている
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { ja: '状態', en: 'state of being', body: 'ハウスは聴くものでなく、身体がなる状態' },
              { ja: '場',   en: 'state as place',   body: '文化が根を張るための土台・インフラ' },
              { ja: '宣言', en: 'statement',         body: 'AI時代における身体性の宣言' },
            ].map((s) => (
              <div key={s.ja} className="border-t border-[#c9a96e]/20 pt-6">
                <p className="text-[#c9a96e] font-black text-xl mb-1">{s.ja}</p>
                <p className="text-[#3a3628] text-[9px] tracking-widest mb-4">{s.en}</p>
                <p className="text-[#7a7060] text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concept paragraph */}
      <section className="px-6 pb-20 bg-[#0d0d0d] border-y border-white/[0.05] py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-6">The Loss</p>
              <h2 className="text-2xl font-display font-black text-[#ede8e0] mb-6 leading-tight">
                ハウスは消費される<br />コンテンツになった
              </h2>
              <p className="text-[#7a7060] text-sm leading-relaxed mb-4">
                ハウスミュージックは1970〜80年代、シカゴのアフリカ系・ラテン系・クィアコミュニティから生まれた。それは単なる音楽ジャンルではなく、マイノリティが生存と祝祭を同時に行う身体的実践だった。
              </p>
              <p className="text-[#7a7060] text-sm leading-relaxed">
                しかし21世紀において、ハウスはSpotifyのプレイリストに並び、TikTokのBGMになり、ジャンルとして分類された。HOUSE IS A STATE は、この喪失に対するカウンターである。
              </p>
            </div>
            <div>
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-6">The Vacuum</p>
              <h2 className="text-2xl font-display font-black text-[#ede8e0] mb-6 leading-tight">
                構造的な空白が<br />存在する
              </h2>
              <div className="space-y-3">
                {[
                  '思想を語る場がない（SNSは浅すぎる）',
                  'クリエイターが直接稼げるインフラがない',
                  '国境を越えた知識交換の場がない',
                  '歴史とNOWとNEXTを接続する媒体がない',
                ].map((v) => (
                  <div key={v} className="flex gap-3 items-start">
                    <span className="text-[#c9a96e] mt-0.5 flex-shrink-0">—</span>
                    <p className="text-[#7a7060] text-sm">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className="py-20 px-6 bg-[#060606]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-12">Purpose — 三つの目的</p>
          <div className="space-y-px">
            {purposes.map((p) => (
              <div key={p.n} className="flex gap-8 p-8 bg-[#060606] hover:bg-[#0c0c0c] transition-colors border-b border-white/[0.05]">
                <span className="text-[#3a3628] font-black text-3xl flex-shrink-0 leading-none">{p.n}</span>
                <div>
                  <h3 className="text-[#ede8e0] font-display font-black text-lg mb-3">{p.title}</h3>
                  <p className="text-[#7a7060] text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Japan */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-y border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-6">日本発である理由</p>
              <h2 className="text-2xl md:text-3xl font-display font-black text-[#ede8e0] mb-6 leading-tight">
                日本のシーンは<br />国際的に過小評価されている
              </h2>
              <p className="text-[#7a7060] text-sm leading-relaxed">
                HOUSE IS A STATE は日本の深度を国際言語に翻訳するプラットフォームになる。
                日本から発信することは戦略的選択であり、文化的責任でもある。
              </p>
            </div>
            <div className="space-y-3">
              {japanReasons.map((r) => (
                <div key={r} className="flex gap-3 items-start border-b border-white/[0.05] pb-3">
                  <span className="text-[#c9a96e] flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-[#a09880] text-sm">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Principles */}
      <section className="py-20 px-6 bg-[#060606]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-12">
            ブランドの核 — 変えてはいけないもの
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5">
            {brandPrinciples.map((bp) => (
              <div key={bp.rule} className="bg-[#060606] p-8 hover:bg-[#0c0c0c] transition-colors">
                <h4 className="text-[#ede8e0] font-bold text-sm mb-2">{bp.rule}</h4>
                <p className="text-[#5a5040] text-xs leading-relaxed">{bp.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One-liner */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-t border-white/[0.05] text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#5a5040] text-[9px] tracking-[0.5em] uppercase mb-8">One Line Definition</p>
          <p className="text-xl md:text-2xl text-[#a09880] leading-relaxed mb-10">
            HOUSE IS A STATE は、<br />
            ハウスミュージックを媒介に<br />
            <span className="text-[#c9a96e] font-bold">身体・創造・コミュニティを接続する</span><br />
            日本発の国際文化プラットフォームである。
          </p>
          <p className="text-[#3a3628] text-sm italic">場を作る。あとは育つ。</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/circle"
              className="group flex items-center justify-center gap-2 border border-[#c9a96e]/50 text-[#c9a96e] px-8 py-4 font-bold hover:bg-[#c9a96e] hover:text-[#060606] transition-all"
            >
              Enter STATE Circle <ArrowRight size={14} />
            </Link>
            <Link
              href="/roots"
              className="flex items-center justify-center border border-white/[0.07] text-[#7a7060] px-8 py-4 hover:text-[#ede8e0] transition-all"
            >
              ROOTS を読む
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
