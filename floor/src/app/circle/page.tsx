import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const tiers = [
  {
    name: 'Creator Pro',
    ja: 'クリエイター向け',
    price: '¥3,000',
    period: '/ 月',
    highlight: false,
    description: 'ハウスカルチャーに関わるクリエイターが直接マネタイズするためのインフラ。',
    features: [
      '音源・ミックス・知識の直接販売',
      'STATEキュレーションによる国際的発見可能性',
      '同深度のクリエイターとのコラボ接点',
      '制作術・機材・ビジネス情報の横断共有',
      'Ritual Night 優先通知 + 割引',
    ],
    cta: 'Creator として参加',
  },
  {
    name: 'STATE Circle',
    ja: 'コアコミュニティ',
    price: '¥9,800',
    period: '/ 月',
    highlight: true,
    description: '深さ > 広さ。ハウスカルチャーの思想・技術・人間を接続するコアコミュニティ。',
    features: [
      'Creator Pro の全機能',
      '思想的・技術的深度の議論フォーラム',
      'クリエイター × リスナーの直接接続',
      '国際的文化横断（日本 ↔ 海外シーン）',
      '定期 Gathering（オンライン + オフライン）',
      'Ritual Night 最優先予約 + 20%割引',
      'ブッキング機会への接続',
    ],
    cta: 'Circle に入る',
  },
];

const principles = [
  { label: '深さ > 広さ', body: 'フォロワー数ではなく文化的密度' },
  { label: '選抜性', body: '誰でも入れる場にしない。招待制・選考制の印象を維持' },
  { label: '自律性', body: '運営が管理するのではなく、メンバーが育てる' },
  { label: '身体が中心', body: 'デジタルは補助、リアルが核心' },
];

const forCreators = [
  { label: '流通インフラ', detail: 'ミックス・音源・知識を直接販売できる' },
  { label: '可視性', detail: 'STATEのキュレーションによる国際的発見可能性' },
  { label: '繋がり', detail: '同じ深度のクリエイターとのコラボレーション接点' },
  { label: 'ブッキング', detail: '国内外のブッキング機会への接続' },
  { label: '知識交換', detail: '制作術・機材・ビジネスの横断的情報共有' },
];

export default function CirclePage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-28">

      {/* Header */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-6">STATE Circle</p>
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-display font-display font-black text-[#ede8e0] leading-[0.9] tracking-tight mb-8">
            AIはコミュニティを<br />
            <span className="text-gold">代替できない。</span>
          </h1>
          <p className="text-[#7a7060] text-xl max-w-2xl leading-relaxed">
            「この人に認められたい」「この空間に属したい」という人間的欲求はAIが満たせない。
            AI時代において、本物のコミュニティの価値は反比例的に上昇する。
          </p>
        </div>
      </section>

      {/* Community Principles */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-10">設計原則</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
            {principles.map((p) => (
              <div key={p.label} className="bg-[#060606] p-8 hover:bg-[#0c0c0c] transition-colors">
                <h3 className="text-[#c9a96e] font-display font-black text-base mb-2">{p.label}</h3>
                <p className="text-[#5a5040] text-xs leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-y border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-12">Membership Tiers</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-10 border transition-colors ${
                  tier.highlight
                    ? 'border-[#c9a96e]/40 bg-[#c9a96e]/3'
                    : 'border-white/[0.07] bg-[#0d0d0d]'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className={`font-black text-xl ${tier.highlight ? 'text-[#c9a96e]' : 'text-[#ede8e0]'}`}>
                      {tier.name}
                    </p>
                    <p className="text-[#3a3628] text-[9px] tracking-widest">{tier.ja}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[#ede8e0] font-black text-2xl">{tier.price}</span>
                    <span className="text-[#5a5040] text-xs ml-1">{tier.period}</span>
                  </div>
                </div>
                <p className="text-[#7a7060] text-sm mb-8 mt-4 leading-relaxed">{tier.description}</p>
                <ul className="space-y-2.5 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex gap-3 items-start">
                      <span className={`flex-shrink-0 mt-0.5 ${tier.highlight ? 'text-[#c9a96e]' : 'text-[#5a5040]'}`}>
                        ✓
                      </span>
                      <span className="text-[#7a7060] text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 font-bold tracking-wide transition-all text-sm ${
                    tier.highlight
                      ? 'bg-[#c9a96e] text-[#050505] hover:bg-[#e8c88a]'
                      : 'border border-white/10 text-[#7a7060] hover:border-white/20 hover:text-[#ede8e0]'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-[#3a3628] text-xs text-center mt-6">
            Phase 1 ローンチ時に正式申込み開始。下記フォームで事前登録受付中。
          </p>
        </div>
      </section>

      {/* For Creators */}
      <section className="py-20 px-6 bg-[#060606]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-6">For Creators</p>
              <h2 className="text-2xl md:text-3xl font-display font-black text-[#ede8e0] mb-6 leading-tight">
                クリエイターがプラットフォームに<br />依存するのではなく、<br />
                <span className="text-gold">プラットフォームが<br />クリエイターに依存する。</span>
              </h2>
              <p className="text-[#7a7060] text-sm leading-relaxed">
                DJ、プロデューサー、セレクター、ビートメイカー、ライター——ハウスカルチャーに関わるすべてのクリエイターが、プラットフォームを通じて直接マネタイズできる構造を作る。
              </p>
            </div>
            <div className="space-y-3">
              {forCreators.map((item) => (
                <div key={item.label} className="flex gap-5 border-b border-white/[0.05] pb-4">
                  <p className="text-[#c9a96e] font-bold text-sm w-24 flex-shrink-0">{item.label}</p>
                  <p className="text-[#7a7060] text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Form */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-y border-white/[0.05]">
        <div className="max-w-md mx-auto text-center">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-6">Phase 1 — Early Access</p>
          <h2 className="text-2xl font-display font-black text-[#ede8e0] mb-4">先着100名の登録</h2>
          <p className="text-[#7a7060] text-sm leading-relaxed mb-10">
            Phase 1ローンチ時の優先案内。Ritual Night Vol.01の優先予約。クリエイターの方は審査の上、招待。
          </p>
          <div className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              placeholder="お名前 / Name"
              className="bg-transparent border border-white/[0.07] text-[#ede8e0] placeholder-[#3a3628] px-4 py-3 text-sm outline-none focus:border-[#c9a96e]/40 transition-colors"
            />
            <input
              type="email"
              placeholder="メールアドレス / Email"
              className="bg-transparent border border-white/[0.07] text-[#ede8e0] placeholder-[#3a3628] px-4 py-3 text-sm outline-none focus:border-[#c9a96e]/40 transition-colors"
            />
            <select className="bg-[#060606] border border-white/[0.07] text-[#7a7060] px-4 py-3 text-sm outline-none focus:border-[#c9a96e]/40 transition-colors">
              <option value="">あなたの立場 / Your role</option>
              <option>DJ / Producer</option>
              <option>ダンサー / Dancer</option>
              <option>リスナー / Listener</option>
              <option>ライター / Writer</option>
              <option>その他 / Other</option>
            </select>
            <input
              type="text"
              placeholder="都市 / City"
              className="bg-transparent border border-white/[0.07] text-[#ede8e0] placeholder-[#3a3628] px-4 py-3 text-sm outline-none focus:border-[#c9a96e]/40 transition-colors"
            />
          </div>
          <button className="w-full bg-[#c9a96e] text-[#050505] py-4 font-black tracking-wide hover:bg-[#e8c88a] transition-all flex items-center justify-center gap-2">
            事前登録する
            <ArrowRight size={16} />
          </button>
          <p className="text-[#3a3628] text-[10px] mt-4">
            スパムはない。アルゴリズムもない。ただ、文化がある。
          </p>
        </div>
      </section>

      {/* Final statement */}
      <section className="py-20 px-6 bg-[#060606] text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl text-[#7a7060] leading-relaxed mb-6 font-light">
            「場を作る。あとは育つ。」
          </p>
          <p className="text-[#3a3628] text-sm">— HOUSE IS A STATE</p>
        </div>
      </section>
    </div>
  );
}
