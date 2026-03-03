import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, ShoppingBag, BookOpen, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: '個人投資戦略 — Personal Investment Strategy | SHIROKUMA',
  description:
    'Build your personalized longevity investment plan. Allocate time, money, and effort across Japan\'s 6 biological axes for maximum healthspan return.',
};

const axes = [
  {
    id: 'inflammation',
    icon: '🔥',
    label: 'Inflammation',
    ja: '炎症軸',
    color: '#e07b54',
    bg: '#fff4f0',
    timeInvestment: '10 min/day',
    budgetRange: '¥3,000–¥8,000/mo',
    roi: 'High',
    actions: ['Switch to washoku breakfast', 'Add matcha (2 cups/day)', 'Replace vegetable oils with sesame/olive'],
  },
  {
    id: 'gut',
    icon: '🦠',
    label: 'Gut Microbiome',
    ja: '腸内環境軸',
    color: '#7a9e7e',
    bg: '#f0f6f1',
    timeInvestment: '5 min/day',
    budgetRange: '¥2,000–¥6,000/mo',
    roi: 'Very High',
    actions: ['Eat natto 3×/week', 'Include miso soup daily', 'Add fermented foods (kimchi, tsukemono)'],
  },
  {
    id: 'neural',
    icon: '🧠',
    label: 'Neural / Stress',
    ja: '神経軸',
    color: '#7b68ee',
    bg: '#f4f2ff',
    timeInvestment: '20 min/day',
    budgetRange: '¥0–¥3,000/mo',
    roi: 'Very High',
    actions: ['10-min morning zazen', 'Shinrin-yoku walk 2×/week', 'Digital sunset 1hr before bed'],
  },
  {
    id: 'metabolic',
    icon: '⚡',
    label: 'Metabolic',
    ja: '代謝軸',
    color: '#e8a838',
    bg: '#fffbf0',
    timeInvestment: '30 min/day',
    budgetRange: '¥2,000–¥10,000/mo',
    roi: 'High',
    actions: ['Practice hara hachi bu', 'Weekly onsen or hot bath', 'Walk 8,000 steps/day'],
  },
  {
    id: 'hormonal',
    icon: '🌙',
    label: 'Hormonal / Sleep',
    ja: 'ホルモン軸',
    color: '#3d5a80',
    bg: '#f0f4f8',
    timeInvestment: '15 min/day',
    budgetRange: '¥1,000–¥5,000/mo',
    roi: 'High',
    actions: ['Fix wake time (same every day)', 'Morning sunlight exposure (10 min)', 'Eliminate blue light after 9pm'],
  },
  {
    id: 'social',
    icon: '🤝',
    label: 'Social / Ikigai',
    ja: '社会軸',
    color: '#c9a96e',
    bg: '#faf6ef',
    timeInvestment: '30 min/day',
    budgetRange: '¥0–¥2,000/mo',
    roi: 'Highest',
    actions: ['Write your ikigai statement', 'Schedule weekly moai (group activity)', 'Volunteer or teach a skill monthly'],
  },
];

const investmentTiers = [
  {
    name: 'Foundations',
    ja: '基礎戦略',
    monthlyBudget: '¥0–¥3,000',
    timePerDay: '30 min',
    color: '#7a9e7e',
    description: 'Zero-cost Japanese habits with the highest evidence base. No products required.',
    pillars: [
      'Daily hara hachi bu (eat to 80%)',
      'Morning sunlight + consistent wake time',
      '10-min zazen or mindful breathing',
      'Weekly shinrin-yoku walk',
      'Ikigai journaling (weekly reflection)',
    ],
    cta: 'Start Free Diagnosis',
    ctaHref: '/diagnosis',
  },
  {
    name: 'Accelerate',
    ja: '加速戦略',
    monthlyBudget: '¥3,000–¥12,000',
    timePerDay: '45 min',
    color: '#c9a96e',
    description: 'Add targeted fermented foods and axis-matched products to amplify your protocol.',
    pillars: [
      'Everything in Foundations',
      'Natto + miso soup 5×/week',
      'Ceremonial matcha daily',
      'Weekly onsen or hinoki bath',
      'CORE research digest (monthly)',
    ],
    cta: 'Explore Marketplace',
    ctaHref: '/marketplace',
  },
  {
    name: 'Optimize',
    ja: '最適化戦略',
    monthlyBudget: '¥12,000+',
    timePerDay: '60 min',
    color: '#3d5a80',
    description: 'Full-stack longevity. All 6 axes addressed with precision products and expert research.',
    pillars: [
      'Everything in Accelerate',
      'Quarterly 6-axis re-diagnostics',
      'PRIME research + researcher Q&A',
      'Axis-specific supplement stack',
      'Lab-tested protocol adjustments',
    ],
    cta: 'Join PRIME',
    ctaHref: '/core',
  },
];

const roiPrinciples = [
  {
    number: '01',
    title: 'Time > Money',
    ja: '時間は金よりも大切',
    desc: 'The highest-ROI longevity interventions cost nothing. Consistent sleep timing, hara hachi bu, and daily movement compound over decades more powerfully than any supplement.',
  },
  {
    number: '02',
    title: 'Weakest Axis First',
    ja: '最弱軸から攻める',
    desc: 'Your longevity chain is only as strong as its weakest link. A perfect gut microbiome cannot compensate for chronic unmanaged stress. Target your diagnosis bottleneck first.',
  },
  {
    number: '03',
    title: 'Stack for Synergy',
    ja: 'シナジーを重ねる',
    desc: 'Morning matcha simultaneously benefits Neural (L-theanine) and Metabolic (EGCG + AMPK) axes. Shinrin-yoku covers Neural, Metabolic, and Social. Design compounding interventions.',
  },
  {
    number: '04',
    title: 'Measure, Then Invest',
    ja: '測定してから投資する',
    desc: 'Diagnose first, then allocate. Spending on gut products when your bottleneck is cortisol is poor capital allocation. Know your 6-axis profile before buying anything.',
  },
];

export default function InvestmentPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] pt-24">
      {/* Header */}
      <section className="bg-[#1a1a18] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, #c9a96e 0px, #c9a96e 1px, transparent 1px, transparent 24px)` }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">Personal Investment Strategy</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            個人投資戦略
          </h1>
          <p className="text-2xl md:text-3xl text-[#c9a96e] font-bold mb-6">
            Invest in your biology.<br />Strategically.
          </p>
          <p className="text-[#8a8a7a] font-sans text-lg max-w-2xl leading-relaxed mb-10">
            Longevity is not a luxury purchase — it&apos;s a capital allocation problem.
            Learn how to deploy time, money, and attention across Japan&apos;s 6 biological axes
            for the highest possible healthspan return.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/diagnosis"
              className="inline-flex items-center gap-3 bg-[#c9a96e] text-[#1a1a18] px-8 py-4 rounded-full font-sans font-bold hover:bg-[#b8956a] transition-all"
            >
              Get Your Axis Profile Free
              <ArrowRight size={18} />
            </Link>
            <a
              href="#tiers"
              className="inline-flex items-center gap-3 border border-[#3a3a38] text-[#e8d5b7] px-8 py-4 rounded-full font-sans hover:border-[#c9a96e] transition-all"
            >
              View Investment Tiers
            </a>
          </div>
        </div>
      </section>

      {/* ROI Principles */}
      <section className="py-20 px-6 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">Core Principles</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a18]">
              The rules of longevity capital
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roiPrinciples.map((p) => (
              <div key={p.number} className="bg-white rounded-2xl p-6 border border-[#e8d5b7]/50 hover:shadow-md transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-[#c9a96e] font-bold text-2xl font-sans flex-shrink-0">{p.number}</span>
                  <div>
                    <h3 className="text-[#1a1a18] font-bold text-lg">{p.title}</h3>
                    <p className="text-[#9a9a8a] text-xs font-sans tracking-widest mb-3">{p.ja}</p>
                    <p className="text-[#6a6a5a] text-sm font-sans leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Per-Axis Investment Guide */}
      <section className="py-20 px-6 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">6-Axis Allocation</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a18] mb-4">
              Where to invest per axis
            </h2>
            <p className="text-[#6a6a5a] font-sans text-lg max-w-2xl mx-auto">
              Each biological axis has a different time/money/effort ratio.
              Use your diagnosis score to decide where to over-invest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {axes.map((axis) => (
              <div
                key={axis.id}
                className="rounded-2xl border border-[#e8d5b7]/50 overflow-hidden hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: axis.bg }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{axis.icon}</span>
                    <span
                      className="text-[10px] font-sans font-bold px-2.5 py-1 rounded-full"
                      style={{ color: axis.color, backgroundColor: `${axis.color}18` }}
                    >
                      ROI: {axis.roi}
                    </span>
                  </div>
                  <h3 className="text-[#1a1a18] font-bold text-lg">{axis.label}</h3>
                  <p className="text-[#9a9a8a] text-xs font-sans tracking-widest mb-4">{axis.ja}</p>

                  {/* Investment metrics */}
                  <div className="flex gap-4 mb-5">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} style={{ color: axis.color }} />
                      <span className="text-[#5a5a4a] text-xs font-sans">{axis.timeInvestment}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag size={12} style={{ color: axis.color }} />
                      <span className="text-[#5a5a4a] text-xs font-sans">{axis.budgetRange}</span>
                    </div>
                  </div>

                  {/* Action list */}
                  <ul className="space-y-2">
                    {axis.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#5a5a4a] text-sm font-sans">
                        <span className="font-bold mt-0.5 flex-shrink-0" style={{ color: axis.color }}>→</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Tiers */}
      <section id="tiers" className="py-20 px-6 bg-[#1a1a18]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">Investment Tiers</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Three levels. One direction.
            </h2>
            <p className="text-[#8a8a7a] font-sans text-lg max-w-2xl mx-auto">
              Choose your investment level based on your current bottleneck, goals, and available resources.
              Every tier builds on the one before.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investmentTiers.map((tier) => (
              <div
                key={tier.name}
                className="bg-[#2a2a28] border border-[#3a3a38] rounded-3xl p-7 flex flex-col hover:border-[#c9a96e]/30 transition-all"
              >
                <div className="mb-6">
                  <span
                    className="text-xs font-sans font-bold tracking-widest uppercase"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </span>
                  <p className="text-[#6a6a5a] text-xs font-sans tracking-widest mt-0.5">{tier.ja}</p>
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={14} style={{ color: tier.color }} />
                      <span className="text-white text-sm font-sans font-semibold">{tier.monthlyBudget}</span>
                      <span className="text-[#6a6a5a] text-xs font-sans">/month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} style={{ color: tier.color }} />
                      <span className="text-white text-sm font-sans font-semibold">{tier.timePerDay}</span>
                      <span className="text-[#6a6a5a] text-xs font-sans">/day</span>
                    </div>
                  </div>
                </div>

                <p className="text-[#8a8a7a] text-sm font-sans leading-relaxed mb-5">{tier.description}</p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {tier.pillars.map((pillar, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[#9a9a7a] text-sm font-sans">
                      <span style={{ color: tier.color }} className="mt-0.5 flex-shrink-0">✓</span>
                      {pillar}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.ctaHref}
                  className="block text-center py-3 rounded-full text-sm font-sans font-semibold transition-all"
                  style={{
                    backgroundColor: `${tier.color}20`,
                    color: tier.color,
                    border: `1px solid ${tier.color}40`,
                  }}
                >
                  {tier.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Planning Summary */}
      <section className="py-20 px-6 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">Planning Framework</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a18]">
              Your 3-step investment plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: <TrendingUp size={24} className="text-[#c9a96e]" />,
                title: 'Diagnose',
                ja: '診断する',
                desc: 'Take the free 6-axis diagnosis to identify your weakest biological axes. This is your investment thesis — your personal portfolio of risks.',
                cta: 'Start Free Diagnosis →',
                href: '/diagnosis',
              },
              {
                step: '02',
                icon: <BookOpen size={24} className="text-[#c9a96e]" />,
                title: 'Allocate',
                ja: '配分する',
                desc: 'Use your axis scores to decide where to over-invest first. Focus 60% of your effort on your two weakest axes. The others maintain through baseline habits.',
                cta: 'Browse Science Library →',
                href: '/science',
              },
              {
                step: '03',
                icon: <ShoppingBag size={24} className="text-[#c9a96e]" />,
                title: 'Execute',
                ja: '実行する',
                desc: 'Start with the Foundations tier (zero cost). Add axis-matched products only after your habits are in place. Track improvement with quarterly re-diagnostics.',
                cta: 'Explore Marketplace →',
                href: '/marketplace',
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-7 border border-[#e8d5b7]/50 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#c9a96e] font-bold text-2xl font-sans">{item.step}</span>
                  {item.icon}
                </div>
                <h3 className="text-[#1a1a18] font-bold text-xl">{item.title}</h3>
                <p className="text-[#9a9a8a] text-xs font-sans tracking-widest mb-3">{item.ja}</p>
                <p className="text-[#6a6a5a] text-sm font-sans leading-relaxed mb-5">{item.desc}</p>
                <Link href={item.href} className="text-[#c9a96e] text-sm font-sans hover:underline">
                  {item.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-[#fafaf8] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a18] mb-6">
            The best investment<br />starts with a diagnosis.
          </h2>
          <p className="text-[#6a6a5a] font-sans text-lg mb-10 leading-relaxed">
            Before allocating a single yen, understand which of your 6 biological axes needs it most.
            25 questions. 5 minutes. Free.
          </p>
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-3 bg-[#c9a96e] text-[#1a1a18] px-12 py-5 rounded-full text-lg font-sans font-bold hover:bg-[#b8956a] transition-all duration-300 shadow-lg"
          >
            Begin Free Diagnosis
            <ArrowRight size={20} />
          </Link>
          <p className="text-[#9a9a8a] text-xs font-sans mt-4">No signup required · Instant results · Personalized protocol</p>
        </div>
      </section>
    </div>
  );
}
