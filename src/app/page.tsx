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
    <div className="min-h-screen" style={{ background: '#0c0b09', color: '#f4f0e8' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8" style={{ background: '#0c0b09' }}>

        {/* Otemachi architectural grid — precision lines on lacquer */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #f4f0e8 0px, #f4f0e8 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, #f4f0e8 0px, #f4f0e8 1px, transparent 1px, transparent 80px)'
        }}></div>

        {/* gold vertical accent lines */}
        <div className="absolute top-0 left-16 w-px h-full bg-gradient-to-b from-transparent via-[#b8904c]/25 to-transparent hidden lg:block"></div>
        <div className="absolute top-0 right-16 w-px h-full bg-gradient-to-b from-transparent via-[#b8904c]/25 to-transparent hidden lg:block"></div>

        {/* top gold hairline — Ginza awning stripe */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, #b8904c, transparent)', opacity: 0.5 }}></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto pt-40 pb-32">

          {/* eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-12 h-px bg-[#b8904c]/40"></div>
            <span className="text-[#b8904c] text-[9px] font-sans tracking-[0.45em] uppercase font-light">
              {isEn ? 'Japan · Evidence-Based · Global' : '日本発 · 科学的根拠 · 世界へ'}
            </span>
            <div className="w-12 h-px bg-[#b8904c]/40"></div>
          </div>

          {/* main headline */}
          <h1 className="font-serif font-light leading-[1.05] mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-0.01em', color: '#f4f0e8' }}>
            {isEn ? (
              <>
                Aging is not<br />
                <span className="italic" style={{ color: '#b8904c' }}>destiny.</span>
              </>
            ) : (
              <>
                老化は<br />
                <span className="italic" style={{ color: '#b8904c' }}>宿命ではない。</span>
              </>
            )}
          </h1>

          <p className="font-serif italic text-xl md:text-2xl mb-3" style={{ color: '#a09080' }}>
            {isEn ? "It's a civilizational disease." : 'これは文明病である。'}
          </p>

          <p className="font-sans text-[11px] tracking-[0.4em] mb-16" style={{ color: '#5a4e42' }}>
            {isEn ? '老化は「宿命」ではなく「文明病」である' : 'Aging is not destiny — it is a civilizational disease.'}
          </p>

          <p className="font-serif font-light text-lg leading-relaxed max-w-xl mx-auto mb-16" style={{ color: '#a09080' }}>
            {isEn
              ? "SHIROKUMA decodes Japan's longevity secrets — washoku, fermentation, onsen, zen — through inflammation science, microbiome research, and circadian biology."
              : 'SHIROKUMAは日本の長寿の秘密（和食・発酵・温泉・禅）を炎症科学・マイクロバイオーム・概日リズムの視点から解読する。'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/diagnosis"
              className="font-sans text-[11px] tracking-[0.25em] uppercase px-10 py-4 transition-all duration-500 hover:opacity-80"
              style={{ background: '#b8904c', color: '#0c0b09', letterSpacing: '0.25em' }}
            >
              {isEn ? 'Begin Free Diagnosis' : '無料診断を始める'}
            </Link>
            <Link
              href="/science"
              className="font-sans text-[11px] tracking-[0.25em] uppercase px-10 py-4 border transition-all duration-500 hover:bg-[#b8904c] hover:text-[#0c0b09] hover:border-[#b8904c]"
              style={{ borderColor: '#b8904c40', color: '#a09080' }}
            >
              {isEn ? 'Explore the Science' : 'サイエンスを探る'}
            </Link>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gradient-to-b from-[#b8904c]/50 to-transparent"></div>
          <span className="font-sans text-[8px] tracking-[0.5em] uppercase" style={{ color: '#b8904c60' }}>Scroll</span>
        </div>
      </section>

      {/* ── STATS ── Otemachi boardroom: deep ink, platinum dividers */}
      <section className="py-10 px-8 border-y" style={{ borderColor: '#2e2822', background: '#131110' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#2e2822]">
          {[
            { value: '87', unit: isEn ? 'yrs' : '歳', label: isEn ? "Japan's avg. lifespan" : '日本人平均寿命', sub: isEn ? '世界最長寿国' : 'World\'s longest-lived' },
            { value: '6',  unit: isEn ? 'axes' : '軸', label: isEn ? 'Diagnostic framework' : '診断フレームワーク', sub: isEn ? '科学的根拠' : 'Evidence-based' },
            { value: '100+', unit: isEn ? 'papers' : '本', label: isEn ? 'Evidence base' : 'エビデンス基盤', sub: isEn ? 'Peer-reviewed' : '査読論文' },
            { value: '1', unit: isEn ? 'platform' : '拠点', label: isEn ? 'Japan → World' : '日本発 → 世界', sub: isEn ? 'Globally accessible' : 'グローバル展開' },
          ].map((s) => (
            <div key={s.label} className="text-center py-8 px-4">
              <p className="font-serif font-light leading-none mb-2" style={{ fontSize: '2.5rem', color: '#f4f0e8' }}>
                {s.value}<span className="text-lg ml-1" style={{ color: '#b8904c' }}>{s.unit}</span>
              </p>
              <p className="font-sans text-[10px] tracking-[0.15em] uppercase mb-1" style={{ color: '#a09080' }}>{s.label}</p>
              <p className="font-sans text-[9px]" style={{ color: '#5a4e42' }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ── Ginza private members club: deep lacquer */}
      <section className="py-36 px-8" style={{ background: '#0e0c0a' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <div>
            <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-8" style={{ color: '#b8904c' }}>
              {isEn ? 'The Philosophy' : '哲学'}
            </p>
            <h2 className="font-serif font-light leading-tight mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#f4f0e8' }}>
              {isEn ? (
                <>Western science,<br />Eastern wisdom.<br /><span className="italic" style={{ color: '#b8904c' }}>Finally united.</span></>
              ) : (
                <>西洋の科学と<br />東洋の叡智。<br /><span className="italic" style={{ color: '#b8904c' }}>ついに融合。</span></>
              )}
            </h2>
            <p className="font-serif font-light leading-relaxed mb-6 text-lg" style={{ color: '#8a7a6a' }}>
              {isEn
                ? "Peter Attia and Andrew Huberman have transformed how the West thinks about longevity. But they're missing something: Japan has been living this way for centuries."
                : 'ピーター・アティアやアンドリュー・ヒューバーマンは西洋の長寿観を変えた。しかし彼らには欠けているものがある。日本は数百年にわたってこの生き方を実践してきた。'}
            </p>
            <p className="font-serif font-light leading-relaxed text-lg" style={{ color: '#8a7a6a' }}>
              {isEn
                ? "Okinawan centenarians don't follow protocols. They eat fermented soybean. They walk to their fields. Their ikigai keeps them alive. SHIROKUMA translates this ancient operating system into evidence-based science."
                : '沖縄の百寿者はプロトコルに従わない。発酵大豆を食べ、畑まで歩き、生きがいが彼らを生かし続ける。SHIROKUMAはこの古代のOSを科学的根拠に翻訳する。'}
            </p>
          </div>

          <div className="space-y-0 divide-y" style={{ borderColor: '#252018' }}>
            {wisdom.map((item) => (
              <div key={item.kanji} className="flex gap-8 py-7 group">
                <div className="flex-shrink-0 w-12 h-12 border flex items-center justify-center" style={{ borderColor: '#2e2822' }}>
                  <span className="font-mincho text-xl" style={{ color: '#b8904c', fontWeight: 500 }}>{item.kanji}</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-serif text-lg font-light" style={{ color: '#f4f0e8' }}>
                      {isEn ? item.title_en : item.title_ja}
                    </span>
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: '#3a3028' }}>
                      {isEn ? item.sub_en : item.sub_ja}
                    </span>
                  </div>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: '#7a6a5a' }}>
                    {isEn ? item.desc_en : item.desc_ja}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 AXES ── Ginza marble gallery: cold ivory */}
      <section className="py-36 px-8" style={{ background: '#ece7de' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-6" style={{ color: '#b8904c' }}>
              {isEn ? 'The Framework' : 'フレームワーク'}
            </p>
            <h2 className="font-serif font-light leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1a1614' }}>
              {isEn ? '6 Axes of Longevity' : '長寿の六軸'}
            </h2>
            <div className="w-8 h-px mx-auto" style={{ background: '#b8904c', opacity: 0.5 }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#c4bcb0' }}>
            {axes.map((axis) => (
              <div key={axis.id} className="p-10 group hover:bg-[#ece7de] transition-colors duration-500" style={{ background: '#f4f0e8' }}>
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mincho text-4xl" style={{ color: '#c4bcb0', fontWeight: 500 }}>{axis.kanji}</span>
                </div>
                <h3 className="font-serif text-xl font-light mb-4" style={{ color: '#1a1614' }}>
                  {isEn ? axis.en : axis.ja}
                </h3>
                <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: '#6a5e54' }}>
                  {isEn ? axis.desc_en : axis.desc_ja}
                </p>
                <p className="font-sans text-[9px] tracking-[0.15em] uppercase" style={{ color: '#a09080' }}>
                  {axis.science}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/diagnosis"
              className="inline-block font-sans text-[11px] tracking-[0.25em] uppercase px-12 py-4 border transition-all duration-500 hover:bg-[#1a1614] hover:text-[#f4f0e8] hover:border-[#1a1614]"
              style={{ borderColor: '#b8904c60', color: '#6a5e54' }}
            >
              {isEn ? 'Diagnose All 6 Axes — Free' : '6軸を診断する — 無料'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── AUTHOR ── Otemachi: authoritative, cool marble */}
      <section className="py-36 px-8" style={{ background: '#e8e3da' }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          {/* portrait placeholder */}
          <div className="flex justify-center order-2 md:order-1">
            <div className="relative w-64 h-80 border" style={{ borderColor: '#b8904c50' }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: '#d8d2c9' }}>
                <span className="font-mincho text-6xl mb-4" style={{ color: '#b8a898', fontWeight: 500 }}>白</span>
                <span className="font-sans text-[8px] tracking-[0.4em] uppercase" style={{ color: '#b8a898' }}>SHIROKUMA</span>
              </div>
              {/* badge */}
              <div className="absolute -bottom-4 -right-4 px-4 py-3" style={{ background: '#0c0b09' }}>
                <p className="font-sans text-[8px] tracking-[0.3em] uppercase mb-0.5" style={{ color: '#b8904c' }}>
                  {isEn ? 'Active Physician' : '現役医師'}
                </p>
                <p className="font-serif text-sm font-light" style={{ color: '#f4f0e8' }}>放射線科医</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-8" style={{ color: '#b8904c' }}>
              {isEn ? 'About the Author' : '著者について'}
            </p>
            <h2 className="font-serif font-light leading-tight mb-8" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#1a1614' }}>
              {isEn ? (
                <>Written by a doctor<br /><span className="italic" style={{ color: '#b8904c' }}>who lives the science.</span></>
              ) : (
                <>科学を自ら実践する<br /><span className="italic" style={{ color: '#b8904c' }}>医師が書いた。</span></>
              )}
            </h2>
            <p className="font-serif font-light leading-relaxed mb-5 text-lg" style={{ color: '#6a5e54' }}>
              {isEn
                ? 'NISHI is a practicing radiologist and longevity researcher based in Japan. At 36, he maintains 9.7% body fat — not because of genetics, but through a meticulously science-tested protocol rooted in evolutionary medicine.'
                : 'NISHIは日本を拠点とする現役放射線科医・長寿研究者。36歳で体脂肪率9.7%を維持するのは遺伝ではなく、進化医学に根ざした科学的プロトコルによる。'}
            </p>
            <p className="font-serif font-light leading-relaxed mb-10 text-lg" style={{ color: '#6a5e54' }}>
              {isEn
                ? "His mission: to be the first Japanese physician to scientifically decode why Japan is the world's longest-lived nation — and deliver that knowledge globally."
                : '彼のミッション：なぜ日本が世界最長寿国なのかを科学的に解読し、その知識を世界に届ける最初の日本人医師になること。'}
            </p>
            <div className="grid grid-cols-3 gap-0 divide-x" style={{ borderColor: '#c4bcb0' }}>
              {(isEn
                ? [{ v: '36', u: 'yrs', l: 'Age · 9.7% body fat' }, { v: '5+', u: 'yrs', l: 'Training & research' }, { v: '100+', u: 'refs', l: 'Peer-reviewed' }]
                : [{ v: '36', u: '歳', l: '体脂肪率9.7%' }, { v: '5+', u: '年', l: '実践・研究歴' }, { v: '100+', u: '本', l: '査読論文参照' }]
              ).map((s) => (
                <div key={s.l} className="text-center px-4 py-3">
                  <p className="font-serif font-light text-2xl" style={{ color: '#1a1614' }}>
                    {s.v}<span className="text-sm ml-0.5" style={{ color: '#b8904c' }}>{s.u}</span>
                  </p>
                  <p className="font-sans text-[9px] tracking-[0.1em] mt-1" style={{ color: '#7a6a5a' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK ── Deep lacquer: like a Ginza art book display */}
      <section className="py-36 px-8" style={{ background: '#0c0b09' }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          {/* book visual */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-52 border-l-4 px-8 py-12 shadow-2xl" style={{ background: '#080706', borderLeftColor: '#b8904c' }}>
                <span className="font-sans text-[7px] tracking-[0.4em] uppercase border px-2 py-1 block w-fit mb-8" style={{ color: '#b8904c', borderColor: '#b8904c30' }}>
                  {isEn ? 'Coming 2026' : '2026年刊行'}
                </span>
                <h3 className="font-mincho font-light text-xl leading-snug mb-3" style={{ color: '#f4f0e8', fontWeight: 400 }}>
                  {isEn ? <>Aging Is a<br />Civilization<br />Disease</> : <>老化は<br />文明病である</>}
                </h3>
                <p className="font-sans text-[8px] tracking-[0.2em] mb-8" style={{ color: '#b8904c' }}>
                  {isEn ? 'SHIROKUMA 6-Axis Guide' : 'SHIROKUMA 6軸完全ガイド'}
                </p>
                <div className="w-6 h-px mb-6" style={{ background: '#b8904c25' }}></div>
                <p className="font-sans text-[7px] tracking-widest uppercase" style={{ color: '#3a3028' }}>NISHI · M.D.</p>
              </div>
              <div className="absolute -bottom-3 left-4 right-4 h-6 blur-md rounded-full" style={{ background: 'rgba(0,0,0,0.6)' }}></div>
            </div>
          </div>

          <div>
            <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-8" style={{ color: '#b8904c' }}>
              {isEn ? 'The Book' : '著書'}
            </p>
            <h2 className="font-serif font-light leading-tight mb-6" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#f4f0e8' }}>
              {isEn
                ? <>The manifesto for<br /><span className="italic" style={{ color: '#b8904c' }}>the anti-aging era.</span></>
                : <>アンチエイジング時代の<br /><span className="italic" style={{ color: '#b8904c' }}>マニフェスト。</span></>}
            </h2>
            <p className="font-serif font-light text-lg leading-relaxed mb-10" style={{ color: '#8a7a6a' }}>
              {isEn
                ? '7 chapters. 6 axes. One complete protocol to live not like a salmon — but like a polar bear.'
                : '7章構成。6つの軸。サーモンではなく、ホッキョクグマのように生きるための完全プロトコル。'}
            </p>
            <div className="space-y-0 divide-y mb-10" style={{ borderColor: '#252018' }}>
              {(isEn
                ? ['Inflammaging — The Silent Engine', 'The Gut Microbiome Axis', 'Neural & Stress Regulation', 'Metabolic Axis & Mitochondria', 'Hormonal Axis & Circadian Biology', 'Social Axis & Ikigai', 'The Japanese Integration Protocol']
                : ['炎症老化（Inflammaging）', '腸内マイクロバイオーム軸', '神経・ストレス調節', '代謝軸とミトコンドリア', 'ホルモン軸と概日リズム', '社会軸と生きがい', '日本式統合プロトコル']
              ).map((title, i) => (
                <div key={i} className="flex items-center gap-4 py-3">
                  <span className="font-sans text-[9px] w-5 flex-shrink-0" style={{ color: '#b8904c25' }}>0{i + 1}</span>
                  <span className="font-serif font-light text-sm" style={{ color: '#7a6a5a' }}>{title}</span>
                </div>
              ))}
            </div>
            <Link
              href="/science"
              className="inline-block font-sans text-[11px] tracking-[0.25em] uppercase px-8 py-3.5 border transition-all duration-500 hover:bg-[#b8904c] hover:border-[#b8904c] hover:text-[#0c0b09]"
              style={{ borderColor: '#b8904c', color: '#b8904c' }}
            >
              {isEn ? 'Preview the Science' : 'サイエンスを見る'}
            </Link>
          </div>
        </div>
      </section>

      {/* ── MARKETPLACE ── Ivory gallery: Ginza concept store */}
      <section className="py-36 px-8" style={{ background: '#f4f0e8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-6" style={{ color: '#b8904c' }}>
                {isEn ? 'Certified Marketplace' : '認定市場'}
              </p>
              <h2 className="font-serif font-light leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#1a1614' }}>
                {isEn ? <>Products backed<br />by the 6 axes.</> : <>六軸に基づいた<br />認定商品。</>}
              </h2>
            </div>
            <Link href="/marketplace" className="font-sans text-[10px] tracking-[0.25em] uppercase mt-6 md:mt-0 pb-0.5 border-b transition-colors" style={{ color: '#b8904c', borderColor: '#b8904c' }}>
              {isEn ? 'View all →' : '全商品 →'}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#d0c8bc' }}>
            {products.map((p) => (
              <div key={p.kanji} className="group" style={{ background: '#faf8f4' }}>
                {/* image area */}
                <div className="h-56 flex items-center justify-center border-b" style={{ background: '#e8e3da', borderColor: '#d0c8bc' }}>
                  <span className="font-mincho text-6xl" style={{ color: '#c4bcb0', fontWeight: 500 }}>{p.kanji}</span>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif font-light text-lg leading-tight" style={{ color: '#1a1614' }}>
                      {isEn ? p.name_en : p.name_ja}
                    </h3>
                    <span className="font-serif font-light text-lg ml-4 flex-shrink-0" style={{ color: '#b8904c' }}>{p.price}</span>
                  </div>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase mb-4" style={{ color: '#b8a898' }}>{p.origin}</p>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {(isEn ? p.axes_en : p.axes_ja).map((a) => (
                      <span key={a} className="font-sans text-[9px] tracking-[0.15em] uppercase px-3 py-1 border" style={{ borderColor: '#d0c8bc', color: '#6a5e54' }}>{a}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-px" style={{ background: '#e0d8d0' }}>
                        <div className="h-full" style={{ width: `${p.score}%`, background: '#3d5a3a' }}></div>
                      </div>
                      <span className="font-sans text-[9px]" style={{ color: '#3d5a3a' }}>{p.score}</span>
                    </div>
                    <Link href="/marketplace" className="font-sans text-[9px] tracking-[0.2em] uppercase transition-colors" style={{ color: '#b8904c' }}>
                      {isEn ? 'View →' : '詳細 →'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP ── Otemachi private club: lacquer + pine accents */}
      <section className="py-36 px-8" style={{ background: '#0c0b09' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-8" style={{ color: '#b8904c' }}>
            {isEn ? 'CORE Membership' : 'COREメンバーシップ'}
          </p>
          <h2 className="font-serif font-light leading-tight mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#f4f0e8' }}>
            {isEn
              ? <>Go deeper.<br /><span className="italic" style={{ color: '#b8904c' }}>Stay ahead.</span></>
              : <>さらに深く。<br /><span className="italic" style={{ color: '#b8904c' }}>最前線に居続ける。</span></>}
          </h2>
          <p className="font-serif font-light text-lg leading-relaxed mb-16 max-w-xl mx-auto" style={{ color: '#8a7a6a' }}>
            {isEn
              ? "Access peer-reviewed research digests, unlimited re-diagnostics, and personalized protocol updates — all filtered through Japan's longevity lens."
              : '査読論文ダイジェスト・無制限再診断・パーソナライズドプロトコル更新にアクセス。すべて日本の長寿レンズでフィルタリング。'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-16" style={{ background: '#2e2822' }}>
            {[
              {
                tier: 'CORE', price: '¥1,980', period: isEn ? '/month' : '/月',
                accent: '#b8904c',
                features: isEn
                  ? ['Monthly research digest (peer-reviewed)', 'Unlimited 6-axis re-diagnostics', 'Personalized recommendations', 'Community access']
                  : ['月次研究ダイジェスト（査読論文）', '6軸診断・無制限再診断', 'パーソナライズドレコメンド', 'コミュニティアクセス'],
                cta: isEn ? 'Join CORE' : 'COREに参加',
              },
              {
                tier: 'PRIME', price: '¥4,980', period: isEn ? '/month' : '/月',
                accent: '#3d5a3a',
                features: isEn
                  ? ['Everything in CORE', 'Weekly research deep-dives', 'Direct Q&A with researchers', 'Early marketplace access', 'B2B certification pathway']
                  : ['COREの全機能', '週次研究深掘りレポート', '研究者との直接Q&A', 'マーケットプレイス先行アクセス', 'B2B認定パスウェイ'],
                cta: isEn ? 'Join PRIME' : 'PRIMEに参加',
              },
            ].map((plan) => (
              <div key={plan.tier} className="p-10 text-left" style={{ background: '#141210' }}>
                <div className="flex justify-between items-start mb-8">
                  <span className="font-sans text-[9px] tracking-[0.4em] uppercase" style={{ color: plan.accent }}>{plan.tier}</span>
                  <div className="text-right">
                    <span className="font-serif font-light text-3xl" style={{ color: '#f4f0e8' }}>{plan.price}</span>
                    <span className="font-sans text-[10px] ml-1" style={{ color: '#3a3028' }}>{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 font-sans text-sm" style={{ color: '#7a6a5a' }}>
                      <span className="mt-1 flex-shrink-0 w-1 h-1 rounded-full inline-block" style={{ background: plan.accent }}></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/core"
                  className="block w-full text-center py-3.5 font-sans text-[10px] tracking-[0.25em] uppercase border transition-all duration-500 hover:text-[#0c0b09]"
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

      {/* ── FINAL CTA ── Ginza marble: crisp, confident */}
      <section className="py-36 px-8 text-center" style={{ background: '#ece7de' }}>
        <div className="max-w-2xl mx-auto">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#b8904c] to-transparent mx-auto mb-12 opacity-50"></div>
          <h2 className="font-serif font-light leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#1a1614' }}>
            {isEn
              ? <>Your longevity journey<br />starts with one question:</>
              : <>あなたの長寿の旅は<br />一つの問いから始まる：</>}
          </h2>
          <p className="font-serif italic text-2xl mb-4" style={{ color: '#b8904c' }}>
            {isEn ? 'Where are you aging fastest?' : 'あなたが最も速く老化している場所はどこか？'}
          </p>
          <p className="font-sans text-sm leading-relaxed mb-12" style={{ color: '#6a5e54' }}>
            {isEn
              ? 'Our free 6-axis diagnosis reveals your biological weak points — and shows you the Japanese science to address them.'
              : '無料の6軸診断があなたの生物学的弱点を明らかにし、それに対処するための日本の科学を示す。'}
          </p>
          <Link
            href="/diagnosis"
            className="inline-block font-sans text-[11px] tracking-[0.3em] uppercase px-14 py-5 transition-all duration-500 hover:bg-[#b8904c]"
            style={{ background: '#0c0b09', color: '#f4f0e8' }}
          >
            {isEn ? 'Begin Free Diagnosis' : '無料診断を始める'}
          </Link>
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase mt-6" style={{ color: '#a09080' }}>
            {isEn ? '5 min · No signup · 25 questions' : '5分 · 登録不要 · 25問'}
          </p>
        </div>
      </section>

    </div>
  );
}
