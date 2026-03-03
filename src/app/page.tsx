import Link from 'next/link';
import { ArrowRight, FlaskConical } from 'lucide-react';

const axes = [
  {
    id: 'inflammation',
    icon: '🔥',
    label: 'Inflammation',
    ja: '炎症軸',
    color: '#e07b54',
    bg: '#fff4f0',
    description: 'Chronic low-grade inflammation is the silent driver of aging. Japanese washoku and fermented foods naturally suppress NF-κB pathways.',
    science: 'Anti-inflammatory diet · Intestinal barrier · CRP markers',
  },
  {
    id: 'gut',
    icon: '🦠',
    label: 'Gut Microbiome',
    ja: '腸内環境軸',
    color: '#7a9e7e',
    bg: '#f0f6f1',
    description: 'Japan\'s fermentation culture — miso, natto, kimchi — seeds the gut with longevity-associated Bifidobacterium and Lactobacillus species.',
    science: 'Microbiome diversity · Short-chain fatty acids · Leaky gut',
  },
  {
    id: 'neural',
    icon: '🧠',
    label: 'Neural / Stress',
    ja: '神経軸',
    color: '#7b68ee',
    bg: '#f4f2ff',
    description: 'HPA axis dysregulation accelerates telomere shortening. Zen meditation and shinrin-yoku activate the parasympathetic system.',
    science: 'Cortisol · HPA axis · Neuroplasticity · Forest bathing',
  },
  {
    id: 'metabolic',
    icon: '⚡',
    label: 'Metabolic',
    ja: '代謝軸',
    color: '#e8a838',
    bg: '#fffbf0',
    description: 'Mitochondrial biogenesis through thermal stress (onsen) and movement. Hara hachi bu naturally activates mTOR suppression.',
    science: 'Mitochondria · mTOR · Insulin sensitivity · Onsen therapy',
  },
  {
    id: 'hormonal',
    icon: '🌙',
    label: 'Hormonal / Sleep',
    ja: 'ホルモン軸',
    color: '#3d5a80',
    bg: '#f0f4f8',
    description: 'Circadian rhythm alignment drives melatonin, growth hormone, and cortisol cycles. Light exposure patterns deeply affect biological aging.',
    science: 'Circadian biology · Melatonin · Sleep architecture · Blue light',
  },
  {
    id: 'social',
    icon: '🤝',
    label: 'Social / Ikigai',
    ja: '社会軸',
    color: '#c9a96e',
    bg: '#faf6ef',
    description: 'Ikigai — reason for being — is measurably correlated with longevity in Okinawan centenarians. Social bonds activate oxytocin anti-aging pathways.',
    science: 'Ikigai · Oxytocin · Loneliness biomarkers · Community',
  },
];

const stats = [
  { value: '87', unit: 'years', label: 'Japan avg. lifespan', sub: '世界最長寿国' },
  { value: '6', unit: 'axes', label: 'Diagnostic framework', sub: '科学的フレームワーク' },
  { value: '100+', unit: 'papers', label: 'Evidence base', sub: '査読論文' },
  { value: '1', unit: 'platform', label: 'Japan → World', sub: '日本発世界へ' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fafaf8]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-[#c9a96e]/5 blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#7a9e7e]/5 blur-3xl"></div>
        </div>

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #1a1a18 0px, #1a1a18 1px, transparent 1px, transparent 20px)`,
          }}
        ></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
          <div className="inline-flex items-center gap-2 bg-[#1a1a18]/5 border border-[#1a1a18]/10 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7a9e7e] animate-pulse"></span>
            <span className="text-xs font-sans text-[#1a1a18]/70 tracking-widest uppercase">
              Japan-Origin · Evidence-Based · Global
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#1a1a18] leading-tight mb-4">
            Aging is not
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #c9a96e 0%, #7a9e7e 50%, #3d5a80 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              destiny.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#6a6a5a] mt-2 mb-2 font-sans">
            It&apos;s a civilizational disease.
          </p>
          <p className="text-[#9a9a8a] text-sm tracking-[0.4em] mb-10 font-sans">
            老化は「宿命」ではなく「文明病」である
          </p>

          <p className="text-[#5a5a4a] text-lg max-w-2xl mx-auto leading-relaxed mb-12 font-sans">
            SHIROKUMA decodes Japan&apos;s 120-year longevity secrets — washoku, fermentation, onsen, zen —
            through the lens of inflammation science, microbiome research, and circadian biology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/diagnosis"
              className="group flex items-center gap-3 bg-[#1a1a18] text-[#fafaf8] px-8 py-4 rounded-full text-base font-sans font-semibold hover:bg-[#c9a96e] transition-all duration-300 shadow-lg"
            >
              Take Free 6-Axis Diagnosis
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/science"
              className="flex items-center gap-2 border border-[#1a1a18]/20 text-[#1a1a18] px-8 py-4 rounded-full text-base font-sans hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all duration-300"
            >
              <FlaskConical size={16} />
              Explore the Science
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-[#1a1a18]">
                  {stat.value}
                  <span className="text-[#c9a96e] text-lg ml-1">{stat.unit}</span>
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

      {/* Problem / Concept Section */}
      <section className="py-28 px-6 bg-[#1a1a18] text-[#e8d5b7]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">The Problem</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Western science,
                <br />
                Eastern wisdom.
                <br />
                <span className="text-[#c9a96e]">Finally united.</span>
              </h2>
              <p className="text-[#9a9a7a] text-base leading-relaxed mb-6 font-sans">
                Peter Attia and Andrew Huberman have transformed how the West thinks about longevity.
                But they&apos;re missing something: Japan has been living this way for centuries.
              </p>
              <p className="text-[#9a9a7a] text-base leading-relaxed font-sans">
                Okinawan centenarians don&apos;t follow protocols. They eat fermented soybean.
                They walk to their fields. They gather with neighbors. Their &quot;ikigai&quot; keeps them alive.
                SHIROKUMA translates this ancient operating system into evidence-based, actionable science.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: '🍱', title: 'Washoku', en: 'Japanese diet', desc: 'Naturally anti-inflammatory. Rich in polyphenols, omega-3s, fermented foods. Associated with lower IL-6 and CRP.' },
                { icon: '🌲', title: 'Shinrin-yoku', en: 'Forest bathing', desc: 'Clinically proven to lower cortisol, elevate NK cell activity, and reduce sympathetic nervous system activation.' },
                { icon: '♨️', title: 'Onsen', en: 'Hot spring therapy', desc: 'Thermal stress activates heat shock proteins (HSP70), promotes mitochondrial biogenesis, improves insulin sensitivity.' },
                { icon: '🧘', title: 'Zen', en: 'Meditation practice', desc: 'Reduces cortisol, lengthens telomeres, activates BDNF, and rewires prefrontal cortex for stress resilience.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-[#3a3a38] hover:border-[#c9a96e]/40 transition-colors">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-semibold">{item.title}</span>
                      <span className="text-[#6a6a5a] text-xs font-sans">/ {item.en}</span>
                    </div>
                    <p className="text-[#8a8a7a] text-sm font-sans leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6-Axis Framework Section */}
      <section className="py-28 px-6 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">The Framework</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a18] mb-4">6 Axes of Longevity</h2>
            <p className="text-[#6a6a5a] text-lg font-sans max-w-2xl mx-auto">
              Aging is not one problem. It&apos;s six interconnected systems, each requiring a different key.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {axes.map((axis, i) => (
              <div
                key={axis.id}
                className="group p-6 rounded-2xl border border-[#e8d5b7]/50 hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: axis.bg }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{axis.icon}</span>
                  <span className="text-[#1a1a18]/20 font-bold text-2xl font-sans">0{i + 1}</span>
                </div>
                <div className="mb-3">
                  <h3 className="text-[#1a1a18] font-bold text-lg">{axis.label}</h3>
                  <span className="text-[#9a9a8a] text-xs font-sans tracking-widest">{axis.ja}</span>
                </div>
                <p className="text-[#5a5a4a] text-sm leading-relaxed mb-4 font-sans">{axis.description}</p>
                <div
                  className="text-xs font-sans px-3 py-1.5 rounded-full inline-block"
                  style={{ color: axis.color, backgroundColor: `${axis.color}15` }}
                >
                  {axis.science}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/diagnosis"
              className="inline-flex items-center gap-3 bg-[#1a1a18] text-[#fafaf8] px-10 py-4 rounded-full text-base font-sans font-semibold hover:bg-[#c9a96e] transition-all duration-300"
            >
              Diagnose All 6 Axes — Free
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Author / Physician Credibility Section */}
      <section className="py-28 px-6 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Portrait placeholder */}
            <div className="flex justify-center md:justify-end order-2 md:order-1">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border-2 border-[#c9a96e]/20 scale-110"></div>
                <div className="absolute inset-0 rounded-full border border-[#7a9e7e]/15 scale-125"></div>
                {/* Avatar */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#e8d5b7] to-[#c9a96e]/30 flex items-center justify-center overflow-hidden">
                  <div className="text-center">
                    <div className="text-7xl mb-2">🐻‍❄️</div>
                    <span className="text-[#1a1a18]/40 text-xs font-sans tracking-widest uppercase">SHIROKUMA</span>
                  </div>
                </div>
                {/* Credential badge */}
                <div className="absolute -bottom-4 -right-4 bg-[#1a1a18] text-white rounded-2xl px-4 py-3 shadow-xl">
                  <p className="text-[#c9a96e] text-[9px] font-sans tracking-widest uppercase">Active Physician</p>
                  <p className="text-white text-xs font-bold font-sans mt-0.5">放射線科医</p>
                </div>
              </div>
            </div>

            {/* Bio text */}
            <div className="order-1 md:order-2">
              <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">About the Author</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a18] leading-tight mb-6">
                Written by a doctor<br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #c9a96e 0%, #7a9e7e 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  who lives the science.
                </span>
              </h2>
              <p className="text-[#5a5a4a] text-base leading-relaxed mb-6 font-sans">
                NISHI is a practicing radiologist and evidence-based longevity researcher based in Japan.
                At 36, he maintains 9.7% body fat with 5 years of structured training — not because of
                genetics, but because of a meticulously science-tested protocol rooted in evolutionary medicine
                and Japanese cultural practice.
              </p>
              <p className="text-[#5a5a4a] text-base leading-relaxed mb-8 font-sans">
                His mission: to be the first Japanese physician to scientifically decode <em>why Japan
                is the world&apos;s longest-lived nation</em> — and deliver that knowledge to a global audience.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '36', unit: 'yrs', label: 'Age · Body fat 9.7%' },
                  { value: '5+', unit: 'yrs', label: 'Training & research' },
                  { value: '100+', unit: 'refs', label: 'Peer-reviewed sources' },
                ].map((s) => (
                  <div key={s.label} className="bg-[#f5f0e8] rounded-xl p-3 text-center">
                    <p className="text-[#1a1a18] font-bold text-xl">
                      {s.value}<span className="text-[#c9a96e] text-sm ml-0.5">{s.unit}</span>
                    </p>
                    <p className="text-[#9a9a8a] text-[10px] font-sans leading-tight mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Preview Section */}
      <section className="py-28 px-6 bg-[#1a1a18] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Book mockup */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-[#c9a96e]/20 blur-3xl scale-110"></div>
                {/* Book cover */}
                <div className="relative w-56 md:w-64 rounded-lg overflow-hidden shadow-2xl"
                  style={{ background: 'linear-gradient(160deg, #1a1a18 0%, #2a2015 50%, #1a1a18 100%)', border: '1px solid #c9a96e40' }}>
                  {/* Spine accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#c9a96e] to-[#7a9e7e]"></div>
                  <div className="pl-6 pr-5 pt-10 pb-8">
                    {/* Top badge */}
                    <div className="inline-block border border-[#c9a96e]/50 text-[#c9a96e] text-[8px] font-sans tracking-[0.3em] uppercase px-2 py-1 rounded mb-6">
                      Coming 2026
                    </div>
                    {/* Title */}
                    <h3 className="text-white font-bold text-xl leading-snug mb-2">
                      Aging Is a<br />Civilization<br />Disease
                    </h3>
                    {/* Subtitle */}
                    <p className="text-[#c9a96e] text-[10px] font-sans leading-relaxed mb-6">
                      The SHIROKUMA<br />6-Axis Anti-Aging<br />Complete Guide
                    </p>
                    {/* Divider */}
                    <div className="w-8 h-px bg-[#c9a96e]/40 mb-4"></div>
                    {/* Author */}
                    <p className="text-[#8a8a7a] text-[9px] font-sans tracking-widest uppercase">NISHI · SHIROKUMA</p>
                    <p className="text-[#6a6a5a] text-[8px] font-sans mt-1">M.D., Radiologist</p>
                    {/* Bear icon */}
                    <div className="mt-6 text-3xl opacity-20">🐻‍❄️</div>
                  </div>
                </div>
                {/* Shadow */}
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-black/40 blur-md rounded-full"></div>
              </div>
            </div>

            {/* Book info */}
            <div>
              <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">The Book</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                The manifesto<br />for the<br /><span className="text-[#c9a96e]">anti-aging era.</span>
              </h2>
              <p className="text-[#9a9a7a] text-base leading-relaxed mb-6 font-sans">
                <em>&quot;Aging Is a Civilization Disease&quot;</em> is the first book by a Japanese physician
                to scientifically decode why Japan leads global longevity — using evolutionary medicine,
                inflammaging research, and gut microbiome science.
              </p>
              <p className="text-[#9a9a7a] text-base leading-relaxed mb-8 font-sans">
                Seven chapters. Six axes. One complete protocol to live like a polar bear — not a salmon.
              </p>
              {/* Chapter list */}
              <div className="space-y-2 mb-8">
                {[
                  { ch: '01', title: 'Inflammaging — The Silent Engine' },
                  { ch: '02', title: 'The Gut Microbiome Axis' },
                  { ch: '03', title: 'Neural & Stress Regulation' },
                  { ch: '04', title: 'Metabolic Axis & Mitochondria' },
                  { ch: '05', title: 'Hormonal Axis & Circadian Biology' },
                  { ch: '06', title: 'Social Axis & Ikigai' },
                  { ch: '07', title: 'The Japanese Integration Protocol' },
                ].map((item) => (
                  <div key={item.ch} className="flex items-center gap-3 py-2 border-b border-[#3a3a38]">
                    <span className="text-[#c9a96e]/50 text-xs font-sans font-bold w-6 flex-shrink-0">{item.ch}</span>
                    <span className="text-[#8a8a7a] text-sm font-sans">{item.title}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/science"
                className="inline-flex items-center gap-3 border border-[#c9a96e] text-[#c9a96e] px-8 py-3.5 rounded-full text-sm font-sans font-semibold hover:bg-[#c9a96e] hover:text-[#1a1a18] transition-all duration-300"
              >
                Preview the Science
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-28 px-6 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">Certified Marketplace</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a18]">
                Products backed<br />by the 6 axes
              </h2>
            </div>
            <Link href="/marketplace" className="mt-6 md:mt-0 text-sm font-sans text-[#c9a96e] border-b border-[#c9a96e] pb-0.5 hover:opacity-70 transition-opacity">
              View all products →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Natto Starter Culture Kit', origin: 'Ibaraki Prefecture', axisLabels: ['Gut', 'Inflammation'], price: '$34', tag: 'Fermented · Vitamin K2 · Nattokinase', emoji: '🫘', score: 94 },
              { name: 'Ceremonial Matcha Reserve', origin: 'Uji, Kyoto', axisLabels: ['Neural', 'Metabolic'], price: '$58', tag: 'L-Theanine · EGCG · Shade-grown', emoji: '🍵', score: 91 },
              { name: 'Hinoki Bath Salt Blend', origin: 'Kiso Valley, Nagano', axisLabels: ['Metabolic', 'Neural'], price: '$42', tag: 'HSP activation · Aromatic · Onsen-style', emoji: '♨️', score: 88 },
            ].map((product) => (
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
                    <Link href="/marketplace" className="text-xs font-sans text-[#c9a96e] hover:underline">View →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-28 px-6 bg-[#1a1a18]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-6">CORE Membership</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Go deeper.<br /><span className="text-[#c9a96e]">Stay ahead.</span>
          </h2>
          <p className="text-[#9a9a7a] text-lg font-sans leading-relaxed mb-10 max-w-2xl mx-auto">
            Access peer-reviewed research digests, unlimited re-diagnostics, and personalized protocol updates —
            all filtered through Japan&apos;s longevity lens.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                tier: 'CORE', price: '¥1,980', period: '/month',
                features: ['Monthly research digest (peer-reviewed)', 'Unlimited 6-axis re-diagnostics', 'Personalized product recommendations', 'Community access'],
                cta: 'Join CORE', accent: '#c9a96e',
              },
              {
                tier: 'PRIME', price: '¥4,980', period: '/month',
                features: ['Everything in CORE', 'Weekly research deep-dives', 'Direct Q&A with researchers', 'Early marketplace access', 'B2B certification pathway'],
                cta: 'Join PRIME', accent: '#7a9e7e',
              },
            ].map((plan) => (
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
                <Link
                  href="/core"
                  className="block w-full text-center py-3 rounded-full text-sm font-sans font-semibold transition-all"
                  style={{ backgroundColor: `${plan.accent}20`, color: plan.accent, border: `1px solid ${plan.accent}40` }}
                >
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
            Your longevity journey<br />starts with one question:
          </h2>
          <p className="text-3xl text-[#c9a96e] mb-4"><em>Where are you aging fastest?</em></p>
          <p className="text-[#6a6a5a] font-sans mb-10">
            Our free 6-axis diagnosis reveals your biological weak points — and shows you the Japanese science to address them.
          </p>
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-3 bg-[#c9a96e] text-[#1a1a18] px-12 py-5 rounded-full text-lg font-sans font-bold hover:bg-[#b8956a] transition-all duration-300 shadow-lg"
          >
            Begin Free Diagnosis
            <ArrowRight size={20} />
          </Link>
          <p className="text-[#9a9a8a] text-xs font-sans mt-4">5 minutes · No signup required · 25 questions</p>
        </div>
      </section>
    </div>
  );
}
