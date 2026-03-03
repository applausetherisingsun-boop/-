'use client';

import Link from 'next/link';
import { ArrowRight, FlaskConical } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const axes = [
  {
    id: 'inflammation', icon: '🔥', color: '#e07b54', bg: '#fff4f0',
    en: { label: 'Inflammation', science: 'Anti-inflammatory diet · Intestinal barrier · CRP markers', description: 'Chronic low-grade inflammation is the silent driver of aging. Japanese washoku and fermented foods naturally suppress NF-κB pathways.' },
    ja: { label: '炎症軸', science: '抗炎症食 · 腸管バリア · CRP指標', description: '慢性的な低グレードの炎症は老化の隠れたドライバーです。和食と発酵食品はNF-κBシグナルを自然に抑制します。' },
  },
  {
    id: 'gut', icon: '🦠', color: '#7a9e7e', bg: '#f0f6f1',
    en: { label: 'Gut Microbiome', science: 'Microbiome diversity · Short-chain fatty acids · Leaky gut', description: 'Japan\'s fermentation culture — miso, natto, kimchi — seeds the gut with longevity-associated Bifidobacterium and Lactobacillus species.' },
    ja: { label: '腸内環境軸', science: '腸内多様性 · 短鎖脂肪酸 · 腸漏れ', description: '日本の発酵文化（味噌・納豆・キムチ）は、長寿に関連するビフィズス菌と乳酸菌を腸内に定着させます。' },
  },
  {
    id: 'neural', icon: '🧠', color: '#7b68ee', bg: '#f4f2ff',
    en: { label: 'Neural / Stress', science: 'Cortisol · HPA axis · Neuroplasticity · Forest bathing', description: 'HPA axis dysregulation accelerates telomere shortening. Zen meditation and shinrin-yoku activate the parasympathetic system.' },
    ja: { label: '神経軸', science: 'コルチゾール · HPA軸 · 神経可塑性 · 森林浴', description: 'HPA軸の乱れはテロメア短縮を加速します。禅瞑想と森林浴は副交感神経系を活性化します。' },
  },
  {
    id: 'metabolic', icon: '⚡', color: '#e8a838', bg: '#fffbf0',
    en: { label: 'Metabolic', science: 'Mitochondria · mTOR · Insulin sensitivity · Onsen therapy', description: 'Mitochondrial biogenesis through thermal stress (onsen) and movement. Hara hachi bu naturally activates mTOR suppression.' },
    ja: { label: '代謝軸', science: 'ミトコンドリア · mTOR · インスリン感受性 · 温泉療法', description: '温泉（熱ストレス）と運動によるミトコンドリア新生。腹八分目はmTOR抑制を自然に活性化します。' },
  },
  {
    id: 'hormonal', icon: '🌙', color: '#3d5a80', bg: '#f0f4f8',
    en: { label: 'Hormonal / Sleep', science: 'Circadian biology · Melatonin · Sleep architecture · Blue light', description: 'Circadian rhythm alignment drives melatonin, growth hormone, and cortisol cycles. Light exposure patterns deeply affect biological aging.' },
    ja: { label: 'ホルモン軸', science: '概日リズム · メラトニン · 睡眠構造 · ブルーライト', description: 'サーカディアンリズムの同調がメラトニン・成長ホルモン・コルチゾールのサイクルを最適化します。光曝露パターンは生物学的老化に深く影響します。' },
  },
  {
    id: 'social', icon: '🤝', color: '#c9a96e', bg: '#faf6ef',
    en: { label: 'Social / Ikigai', science: 'Ikigai · Oxytocin · Loneliness biomarkers · Community', description: 'Ikigai — reason for being — is measurably correlated with longevity in Okinawan centenarians. Social bonds activate oxytocin anti-aging pathways.' },
    ja: { label: '社会軸', science: '生きがい · オキシトシン · 孤独バイオマーカー · コミュニティ', description: '「生きがい」は沖縄の百寿者における長寿と統計的に相関しています。社会的絆はオキシトシンの抗老化経路を活性化します。' },
  },
];

const stats = {
  en: [
    { value: '87', unit: 'years', label: 'Japan avg. lifespan', sub: '世界最長寿国' },
    { value: '6', unit: 'axes', label: 'Diagnostic framework', sub: '科学的フレームワーク' },
    { value: '100+', unit: 'papers', label: 'Evidence base', sub: '査読論文' },
    { value: '1', unit: 'platform', label: 'Japan → World', sub: '日本発世界へ' },
  ],
  ja: [
    { value: '87', unit: '歳', label: '日本人平均寿命', sub: '世界最長寿国' },
    { value: '6', unit: '軸', label: '診断フレームワーク', sub: '科学的根拠に基づく' },
    { value: '100+', unit: '本', label: 'エビデンス基盤', sub: '査読論文' },
    { value: '1', unit: '拠点', label: '日本発 → 世界へ', sub: 'Japan → World' },
  ],
};

const wisdomItems = {
  en: [
    { icon: '🍱', title: 'Washoku', sub: 'Japanese diet', desc: 'Naturally anti-inflammatory. Rich in polyphenols, omega-3s, fermented foods. Associated with lower IL-6 and CRP.' },
    { icon: '🌲', title: 'Shinrin-yoku', sub: 'Forest bathing', desc: 'Clinically proven to lower cortisol, elevate NK cell activity, and reduce sympathetic nervous system activation.' },
    { icon: '♨️', title: 'Onsen', sub: 'Hot spring therapy', desc: 'Thermal stress activates heat shock proteins (HSP70), promotes mitochondrial biogenesis, improves insulin sensitivity.' },
    { icon: '🧘', title: 'Zen', sub: 'Meditation practice', desc: 'Reduces cortisol, lengthens telomeres, activates BDNF, and rewires prefrontal cortex for stress resilience.' },
  ],
  ja: [
    { icon: '🍱', title: '和食', sub: 'Japanese diet', desc: '自然な抗炎症作用。ポリフェノール・オメガ3・発酵食品が豊富。IL-6とCRPの低下と関連。' },
    { icon: '🌲', title: '森林浴', sub: 'Shinrin-yoku', desc: 'コルチゾール低下・NK細胞活性上昇・交感神経抑制を臨床的に証明。' },
    { icon: '♨️', title: '温泉', sub: 'Onsen therapy', desc: '熱ストレスがHSP70を活性化、ミトコンドリア新生を促進、インスリン感受性を改善。' },
    { icon: '🧘', title: '禅', sub: 'Meditation', desc: 'コルチゾール低下・テロメア延長・BDNF活性化・ストレス耐性のための前頭前皮質再配線。' },
  ],
};

const bookChapters = {
  en: ['Inflammaging — The Silent Engine', 'The Gut Microbiome Axis', 'Neural & Stress Regulation', 'Metabolic Axis & Mitochondria', 'Hormonal Axis & Circadian Biology', 'Social Axis & Ikigai', 'The Japanese Integration Protocol'],
  ja: ['炎症老化（Inflammaging）— 沈黙のエンジン', '腸内マイクロバイオーム軸', '神経・ストレス調節', '代謝軸とミトコンドリア', 'ホルモン軸と概日リズム', '社会軸と生きがい', '日本式統合プロトコル'],
};

const products = {
  en: [
    { name: 'Natto Starter Culture Kit', origin: 'Ibaraki Prefecture', axisLabels: ['Gut', 'Inflammation'], price: '$34', tag: 'Fermented · Vitamin K2 · Nattokinase', emoji: '🫘', score: 94 },
    { name: 'Ceremonial Matcha Reserve', origin: 'Uji, Kyoto', axisLabels: ['Neural', 'Metabolic'], price: '$58', tag: 'L-Theanine · EGCG · Shade-grown', emoji: '🍵', score: 91 },
    { name: 'Hinoki Bath Salt Blend', origin: 'Kiso Valley, Nagano', axisLabels: ['Metabolic', 'Neural'], price: '$42', tag: 'HSP activation · Aromatic · Onsen-style', emoji: '♨️', score: 88 },
  ],
  ja: [
    { name: '納豆スターターカルチャーキット', origin: '茨城県', axisLabels: ['腸内', '炎症'], price: '¥5,200', tag: '発酵 · ビタミンK2 · ナットウキナーゼ', emoji: '🫘', score: 94 },
    { name: '抹茶（宇治産・最高級）', origin: '京都府宇治市', axisLabels: ['神経', '代謝'], price: '¥8,800', tag: 'Lテアニン · EGCG · 遮光栽培', emoji: '🍵', score: 91 },
    { name: '檜風呂塩ブレンド', origin: '長野県木曽谷', axisLabels: ['代謝', '神経'], price: '¥6,400', tag: 'HSP活性化 · 檜精油 · 温泉スタイル', emoji: '♨️', score: 88 },
  ],
};

const membershipPlans = {
  en: [
    { tier: 'CORE', price: '¥1,980', period: '/month', features: ['Monthly research digest (peer-reviewed)', 'Unlimited 6-axis re-diagnostics', 'Personalized product recommendations', 'Community access'], cta: 'Join CORE', accent: '#c9a96e' },
    { tier: 'PRIME', price: '¥4,980', period: '/month', features: ['Everything in CORE', 'Weekly research deep-dives', 'Direct Q&A with researchers', 'Early marketplace access', 'B2B certification pathway'], cta: 'Join PRIME', accent: '#7a9e7e' },
  ],
  ja: [
    { tier: 'CORE', price: '¥1,980', period: '/月', features: ['月次研究ダイジェスト（査読論文）', '6軸診断・無制限再診断', 'パーソナライズド商品レコメンド', 'コミュニティアクセス'], cta: 'COREに参加', accent: '#c9a96e' },
    { tier: 'PRIME', price: '¥4,980', period: '/月', features: ['COREの全機能', '週次研究深掘りレポート', '研究者との直接Q&A', 'マーケットプレイス先行アクセス', 'B2B認定パスウェイ'], cta: 'PRIMEに参加', accent: '#7a9e7e' },
  ],
};

export default function HomePage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafaf8]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#c9a96e]/5 blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#7a9e7e]/5 blur-3xl"></div>
        </div>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `repeating-linear-gradient(45deg, #1a1a18 0px, #1a1a18 1px, transparent 1px, transparent 20px)` }}></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
          <div className="inline-flex items-center gap-2 bg-[#1a1a18]/5 border border-[#1a1a18]/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7a9e7e] animate-pulse"></span>
            <span className="text-xs font-sans text-[#1a1a18]/70 tracking-widest uppercase">
              {lang === 'en' ? 'Japan-Origin · Evidence-Based · Global' : '日本発 · 科学的根拠 · グローバル'}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#1a1a18] leading-tight mb-4">
            {lang === 'en' ? (
              <>Aging is not<br /><span style={{ background: 'linear-gradient(135deg, #c9a96e 0%, #7a9e7e 50%, #3d5a80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>destiny.</span></>
            ) : (
              <>老化は<br /><span style={{ background: 'linear-gradient(135deg, #c9a96e 0%, #7a9e7e 50%, #3d5a80 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>宿命ではない。</span></>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-[#6a6a5a] mt-2 mb-2 font-sans">
            {lang === 'en' ? "It's a civilizational disease." : 'これは文明病である。'}
          </p>
          <p className="text-[#9a9a8a] text-sm tracking-[0.4em] mb-10 font-sans">
            {lang === 'en' ? '老化は「宿命」ではなく「文明病」である' : "Aging is not destiny — it's a civilization disease."}
          </p>

          <p className="text-[#5a5a4a] text-lg max-w-2xl mx-auto leading-relaxed mb-12 font-sans">
            {lang === 'en'
              ? "SHIROKUMA decodes Japan's 120-year longevity secrets — washoku, fermentation, onsen, zen — through the lens of inflammation science, microbiome research, and circadian biology."
              : 'SHIROKUMAは日本の120年分の長寿の秘密（和食・発酵・温泉・禅）を炎症科学・マイクロバイオーム研究・概日リズム生物学の視点から解読します。'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/diagnosis" className="group flex items-center gap-3 bg-[#1a1a18] text-[#fafaf8] px-8 py-4 rounded-full text-base font-sans font-semibold hover:bg-[#c9a96e] transition-all duration-300 shadow-lg">
              {lang === 'en' ? 'Take Free 6-Axis Diagnosis' : '無料6軸診断を受ける'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/science" className="flex items-center gap-2 border border-[#1a1a18]/20 text-[#1a1a18] px-8 py-4 rounded-full text-base font-sans hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300">
              <FlaskConical size={16} />
              {lang === 'en' ? 'Explore the Science' : 'サイエンスを探る'}
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto">
            {stats[lang].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-[#1a1a18]">
                  {stat.value}<span className="text-[#c9a96e] text-lg ml-1">{stat.unit}</span>
                </div>
                <div className="text-[#5a5a4a] text-xs font-sans mt-1">{stat.label}</div>
                <div className="text-[#9a9a8a] text-[10px] font-sans">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[#9a9a8a] text-[10px] font-sans tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#c9a96e] to-transparent"></div>
        </div>
      </section>

      {/* Problem / Concept */}
      <section className="py-28 px-6 bg-[#1a1a18] text-[#e8d5b7]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">
                {lang === 'en' ? 'The Problem' : '課題'}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                {lang === 'en' ? (
                  <>Western science,<br />Eastern wisdom.<br /><span className="text-[#c9a96e]">Finally united.</span></>
                ) : (
                  <>西洋の科学と<br />東洋の叡智。<br /><span className="text-[#c9a96e]">ついに融合。</span></>
                )}
              </h2>
              <p className="text-[#9a9a7a] text-base leading-relaxed mb-6 font-sans">
                {lang === 'en'
                  ? "Peter Attia and Andrew Huberman have transformed how the West thinks about longevity. But they're missing something: Japan has been living this way for centuries."
                  : 'ピーター・アティアやアンドリュー・ヒューバーマンは西洋の長寿観を変えました。しかし彼らには欠けているものがあります。日本は数百年にわたってこの生き方を実践してきました。'}
              </p>
              <p className="text-[#9a9a7a] text-base leading-relaxed font-sans">
                {lang === 'en'
                  ? 'Okinawan centenarians don\'t follow protocols. They eat fermented soybean. They walk to their fields. They gather with neighbors. Their "ikigai" keeps them alive. SHIROKUMA translates this ancient operating system into evidence-based, actionable science.'
                  : '沖縄の百寿者はプロトコルに従いません。発酵大豆を食べ、畑まで歩き、隣人と集います。「生きがい」が彼らを生かし続けます。SHIROKUMAはこの古代のOSを科学的根拠に基づく実践知識に変換します。'}
              </p>
            </div>
            <div className="space-y-4">
              {wisdomItems[lang].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-[#3a3a38] hover:border-[#c9a96e]/40 transition-colors">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{item.title}</span>
                      <span className="text-[#6a6a5a] text-xs font-sans">/ {item.sub}</span>
                    </div>
                    <p className="text-[#8a8a7a] text-sm font-sans leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6-Axis Framework */}
      <section className="py-28 px-6 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">
              {lang === 'en' ? 'The Framework' : 'フレームワーク'}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a18] mb-4">
              {lang === 'en' ? '6 Axes of Longevity' : '長寿の6つの軸'}
            </h2>
            <p className="text-[#6a6a5a] text-lg font-sans max-w-2xl mx-auto">
              {lang === 'en'
                ? "Aging is not one problem. It's six interconnected systems, each requiring a different key."
                : '老化は一つの問題ではありません。それぞれ異なるアプローチが必要な、6つの相互連結システムです。'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {axes.map((axis, i) => (
              <div key={axis.id} className="group p-6 rounded-2xl border border-[#e8d5b7]/50 hover:shadow-xl transition-all duration-300" style={{ backgroundColor: axis.bg }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{axis.icon}</span>
                  <span className="text-[#1a1a18]/20 font-bold text-2xl font-sans">0{i + 1}</span>
                </div>
                <div className="mb-3">
                  <h3 className="text-[#1a1a18] font-bold text-lg">{axis[lang].label}</h3>
                </div>
                <p className="text-[#5a5a4a] text-sm leading-relaxed mb-4 font-sans">{axis[lang].description}</p>
                <div className="text-xs font-sans px-3 py-1.5 rounded-full inline-block" style={{ color: axis.color, backgroundColor: `${axis.color}15` }}>
                  {axis[lang].science}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/diagnosis" className="inline-flex items-center gap-3 bg-[#1a1a18] text-[#fafaf8] px-10 py-4 rounded-full text-base font-sans font-semibold hover:bg-[#c9a96e] transition-all duration-300">
              {lang === 'en' ? 'Diagnose All 6 Axes — Free' : '6軸を全て診断する — 無料'}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Author */}
      <section className="py-28 px-6 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center md:justify-end order-2 md:order-1">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full border-2 border-[#c9a96e]/20 scale-110"></div>
                <div className="absolute inset-0 rounded-full border border-[#7a9e7e]/15 scale-125"></div>
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#e8d5b7] to-[#c9a96e]/30 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="text-7xl mb-2">🐻‍❄️</div>
                    <span className="text-[#1a1a18]/40 text-xs font-sans tracking-widest uppercase">SHIROKUMA</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#1a1a18] text-white rounded-2xl px-4 py-3 shadow-xl">
                  <p className="text-[#c9a96e] text-[9px] font-sans tracking-widest uppercase">
                    {lang === 'en' ? 'Active Physician' : '現役医師'}
                  </p>
                  <p className="text-white text-xs font-bold font-sans mt-0.5">放射線科医</p>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">
                {lang === 'en' ? 'About the Author' : '著者について'}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a18] leading-tight mb-6">
                {lang === 'en' ? (
                  <>Written by a doctor<br /><span style={{ background: 'linear-gradient(135deg, #c9a96e 0%, #7a9e7e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>who lives the science.</span></>
                ) : (
                  <>科学を自ら実践する<br /><span style={{ background: 'linear-gradient(135deg, #c9a96e 0%, #7a9e7e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>医師が書いた。</span></>
                )}
              </h2>
              <p className="text-[#5a5a4a] text-base leading-relaxed mb-6 font-sans">
                {lang === 'en'
                  ? 'NISHI is a practicing radiologist and evidence-based longevity researcher based in Japan. At 36, he maintains 9.7% body fat with 5 years of structured training — not because of genetics, but because of a meticulously science-tested protocol rooted in evolutionary medicine and Japanese cultural practice.'
                  : 'NISHIは日本を拠点とする現役放射線科医・長寿研究者です。36歳で体脂肪率9.7%を維持しているのは遺伝ではなく、進化医学と日本文化に根ざした科学的プロトコルのおかげです。'}
              </p>
              <p className="text-[#5a5a4a] text-base leading-relaxed mb-8 font-sans">
                {lang === 'en'
                  ? "His mission: to be the first Japanese physician to scientifically decode why Japan is the world's longest-lived nation — and deliver that knowledge to a global audience."
                  : '彼のミッション：なぜ日本が世界最長寿国なのかを科学的に解読し、その知識を世界に届ける最初の日本人医師になること。'}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {(lang === 'en'
                  ? [{ value: '36', unit: 'yrs', label: 'Age · Body fat 9.7%' }, { value: '5+', unit: 'yrs', label: 'Training & research' }, { value: '100+', unit: 'refs', label: 'Peer-reviewed sources' }]
                  : [{ value: '36', unit: '歳', label: '年齢 · 体脂肪率9.7%' }, { value: '5+', unit: '年', label: '実践・研究歴' }, { value: '100+', unit: '本', label: '査読論文参照数' }]
                ).map((s) => (
                  <div key={s.label} className="bg-[#f5f0e8] rounded-xl p-3 text-center">
                    <p className="text-[#1a1a18] font-bold text-xl">{s.value}<span className="text-[#c9a96e] text-sm ml-0.5">{s.unit}</span></p>
                    <p className="text-[#9a9a8a] text-[10px] font-sans leading-tight mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book */}
      <section className="py-28 px-6 bg-[#1a1a18] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#c9a96e]/20 blur-3xl scale-110"></div>
                <div className="relative w-56 md:w-64 rounded-lg overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(160deg, #1a1a18 0%, #2a2015 50%, #1a1a18 100%)', border: '1px solid #c9a96e40' }}>
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#c9a96e] to-[#7a9e7e]"></div>
                  <div className="pl-6 pr-5 pt-10 pb-8">
                    <div className="inline-block border border-[#c9a96e]/50 text-[#c9a96e] text-[8px] font-sans tracking-[0.3em] uppercase px-2 py-1 rounded mb-6">
                      {lang === 'en' ? 'Coming 2026' : '2026年刊行予定'}
                    </div>
                    <h3 className="text-white font-bold text-xl leading-snug mb-2">
                      {lang === 'en' ? <>Aging Is a<br />Civilization<br />Disease</> : <>老化は<br />文明病である</>}
                    </h3>
                    <p className="text-[#c9a96e] text-[10px] font-sans leading-relaxed mb-6">
                      {lang === 'en' ? <>The SHIROKUMA<br />6-Axis Anti-Aging<br />Complete Guide</> : <>SHIROKUMA<br />6軸アンチエイジング<br />完全ガイド</>}
                    </p>
                    <div className="w-8 h-px bg-[#c9a96e]/40 mb-4"></div>
                    <p className="text-[#8a8a7a] text-[9px] font-sans tracking-widest uppercase">NISHI · SHIROKUMA</p>
                    <p className="text-[#6a6a5a] text-[8px] font-sans mt-1">M.D., Radiologist</p>
                    <div className="mt-6 text-3xl opacity-20">🐻‍❄️</div>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/40 blur-md rounded-full"></div>
              </div>
            </div>
            <div>
              <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">
                {lang === 'en' ? 'The Book' : '著書'}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                {lang === 'en'
                  ? <>The manifesto<br />for the<br /><span className="text-[#c9a96e]">anti-aging era.</span></>
                  : <>アンチエイジング時代の<br /><span className="text-[#c9a96e]">マニフェスト。</span></>}
              </h2>
              <p className="text-[#9a9a7a] text-base leading-relaxed mb-8 font-sans">
                {lang === 'en'
                  ? '7 chapters. 6 axes. One complete protocol to live like a polar bear — not a salmon.'
                  : '7章構成。6つの軸。サーモンではなく、ホッキョクグマのように生きるための完全プロトコル。'}
              </p>
              <div className="space-y-2 mb-8">
                {bookChapters[lang].map((title, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-[#3a3a38]">
                    <span className="text-[#c9a96e]/50 text-xs font-sans font-bold w-6 flex-shrink-0">0{i + 1}</span>
                    <span className="text-[#8a8a7a] text-sm font-sans">{title}</span>
                  </div>
                ))}
              </div>
              <Link href="/science" className="inline-flex items-center gap-3 border border-[#c9a96e] text-[#c9a96e] px-8 py-3.5 rounded-full text-sm font-sans font-semibold hover:bg-[#c9a96e] hover:text-[#1a1a18] transition-all duration-300">
                {lang === 'en' ? 'Preview the Science' : 'サイエンスを見る'}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-28 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">
                {lang === 'en' ? 'Certified Marketplace' : '認定マーケットプレイス'}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a18]">
                {lang === 'en' ? <>Products backed<br />by the 6 axes</> : <>6軸に基づいた<br />認定商品</>}
              </h2>
            </div>
            <Link href="/marketplace" className="mt-6 md:mt-0 text-sm font-sans text-[#c9a96e] border-b border-[#c9a96e] pb-0.5 hover:opacity-70 transition-opacity">
              {lang === 'en' ? 'View all products →' : '全商品を見る →'}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products[lang].map((product) => (
              <div key={product.name} className="bg-[#fafaf8] rounded-2xl overflow-hidden border border-[#e8d5b7]/50 hover:shadow-lg transition-all duration-300">
                <div className="h-48 bg-gradient-to-br from-[#e8d5b7]/30 to-[#c9a96e]/10 flex items-center justify-center">
                  <span className="text-6xl">{product.emoji}</span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-[#1a1a18] text-sm leading-tight">{product.name}</h3>
                    <span className="text-[#c9a96e] font-bold font-sans">{product.price}</span>
                  </div>
                  <p className="text-[#9a9a8a] text-xs font-sans mb-3">{product.origin}</p>
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {product.axisLabels.map((label) => (
                      <span key={label} className="text-[10px] font-sans bg-[#1a1a18]/5 text-[#1a1a18]/60 px-2 py-0.5 rounded-full">{label}</span>
                    ))}
                  </div>
                  <p className="text-[#7a7a6a] text-xs font-sans mb-4">{product.tag}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 h-1.5 bg-[#e8d5b7] rounded-full overflow-hidden">
                        <div className="h-full bg-[#7a9e7e] rounded-full" style={{ width: `${product.score}%` }}></div>
                      </div>
                      <span className="text-[10px] font-sans text-[#7a9e7e] font-bold">{product.score}</span>
                    </div>
                    <Link href="/marketplace" className="text-xs font-sans text-[#c9a96e] hover:underline">
                      {lang === 'en' ? 'View →' : '詳細 →'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="py-28 px-6 bg-[#1a1a18]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-6">
            {lang === 'en' ? 'CORE Membership' : 'COREメンバーシップ'}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {lang === 'en'
              ? <>Go deeper.<br /><span className="text-[#c9a96e]">Stay ahead.</span></>
              : <>さらに深く。<br /><span className="text-[#c9a96e]">最前線に居続ける。</span></>}
          </h2>
          <p className="text-[#9a9a7a] text-lg font-sans leading-relaxed mb-10 max-w-2xl mx-auto">
            {lang === 'en'
              ? "Access peer-reviewed research digests, unlimited re-diagnostics, and personalized protocol updates — all filtered through Japan's longevity lens."
              : '査読論文ダイジェスト・無制限再診断・パーソナライズドプロトコル更新にアクセス。すべて日本の長寿レンズでフィルタリング。'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {membershipPlans[lang].map((plan) => (
              <div key={plan.tier} className="bg-[#2a2a28] border border-[#3a3a38] rounded-2xl p-6 text-left hover:border-[#c9a96e]/40 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-sans font-bold tracking-widest uppercase" style={{ color: plan.accent }}>{plan.tier}</span>
                  <div className="text-right">
                    <span className="text-white text-2xl font-bold">{plan.price}</span>
                    <span className="text-[#6a6a5a] text-xs font-sans">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[#8a8a7a] text-sm font-sans">
                      <span style={{ color: plan.accent }} className="mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/core" className="block w-full text-center py-3 rounded-full text-sm font-sans font-semibold transition-all" style={{ backgroundColor: `${plan.accent}20`, color: plan.accent, border: `1px solid ${plan.accent}40` }}>
                  {plan.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-[#fafaf8] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a18] mb-6">
            {lang === 'en'
              ? <>Your longevity journey<br />starts with one question:</>
              : <>あなたの長寿の旅は<br />一つの問いから始まる：</>}
          </h2>
          <p className="text-3xl text-[#c9a96e] mb-4">
            <em>{lang === 'en' ? 'Where are you aging fastest?' : 'あなたが最も速く老化している場所はどこか？'}</em>
          </p>
          <p className="text-[#6a6a5a] font-sans mb-10">
            {lang === 'en'
              ? 'Our free 6-axis diagnosis reveals your biological weak points — and shows you the Japanese science to address them.'
              : '無料の6軸診断があなたの生物学的弱点を明らかにし、それに対処するための日本の科学を示します。'}
          </p>
          <Link href="/diagnosis" className="inline-flex items-center gap-3 bg-[#c9a96e] text-[#1a1a18] px-12 py-5 rounded-full text-lg font-sans font-bold hover:bg-[#b8956a] transition-all duration-300 shadow-lg">
            {lang === 'en' ? 'Begin Free Diagnosis' : '無料診断を始める'}
            <ArrowRight size={20} />
          </Link>
          <p className="text-[#9a9a8a] text-xs font-sans mt-4">
            {lang === 'en' ? '5 minutes · No signup required · 25 questions' : '5分 · 登録不要 · 25問'}
          </p>
        </div>
      </section>
    </div>
  );
}
