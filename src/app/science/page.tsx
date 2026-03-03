import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Science Library | SHIROKUMA',
  description: 'Peer-reviewed evidence behind Japan\'s longevity mechanisms. Inflammation, microbiome, circadian biology, ikigai — the science decoded.',
};

const articles = [
  {
    id: 1,
    category: 'Inflammation',
    categoryColor: '#e07b54',
    emoji: '🔥',
    title: 'How Washoku Suppresses Chronic Inflammation: The NF-κB Evidence',
    summary: 'Japan\'s traditional dietary pattern — rich in fish, seaweed, fermented soy, and green tea polyphenols — shows measurable suppression of the nuclear factor kappa B (NF-κB) inflammatory pathway, a key driver of aging-related disease.',
    keyFindings: [
      'Washoku adherence associated with 28% lower CRP levels (Osaka cohort, n=4,823)',
      'EPA/DHA from Japanese fish diet reduces TNF-α and IL-6 cytokine expression',
      'EGCG from matcha directly inhibits IκB kinase, blocking NF-κB nuclear translocation',
    ],
    axes: ['Inflammation'],
    readTime: '8 min',
    peerReviewed: true,
  },
  {
    id: 2,
    category: 'Gut Microbiome',
    categoryColor: '#7a9e7e',
    emoji: '🦠',
    title: 'Natto\'s Nattokinase: Cardiovascular Protection Through Fermentation',
    summary: 'Bacillus subtilis natto fermentation produces nattokinase, a serine protease with documented fibrinolytic (clot-dissolving) activity. Clinical evidence supports its role in cardiovascular and arterial aging prevention.',
    keyFindings: [
      'Nattokinase degrades fibrin 4x more efficiently than plasmin (in vitro)',
      '6-month RCT: daily natto reduced blood viscosity and improved arterial stiffness markers',
      'Natto fermentation produces Vitamin K2 MK-7 — the most bioavailable form for arterial protection',
    ],
    axes: ['Gut Microbiome', 'Inflammation'],
    readTime: '10 min',
    peerReviewed: true,
  },
  {
    id: 3,
    category: 'Neural / Stress',
    categoryColor: '#7b68ee',
    emoji: '🧠',
    title: 'Shinrin-yoku: The Forest Bathing Science Behind NK Cell Activation',
    summary: 'A series of controlled trials by Dr. Qing Li (Nippon Medical School) demonstrated that 2-hour forest bathing significantly elevates natural killer (NK) cell activity, lowers cortisol, and reduces sympathetic nervous system activation.',
    keyFindings: [
      '12-city study: forest bathing elevated NK cell activity by 50% (sustained for 7 days)',
      'Phytoncides (α-pinene, limonene) inhaled in forests directly activate NK cell production',
      'Cortisol reduction of 14.9% measured after 2-hour forest walk vs. urban walk',
    ],
    axes: ['Neural / Stress', 'Metabolic'],
    readTime: '12 min',
    peerReviewed: true,
  },
  {
    id: 4,
    category: 'Metabolic',
    categoryColor: '#e8a838',
    emoji: '⚡',
    title: 'Onsen Thermal Stress and Mitochondrial Biogenesis',
    summary: 'Repeated exposure to onsen (hot spring) temperatures (41–44°C) triggers heat shock proteins that activate mitochondrial biogenesis pathways — the same mechanisms activated by caloric restriction and exercise.',
    keyFindings: [
      'HSP70 expression increases 3-fold after 20-minute bath at 42°C',
      'PGC-1α (mitochondrial biogenesis master regulator) upregulated by thermal stress',
      'Balneotherapy (mineral spring bathing) improves insulin sensitivity comparable to moderate exercise',
    ],
    axes: ['Metabolic'],
    readTime: '9 min',
    peerReviewed: true,
  },
  {
    id: 5,
    category: 'Social / Ikigai',
    categoryColor: '#c9a96e',
    emoji: '🤝',
    title: 'Ikigai and Longevity: The Okinawan Centenarian Data',
    summary: 'The concept of ikigai (生き甲斐) — one\'s reason for being — has been studied longitudinally in Okinawan centenarian populations. Its relationship to longevity extends beyond psychology into measurable biomarker changes.',
    keyFindings: [
      'Okinawan men with high ikigai scores showed 60% lower risk of all-cause mortality (7-year follow-up)',
      'Ikigai correlates with lower IL-6 and TNF-α — suggesting systemic anti-inflammatory effect',
      'Moai (social support groups) associated with lower telomere attrition rates',
    ],
    axes: ['Social / Ikigai', 'Inflammation'],
    readTime: '11 min',
    peerReviewed: true,
  },
  {
    id: 6,
    category: 'Hormonal / Sleep',
    categoryColor: '#3d5a80',
    emoji: '🌙',
    title: 'Hara Hachi Bu: Caloric Restriction Mimetics Without Restriction',
    summary: 'The Okinawan practice of eating to 80% fullness (hara hachi bu) effectively reduces caloric intake by 10–15% without hunger, activating AMPK and mTOR pathways associated with extended cellular lifespan.',
    keyFindings: [
      'Okinawans practicing hara hachi bu consume ~1,800 kcal/day vs. 2,200 kcal Western average',
      'AMPK activation from mild caloric deficit shown to extend replicative lifespan in human fibroblasts',
      'Reduced mTOR signaling associated with lower risk of age-related cellular senescence',
    ],
    axes: ['Metabolic', 'Hormonal / Sleep'],
    readTime: '7 min',
    peerReviewed: true,
  },
];

const axisFilters = [
  { label: 'All', color: '#1a1a18' },
  { label: 'Inflammation', color: '#e07b54' },
  { label: 'Gut Microbiome', color: '#7a9e7e' },
  { label: 'Neural / Stress', color: '#7b68ee' },
  { label: 'Metabolic', color: '#e8a838' },
  { label: 'Hormonal / Sleep', color: '#3d5a80' },
  { label: 'Social / Ikigai', color: '#c9a96e' },
];

export default function SciencePage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] pt-24">
      {/* Header */}
      <section className="py-20 px-6 bg-[#fafaf8] border-b border-[#e8d5b7]/50">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">Science Library</p>
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a18] mb-4">
                Japan&apos;s longevity.<br />
                Decoded.
              </h1>
              <p className="text-[#6a6a5a] font-sans text-lg max-w-xl">
                Evidence-based deep-dives into the mechanisms behind Japan&apos;s most studied longevity practices.
                Peer-reviewed. Translated into action.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/core"
                className="block bg-[#1a1a18] text-[#fafaf8] px-6 py-3 rounded-full text-sm font-sans font-semibold hover:bg-[#c9a96e] transition-all text-center"
              >
                CORE: Full Research Access →
              </Link>
              <p className="text-[#9a9a8a] text-xs font-sans mt-2 text-center">Monthly digests for CORE members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Axis filter chips */}
      <div className="px-6 py-4 border-b border-[#e8d5b7]/50 bg-[#fafaf8]/95 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
          {axisFilters.map((f) => (
            <span
              key={f.label}
              className="px-3 py-1.5 rounded-full text-xs font-sans cursor-pointer border transition-all"
              style={{ borderColor: `${f.color}40`, color: f.color, backgroundColor: `${f.color}08` }}
            >
              {f.label}
            </span>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-3xl border border-[#e8d5b7]/50 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="p-8">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xl">{article.emoji}</span>
                <span
                  className="text-xs font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ color: article.categoryColor, backgroundColor: `${article.categoryColor}15` }}
                >
                  {article.category}
                </span>
                {article.peerReviewed && (
                  <span className="text-xs font-sans text-[#7a9e7e] bg-[#7a9e7e]/10 px-3 py-1 rounded-full">
                    ✓ Peer-reviewed basis
                  </span>
                )}
                <span className="text-[#9a9a8a] text-xs font-sans ml-auto">{article.readTime} read</span>
              </div>

              {/* Title */}
              <h2 className="text-[#1a1a18] font-bold text-xl leading-tight mb-4">{article.title}</h2>

              {/* Summary */}
              <p className="text-[#6a6a5a] font-sans leading-relaxed mb-6">{article.summary}</p>

              {/* Key Findings */}
              <div className="bg-[#f5f0e8] rounded-2xl p-5 mb-6">
                <p className="text-[#1a1a18] font-semibold text-sm mb-3">Key Findings:</p>
                <ul className="space-y-2">
                  {article.keyFindings.map((finding, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#5a5a4a] text-sm font-sans">
                      <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: article.categoryColor }}>→</span>
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Axis tags + CTA */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {article.axes.map((axis) => (
                    <span key={axis} className="text-[10px] font-sans bg-[#1a1a18]/5 text-[#1a1a18]/50 px-3 py-1 rounded-full">
                      {axis}
                    </span>
                  ))}
                </div>
                <Link
                  href="/core"
                  className="flex items-center gap-1 text-sm font-sans text-[#c9a96e] hover:underline"
                >
                  Full paper analysis in CORE
                  <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* CORE CTA Banner */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-[#1a1a18] rounded-3xl p-10 text-center">
          <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">CORE Members</p>
          <h3 className="text-3xl font-bold text-white mb-4">
            Get the full research digest every month
          </h3>
          <p className="text-[#8a8a7a] font-sans mb-8 max-w-xl mx-auto">
            CORE members receive deep-dive research reports (2,000–3,000 words each) on new studies,
            filtered through your personal 6-axis profile.
          </p>
          <Link
            href="/core"
            className="inline-flex items-center gap-2 bg-[#c9a96e] text-[#1a1a18] px-8 py-4 rounded-full font-sans font-bold hover:bg-[#b8956a] transition-all"
          >
            Join CORE — ¥1,980/month
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
