'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const axes = [
  {
    id: 'inflammation', kanji: '炎', en: 'Inflammation', ja: '炎症',
    desc_en: 'Chronic low-grade inflammation — the silent engine of biological aging. Japanese washoku and fermented foods naturally suppress NF-κB pathways.',
    desc_ja: '慢性的な低グレード炎症——老化の沈黙のエンジン。和食と発酵食品はNF-κBシグナルを静かに鎮める。',
    science: 'Anti-inflammatory diet · Intestinal barrier · CRP',
  },
  {
    id: 'gut', kanji: '腸', en: 'Gut Microbiome', ja: '腸内環境',
    desc_en: "Japan's fermentation heritage — miso, natto, amazake — seeds the gut with longevity-associated Bifidobacterium strains.",
    desc_ja: '日本の発酵文化——味噌、納豆、甘酒——は腸内に長寿と関連するビフィズス菌を定着させる。',
    science: 'Microbiome diversity · SCFA · Leaky gut',
  },
  {
    id: 'neural', kanji: '心', en: 'Neural · Stress', ja: '神経・ストレス',
    desc_en: 'HPA axis dysregulation accelerates telomere shortening. Zen meditation and shinrin-yoku restore the parasympathetic state.',
    desc_ja: 'HPA軸の乱れはテロメア短縮を加速する。禅と森林浴は副交感神経を静かに回復させる。',
    science: 'Cortisol · HPA axis · Neuroplasticity',
  },
  {
    id: 'metabolic', kanji: '氣', en: 'Metabolic', ja: '代謝',
    desc_en: 'Mitochondrial biogenesis through thermal stress and movement. Hara hachi bu — eating to 80% — activates mTOR suppression naturally.',
    desc_ja: '温熱刺激と運動によるミトコンドリア新生。腹八分目はmTOR抑制を自然に引き起こす。',
    science: 'Mitochondria · mTOR · Insulin sensitivity',
  },
  {
    id: 'hormonal', kanji: '月', en: 'Hormonal · Sleep', ja: 'ホルモン・睡眠',
    desc_en: 'Circadian rhythm alignment orchestrates melatonin, growth hormone, and cortisol in perfect sequence.',
    desc_ja: '概日リズムの整合がメラトニン・成長ホルモン・コルチゾールを完璧な順序で指揮する。',
    science: 'Circadian biology · Melatonin · Sleep architecture',
  },
  {
    id: 'social', kanji: '縁', en: 'Social · Ikigai', ja: '社会・生きがい',
    desc_en: 'Ikigai — reason for being — measurably correlates with longevity in Okinawan centenarians. Social bonds activate oxytocin pathways.',
    desc_ja: '「生きがい」は沖縄の百寿者の長寿と統計的に相関する。社会的絆はオキシトシン経路を活性化させる。',
    science: 'Ikigai · Oxytocin · Community',
  },
];

const wisdom = [
  { kanji: '食', title_en: 'Washoku', title_ja: '和食', sub_en: 'Japanese diet', sub_ja: '日本食',
    desc_en: 'Naturally anti-inflammatory. Rich in polyphenols, omega-3s, and fermented foods. Associated with lower IL-6 and CRP markers.',
    desc_ja: '自然な抗炎症作用。ポリフェノール・オメガ3・発酵食品が豊富で、IL-6とCRP低下と相関。' },
  { kanji: '森', title_en: 'Shinrin-yoku', title_ja: '森林浴', sub_en: 'Forest bathing', sub_ja: '森林浴',
    desc_en: 'Clinically shown to lower cortisol, elevate NK cell activity, and reduce sympathetic nervous system activation.',
    desc_ja: 'コルチゾール低下・NK細胞活性上昇・交感神経抑制を臨床的に証明済み。' },
  { kanji: '湯', title_en: 'Onsen', title_ja: '温泉', sub_en: 'Hot spring therapy', sub_ja: '温泉療法',
    desc_en: 'Thermal stress activates heat shock proteins (HSP70), promotes mitochondrial biogenesis, improves insulin sensitivity.',
    desc_ja: '熱ストレスがHSP70を活性化し、ミトコンドリア新生を促進、インスリン感受性を改善する。' },
  { kanji: '禅', title_en: 'Zen', title_ja: '禅', sub_en: 'Meditation', sub_ja: '瞑想',
    desc_en: 'Reduces cortisol, lengthens telomeres, activates BDNF, and rewires the prefrontal cortex for stress resilience.',
    desc_ja: 'コルチゾール低下・テロメア延長・BDNF活性化・ストレス耐性のための前頭前皮質再配線。' },
];

const products = [
  { kanji: '豆', name_en: 'Natto Starter Culture', name_ja: '納豆スターターカルチャー', origin: 'Ibaraki Prefecture', axes_en: ['Gut', 'Inflammation'], axes_ja: ['腸内', '炎症'], price: '$34', score: 94 },
  { kanji: '茶', name_en: 'Ceremonial Matcha Reserve', name_ja: '抹茶（宇治産・最高級）', origin: 'Uji, Kyoto', axes_en: ['Neural', 'Metabolic'], axes_ja: ['神経', '代謝'], price: '$58', score: 91 },
  { kanji: '木', name_en: 'Hinoki Bath Salt Blend', name_ja: '檜風呂塩ブレンド', origin: 'Kiso Valley, Nagano', axes_en: ['Metabolic', 'Neural'], axes_ja: ['代謝', '神経'], price: '$42', score: 88 },
];

export default function HomePage() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  return (
    <div className="min-h-screen" style={{ background: '#faf8f4', color: '#1c1917' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8" style={{ background: '#faf8f4' }}>

        {/* subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #1c1917 0px, #1c1917 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, #1c1917 0px, #1c1917 1px, transparent 1px, transparent 80px)'
        }}></div>

        {/* vertical accent lines */}
        <div className="absolute top-0 left-16 w-px h-full bg-gradient-to-b from-transparent via-[#c4b49a]/20 to-transparent hidden lg:block"></div>
        <div className="absolute top-0 right-16 w-px h-full bg-gradient-to-b from-transparent via-[#c4b49a]/20 to-transparent hidden lg:block"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto pt-40 pb-32">

          {/* eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-12 h-px bg-[#c4b49a]/50"></div>
            <span className="text-[#a8895a] text-[9px] font-sans tracking-[0.45em] uppercase font-light">
              {isEn ? 'Japan · Evidence-Based · Global' : '日本発 · 科学的根拠 · 世界へ'}
            </span>
            <div className="w-12 h-px bg-[#c4b49a]/50"></div>
          </div>

          {/* main headline */}
          <h1 className="font-serif font-light leading-[1.05] mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.01em' }}>
            {isEn ? (
              <>
                Aging is not<br />
                <span className="italic" style={{ color: '#a8895a' }}>destiny.</span>
              </>
            ) : (
              <>
                老化は<br />
                <span className="italic" style={{ color: '#a8895a' }}>宿命ではない。</span>
              </>
            )}
          </h1>

          <p className="font-serif italic text-xl md:text-2xl mb-3" style={{ color: '#7a7065' }}>
            {isEn ? "It's a civilizational disease." : 'これは文明病である。'}
          </p>

          <p className="font-sans text-[11px] tracking-[0.4em] mb-16" style={{ color: '#c4b49a' }}>
            {isEn ? '老化は「宿命」ではなく「文明病」である' : 'Aging is not destiny — it is a civilizational disease.'}
          </p>

          <p className="font-serif font-light text-lg leading-relaxed max-w-xl mx-auto mb-16" style={{ color: '#7a7065' }}>
            {isEn
              ? "SHIROKUMA decodes Japan's longevity secrets — washoku, fermentation, onsen, zen — through inflammation science, microbiome research, and circadian biology."
              : 'SHIROKUMAは日本の長寿の秘密（和食・発酵・温泉・禅）を炎症科学・マイクロバイオーム・概日リズムの視点から解読する。'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/diagnosis"
              className="font-sans text-[11px] tracking-[0.25em] uppercase px-10 py-4 transition-all duration-500"
              style={{ background: '#1c1917', color: '#faf8f4', letterSpacing: '0.25em' }}
            >
              {isEn ? 'Begin Free Diagnosis' : '無料診断を始める'}
            </Link>
            <Link
              href="/science"
              className="font-sans text-[11px] tracking-[0.25em] uppercase px-10 py-4 border transition-all duration-500 hover:bg-[#1c1917] hover:text-[#faf8f4]"
              style={{ borderColor: '#c4b49a', color: '#7a7065' }}
            >
              {isEn ? 'Explore the Science' : 'サイエンスを探る'}
            </Link>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gradient-to-b from-[#c4b49a]/60 to-transparent"></div>
          <span className="font-sans text-[8px] tracking-[0.5em] uppercase" style={{ color: '#c4b49a' }}>Scroll</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-10 px-8 border-y" style={{ borderColor: '#e8e0d0', background: '#f5f0e8' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#e8e0d0]">
          {[
            { value: '87', unit: isEn ? 'yrs' : '歳', label: isEn ? "Japan's avg. lifespan" : '日本人平均寿命', sub: isEn ? '世界最長寿国' : 'World\'s longest-lived' },
            { value: '6',  unit: isEn ? 'axes' : '軸', label: isEn ? 'Diagnostic framework' : '診断フレームワーク', sub: isEn ? '科学的根拠' : 'Evidence-based' },
            { value: '100+', unit: isEn ? 'papers' : '本', label: isEn ? 'Evidence base' : 'エビデンス基盤', sub: isEn ? 'Peer-reviewed' : '査読論文' },
            { value: '1', unit: isEn ? 'platform' : '拠点', label: isEn ? 'Japan → World' : '日本発 → 世界', sub: isEn ? 'Globally accessible' : 'グローバル展開' },
          ].map((s) => (
            <div key={s.label} className="text-center py-8 px-4">
              <p className="font-serif font-light leading-none mb-2" style={{ fontSize: '2.5rem', color: '#1c1917' }}>
                {s.value}<span className="text-lg ml-1" style={{ color: '#a8895a' }}>{s.unit}</span>
              </p>
              <p className="font-sans text-[10px] tracking-[0.15em] uppercase mb-1" style={{ color: '#7a7065' }}>{s.label}</p>
              <p className="font-sans text-[9px]" style={{ color: '#c4b49a' }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-36 px-8" style={{ background: '#1c1917' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <div>
            <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-8" style={{ color: '#a8895a' }}>
              {isEn ? 'The Philosophy' : '哲学'}
            </p>
            <h2 className="font-serif font-light leading-tight mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#faf8f4' }}>
              {isEn ? (
                <>Western science,<br />Eastern wisdom.<br /><span className="italic" style={{ color: '#a8895a' }}>Finally united.</span></>
              ) : (
                <>西洋の科学と<br />東洋の叡智。<br /><span className="italic" style={{ color: '#a8895a' }}>ついに融合。</span></>
              )}
            </h2>
            <p className="font-serif font-light leading-relaxed mb-6 text-lg" style={{ color: '#7a7065' }}>
              {isEn
                ? "Peter Attia and Andrew Huberman have transformed how the West thinks about longevity. But they're missing something: Japan has been living this way for centuries."
                : 'ピーター・アティアやアンドリュー・ヒューバーマンは西洋の長寿観を変えた。しかし彼らには欠けているものがある。日本は数百年にわたってこの生き方を実践してきた。'}
            </p>
            <p className="font-serif font-light leading-relaxed text-lg" style={{ color: '#7a7065' }}>
              {isEn
                ? "Okinawan centenarians don't follow protocols. They eat fermented soybean. They walk to their fields. Their ikigai keeps them alive. SHIROKUMA translates this ancient operating system into evidence-based science."
                : '沖縄の百寿者はプロトコルに従わない。発酵大豆を食べ、畑まで歩き、生きがいが彼らを生かし続ける。SHIROKUMAはこの古代のOSを科学的根拠に翻訳する。'}
            </p>
          </div>

          <div className="space-y-0 divide-y" style={{ borderColor: '#3d3832' }}>
            {wisdom.map((item) => (
              <div key={item.kanji} className="flex gap-8 py-7 group">
                <div className="flex-shrink-0 w-12 h-12 border flex items-center justify-center" style={{ borderColor: '#3d3832' }}>
                  <span className="font-serif text-xl font-light" style={{ color: '#a8895a' }}>{item.kanji}</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-serif text-lg font-light" style={{ color: '#faf8f4' }}>
                      {isEn ? item.title_en : item.title_ja}
                    </span>
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: '#4a4440' }}>
                      {isEn ? item.sub_en : item.sub_ja}
                    </span>
                  </div>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: '#7a7065' }}>
                    {isEn ? item.desc_en : item.desc_ja}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 AXES ── */}
      <section className="py-36 px-8" style={{ background: '#faf8f4' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-6" style={{ color: '#a8895a' }}>
              {isEn ? 'The Framework' : 'フレームワーク'}
            </p>
            <h2 className="font-serif font-light leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1c1917' }}>
              {isEn ? '6 Axes of Longevity' : '長寿の六軸'}
            </h2>
            <div className="w-8 h-px mx-auto" style={{ background: '#c4b49a' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e8e0d0' }}>
            {axes.map((axis) => (
              <div key={axis.id} className="p-10 group hover:bg-[#f5f0e8] transition-colors duration-500" style={{ background: '#faf8f4' }}>
                <div className="flex items-start justify-between mb-6">
                  <span className="font-serif text-4xl font-light" style={{ color: '#e8e0d0' }}>{axis.kanji}</span>
                </div>
                <h3 className="font-serif text-xl font-light mb-4" style={{ color: '#1c1917' }}>
                  {isEn ? axis.en : axis.ja}
                </h3>
                <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: '#7a7065' }}>
                  {isEn ? axis.desc_en : axis.desc_ja}
                </p>
                <p className="font-sans text-[9px] tracking-[0.15em] uppercase" style={{ color: '#c4b49a' }}>
                  {axis.science}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/diagnosis"
              className="inline-block font-sans text-[11px] tracking-[0.25em] uppercase px-12 py-4 border transition-all duration-500 hover:bg-[#1c1917] hover:text-[#faf8f4] hover:border-[#1c1917]"
              style={{ borderColor: '#c4b49a', color: '#7a7065' }}
            >
              {isEn ? 'Diagnose All 6 Axes — Free' : '6軸を診断する — 無料'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── AUTHOR ── */}
      <section className="py-36 px-8" style={{ background: '#f5f0e8' }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          {/* portrait placeholder */}
          <div className="flex justify-center order-2 md:order-1">
            <div className="relative w-64 h-80 border" style={{ borderColor: '#c4b49a' }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: '#ede8df' }}>
                <span className="font-serif text-6xl font-light mb-4" style={{ color: '#c4b49a' }}>白</span>
                <span className="font-sans text-[8px] tracking-[0.4em] uppercase" style={{ color: '#c4b49a' }}>SHIROKUMA</span>
              </div>
              {/* badge */}
              <div className="absolute -bottom-4 -right-4 px-4 py-3" style={{ background: '#1c1917' }}>
                <p className="font-sans text-[8px] tracking-[0.3em] uppercase mb-0.5" style={{ color: '#a8895a' }}>
                  {isEn ? 'Active Physician' : '現役医師'}
                </p>
                <p className="font-serif text-sm font-light" style={{ color: '#faf8f4' }}>放射線科医</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-8" style={{ color: '#a8895a' }}>
              {isEn ? 'About the Author' : '著者について'}
            </p>
            <h2 className="font-serif font-light leading-tight mb-8" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#1c1917' }}>
              {isEn ? (
                <>Written by a doctor<br /><span className="italic" style={{ color: '#a8895a' }}>who lives the science.</span></>
              ) : (
                <>科学を自ら実践する<br /><span className="italic" style={{ color: '#a8895a' }}>医師が書いた。</span></>
              )}
            </h2>
            <p className="font-serif font-light leading-relaxed mb-5 text-lg" style={{ color: '#7a7065' }}>
              {isEn
                ? 'NISHI is a practicing radiologist and longevity researcher based in Japan. At 36, he maintains 9.7% body fat — not because of genetics, but through a meticulously science-tested protocol rooted in evolutionary medicine.'
                : 'NISHIは日本を拠点とする現役放射線科医・長寿研究者。36歳で体脂肪率9.7%を維持するのは遺伝ではなく、進化医学に根ざした科学的プロトコルによる。'}
            </p>
            <p className="font-serif font-light leading-relaxed mb-10 text-lg" style={{ color: '#7a7065' }}>
              {isEn
                ? "His mission: to be the first Japanese physician to scientifically decode why Japan is the world's longest-lived nation — and deliver that knowledge globally."
                : '彼のミッション：なぜ日本が世界最長寿国なのかを科学的に解読し、その知識を世界に届ける最初の日本人医師になること。'}
            </p>
            <div className="grid grid-cols-3 gap-0 divide-x" style={{ borderColor: '#c4b49a' }}>
              {(isEn
                ? [{ v: '36', u: 'yrs', l: 'Age · 9.7% body fat' }, { v: '5+', u: 'yrs', l: 'Training & research' }, { v: '100+', u: 'refs', l: 'Peer-reviewed' }]
                : [{ v: '36', u: '歳', l: '体脂肪率9.7%' }, { v: '5+', u: '年', l: '実践・研究歴' }, { v: '100+', u: '本', l: '査読論文参照' }]
              ).map((s) => (
                <div key={s.l} className="text-center px-4 py-3">
                  <p className="font-serif font-light text-2xl" style={{ color: '#1c1917' }}>
                    {s.v}<span className="text-sm ml-0.5" style={{ color: '#a8895a' }}>{s.u}</span>
                  </p>
                  <p className="font-sans text-[9px] tracking-[0.1em] mt-1" style={{ color: '#7a7065' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK ── */}
      <section className="py-36 px-8" style={{ background: '#1c1917' }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          {/* book visual */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-52 border-l-4 px-8 py-12 shadow-2xl" style={{ background: '#141210', borderLeftColor: '#a8895a' }}>
                <span className="font-sans text-[7px] tracking-[0.4em] uppercase border px-2 py-1 block w-fit mb-8" style={{ color: '#a8895a', borderColor: '#a8895a30' }}>
                  {isEn ? 'Coming 2026' : '2026年刊行'}
                </span>
                <h3 className="font-serif font-light text-xl leading-snug mb-3" style={{ color: '#faf8f4' }}>
                  {isEn ? <>Aging Is a<br />Civilization<br />Disease</> : <>老化は<br />文明病である</>}
                </h3>
                <p className="font-sans text-[8px] tracking-[0.2em] mb-8" style={{ color: '#a8895a' }}>
                  {isEn ? 'SHIROKUMA 6-Axis Guide' : 'SHIROKUMA 6軸完全ガイド'}
                </p>
                <div className="w-6 h-px mb-6" style={{ background: '#a8895a30' }}></div>
                <p className="font-sans text-[7px] tracking-widest uppercase" style={{ color: '#4a4440' }}>NISHI · M.D.</p>
              </div>
              <div className="absolute -bottom-3 left-4 right-4 h-6 blur-md rounded-full" style={{ background: 'rgba(0,0,0,0.5)' }}></div>
            </div>
          </div>

          <div>
            <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-8" style={{ color: '#a8895a' }}>
              {isEn ? 'The Book' : '著書'}
            </p>
            <h2 className="font-serif font-light leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#faf8f4' }}>
              {isEn
                ? <>The manifesto for<br /><span className="italic" style={{ color: '#a8895a' }}>the anti-aging era.</span></>
                : <>アンチエイジング時代の<br /><span className="italic" style={{ color: '#a8895a' }}>マニフェスト。</span></>}
            </h2>
            <p className="font-serif font-light text-lg leading-relaxed mb-10" style={{ color: '#7a7065' }}>
              {isEn
                ? '7 chapters. 6 axes. One complete protocol to live not like a salmon — but like a polar bear.'
                : '7章構成。6つの軸。サーモンではなく、ホッキョクグマのように生きるための完全プロトコル。'}
            </p>
            <div className="space-y-0 divide-y mb-10" style={{ borderColor: '#3d3832' }}>
              {(isEn
                ? ['Inflammaging — The Silent Engine', 'The Gut Microbiome Axis', 'Neural & Stress Regulation', 'Metabolic Axis & Mitochondria', 'Hormonal Axis & Circadian Biology', 'Social Axis & Ikigai', 'The Japanese Integration Protocol']
                : ['炎症老化（Inflammaging）', '腸内マイクロバイオーム軸', '神経・ストレス調節', '代謝軸とミトコンドリア', 'ホルモン軸と概日リズム', '社会軸と生きがい', '日本式統合プロトコル']
              ).map((title, i) => (
                <div key={i} className="flex items-center gap-4 py-3">
                  <span className="font-sans text-[9px] w-5 flex-shrink-0" style={{ color: '#a8895a30' }}>0{i + 1}</span>
                  <span className="font-serif font-light text-sm" style={{ color: '#7a7065' }}>{title}</span>
                </div>
              ))}
            </div>
            <Link
              href="/science"
              className="inline-block font-sans text-[11px] tracking-[0.25em] uppercase px-8 py-3.5 border transition-all duration-500 hover:bg-[#a8895a] hover:border-[#a8895a] hover:text-[#1c1917]"
              style={{ borderColor: '#a8895a', color: '#a8895a' }}
            >
              {isEn ? 'Preview the Science' : 'サイエンスを見る'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── MARKETPLACE ── */}
      <section className="py-36 px-8" style={{ background: '#f5f0e8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-6" style={{ color: '#a8895a' }}>
                {isEn ? 'Certified Marketplace' : '認定市場'}
              </p>
              <h2 className="font-serif font-light leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#1c1917' }}>
                {isEn ? <>Products backed<br />by the 6 axes.</> : <>六軸に基づいた<br />認定商品。</>}
              </h2>
            </div>
            <Link href="/marketplace" className="font-sans text-[10px] tracking-[0.25em] uppercase mt-6 md:mt-0 pb-0.5 border-b transition-colors" style={{ color: '#a8895a', borderColor: '#a8895a' }}>
              {isEn ? 'View all →' : '全商品 →'}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#ddd5c5' }}>
            {products.map((p) => (
              <div key={p.kanji} className="group" style={{ background: '#faf8f4' }}>
                {/* image area */}
                <div className="h-56 flex items-center justify-center border-b" style={{ background: '#ede8df', borderColor: '#ddd5c5' }}>
                  <span className="font-serif text-6xl font-light" style={{ color: '#c4b49a' }}>{p.kanji}</span>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif font-light text-lg leading-tight" style={{ color: '#1c1917' }}>
                      {isEn ? p.name_en : p.name_ja}
                    </h3>
                    <span className="font-serif font-light text-lg ml-4 flex-shrink-0" style={{ color: '#a8895a' }}>{p.price}</span>
                  </div>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase mb-4" style={{ color: '#c4b49a' }}>{p.origin}</p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {(isEn ? p.axes_en : p.axes_ja).map((a) => (
                      <span key={a} className="font-sans text-[9px] tracking-[0.15em] uppercase px-3 py-1 border" style={{ borderColor: '#ddd5c5', color: '#7a7065' }}>{a}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-px" style={{ background: '#e8e0d0' }}>
                        <div className="h-full" style={{ width: `${p.score}%`, background: '#5a7a5e' }}></div>
                      </div>
                      <span className="font-sans text-[9px]" style={{ color: '#5a7a5e' }}>{p.score}</span>
                    </div>
                    <Link href="/marketplace" className="font-sans text-[9px] tracking-[0.2em] uppercase transition-colors" style={{ color: '#a8895a' }}>
                      {isEn ? 'View →' : '詳細 →'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP ── */}
      <section className="py-36 px-8" style={{ background: '#1c1917' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-8" style={{ color: '#a8895a' }}>
            {isEn ? 'CORE Membership' : 'COREメンバーシップ'}
          </p>
          <h2 className="font-serif font-light leading-tight mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#faf8f4' }}>
            {isEn
              ? <>Go deeper.<br /><span className="italic" style={{ color: '#a8895a' }}>Stay ahead.</span></>
              : <>さらに深く。<br /><span className="italic" style={{ color: '#a8895a' }}>最前線に居続ける。</span></>}
          </h2>
          <p className="font-serif font-light text-lg leading-relaxed mb-16 max-w-xl mx-auto" style={{ color: '#7a7065' }}>
            {isEn
              ? "Access peer-reviewed research digests, unlimited re-diagnostics, and personalized protocol updates — all filtered through Japan's longevity lens."
              : '査読論文ダイジェスト・無制限再診断・パーソナライズドプロトコル更新にアクセス。すべて日本の長寿レンズでフィルタリング。'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-16" style={{ background: '#3d3832' }}>
            {[
              {
                tier: 'CORE', price: '¥1,980', period: isEn ? '/month' : '/月',
                accent: '#a8895a',
                features: isEn
                  ? ['Monthly research digest (peer-reviewed)', 'Unlimited 6-axis re-diagnostics', 'Personalized recommendations', 'Community access']
                  : ['月次研究ダイジェスト（査読論文）', '6軸診断・無制限再診断', 'パーソナライズドレコメンド', 'コミュニティアクセス'],
                cta: isEn ? 'Join CORE' : 'COREに参加',
              },
              {
                tier: 'PRIME', price: '¥4,980', period: isEn ? '/month' : '/月',
                accent: '#5a7a5e',
                features: isEn
                  ? ['Everything in CORE', 'Weekly research deep-dives', 'Direct Q&A with researchers', 'Early marketplace access', 'B2B certification pathway']
                  : ['COREの全機能', '週次研究深掘りレポート', '研究者との直接Q&A', 'マーケットプレイス先行アクセス', 'B2B認定パスウェイ'],
                cta: isEn ? 'Join PRIME' : 'PRIMEに参加',
              },
            ].map((plan) => (
              <div key={plan.tier} className="p-10 text-left" style={{ background: '#242220' }}>
                <div className="flex justify-between items-start mb-8">
                  <span className="font-sans text-[9px] tracking-[0.4em] uppercase" style={{ color: plan.accent }}>{plan.tier}</span>
                  <div className="text-right">
                    <span className="font-serif font-light text-3xl" style={{ color: '#faf8f4' }}>{plan.price}</span>
                    <span className="font-sans text-[10px] ml-1" style={{ color: '#4a4440' }}>{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-sans text-sm" style={{ color: '#7a7065' }}>
                      <span className="mt-1 flex-shrink-0 w-1 h-1 rounded-full inline-block" style={{ background: plan.accent }}></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/core"
                  className="block w-full text-center py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase border transition-all duration-500 hover:text-[#1c1917]"
                  style={{ borderColor: plan.accent, color: plan.accent }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.background = plan.accent; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent'; }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-36 px-8 text-center" style={{ background: '#faf8f4' }}>
        <div className="max-w-2xl mx-auto">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c4b49a] to-transparent mx-auto mb-12"></div>
          <h2 className="font-serif font-light leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1c1917' }}>
            {isEn
              ? <>Your longevity journey<br />starts with one question:</>
              : <>あなたの長寿の旅は<br />一つの問いから始まる：</>}
          </h2>
          <p className="font-serif italic text-2xl mb-4" style={{ color: '#a8895a' }}>
            {isEn ? 'Where are you aging fastest?' : 'あなたが最も速く老化している場所はどこか？'}
          </p>
          <p className="font-sans text-sm leading-relaxed mb-12" style={{ color: '#7a7065' }}>
            {isEn
              ? 'Our free 6-axis diagnosis reveals your biological weak points — and shows you the Japanese science to address them.'
              : '無料の6軸診断があなたの生物学的弱点を明らかにし、それに対処するための日本の科学を示す。'}
          </p>
          <Link
            href="/diagnosis"
            className="inline-block font-sans text-[11px] tracking-[0.3em] uppercase px-14 py-5 transition-all duration-500 hover:bg-[#a8895a]"
            style={{ background: '#1c1917', color: '#faf8f4' }}
          >
            {isEn ? 'Begin Free Diagnosis' : '無料診断を始める'}
          </Link>
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase mt-6" style={{ color: '#c4b49a' }}>
            {isEn ? '5 min · No signup · 25 questions' : '5分 · 登録不要 · 25問'}
          </p>
        </div>
      </section>

    </div>
  );
}
