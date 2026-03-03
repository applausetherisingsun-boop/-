import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, BookOpen, FlaskConical, RefreshCw, Users, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CORE Membership | SHIROKUMA',
  description: 'Join CORE: monthly peer-reviewed research digests, unlimited re-diagnostics, and personalized Japanese longevity protocols. From ¥1,980/month.',
};

const coreFeatures = [
  { icon: BookOpen, title: 'Monthly Research Digest', desc: 'Peer-reviewed papers on inflammation, microbiome, and longevity — translated from academic to actionable. Written for intelligent non-specialists.' },
  { icon: RefreshCw, title: 'Unlimited Re-Diagnostics', desc: 'Track your 6-axis profile over time. Re-diagnose after protocol changes to measure actual biological improvement.' },
  { icon: FlaskConical, title: 'Personalized Protocol Updates', desc: 'As research evolves, so does your protocol. Receive updated Japanese science recommendations based on your specific axis profile.' },
  { icon: Users, title: 'CORE Community', desc: 'Access a curated community of evidence-minded individuals applying Japanese longevity principles. Japan-rooted, globally minded.' },
];

const primeExtras = [
  { icon: Zap, title: 'Weekly Deep-Dive Reports', desc: '4 weekly evidence reviews per month, focusing on cutting-edge longevity research. Full citations, study design critique, practical implications.' },
  { title: 'Researcher Q&A Sessions', desc: 'Monthly live sessions with researchers and practitioners applying Japan-adjacent longevity science. Submit questions in advance.' },
  { title: 'Early Marketplace Access', desc: 'First access to newly certified products, limited fermentation batches, and seasonal Japanese specialty items.' },
  { title: 'B2B Certification Pathway', desc: 'Qualify for SHIROKUMA product certification for your brand. Access review criteria, lab testing guidance, and marketplace listing support.' },
];

const researchTopics = [
  'Natto nattokinase & cardiovascular aging (n=240, Tohoku University)',
  'Shinrin-yoku effects on NK cell activity (JIFS longitudinal study)',
  'Miso consumption & stomach cancer risk reduction (NHK cohort)',
  'Ikigai as predictor of longevity in Okinawan centenarians',
  'Onsen bathing & heat shock protein HSP70 expression',
  'Washoku diet pattern & telomere length preservation',
  'L-theanine + caffeine synergy on alpha-wave neurological state',
  'Hara hachi bu caloric restriction mimetic mechanisms',
];

export default function CorePage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] pt-24">
      {/* Header */}
      <section className="bg-[#1a1a18] py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">CORE Membership</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Stay at the<br />
            <span className="text-[#c9a96e]">frontier of longevity.</span>
          </h1>
          <p className="text-[#8a8a7a] font-sans text-lg max-w-2xl mx-auto mb-10">
            The science of aging moves fast. CORE membership keeps you ahead —
            with Japan&apos;s research translated into protocols you can apply this week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#plans"
              className="bg-[#c9a96e] text-[#1a1a18] px-8 py-4 rounded-full font-sans font-bold hover:bg-[#b8956a] transition-all"
            >
              Join CORE — ¥1,980/month
            </a>
            <a
              href="#what-you-get"
              className="border border-[#3a3a38] text-[#e8d5b7] px-8 py-4 rounded-full font-sans hover:border-[#c9a96e] transition-all"
            >
              What&apos;s included?
            </a>
          </div>
        </div>
      </section>

      {/* What you get - CORE */}
      <section id="what-you-get" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">What You Get</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a18]">
              CORE Membership
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-2xl border border-[#e8d5b7]/50 p-6 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#c9a96e]" />
                  </div>
                  <h3 className="text-[#1a1a18] font-bold mb-2">{f.title}</h3>
                  <p className="text-[#6a6a5a] text-sm font-sans leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sample Research Topics */}
      <section className="py-20 px-6 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">Sample Research</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a18] mb-6">
                Real papers.<br />Real science.<br />
                <span className="text-[#c9a96e]">Actionable insight.</span>
              </h2>
              <p className="text-[#6a6a5a] font-sans leading-relaxed">
                Every digest is grounded in peer-reviewed research — but written to be understood and acted upon.
                Not abstracts. Not summaries. Translated into protocols for your specific 6-axis profile.
              </p>
            </div>
            <div className="space-y-3">
              {researchTopics.map((topic, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-[#e8d5b7]/50">
                  <span className="text-[#c9a96e] font-bold text-xs font-sans mt-0.5 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[#5a5a4a] text-sm font-sans">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className="py-20 px-6 bg-[#1a1a18]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">Choose Your Level</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Two tiers. One purpose.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CORE Plan */}
            <div className="bg-[#2a2a28] border border-[#3a3a38] rounded-3xl p-8">
              <div className="mb-6">
                <span className="text-[#c9a96e] text-xs font-sans font-bold tracking-widest uppercase">CORE</span>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-white text-4xl font-bold">¥1,980</span>
                  <span className="text-[#6a6a5a] text-sm font-sans pb-1">/month</span>
                </div>
                <p className="text-[#8a8a7a] text-sm font-sans mt-2">For the evidence-minded individual</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Monthly research digest (2,000–3,000 words)',
                  'Unlimited 6-axis re-diagnostics',
                  'Axis-specific protocol updates',
                  'CORE community access',
                  'Product recommendation matching',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[#9a9a7a] text-sm font-sans">
                    <Check size={16} className="text-[#c9a96e] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-[#c9a96e] text-[#1a1a18] py-4 rounded-full font-sans font-bold hover:bg-[#b8956a] transition-all flex items-center justify-center gap-2">
                Join CORE
                <ArrowRight size={16} />
              </button>
            </div>

            {/* PRIME Plan */}
            <div className="bg-gradient-to-br from-[#2a2a28] to-[#1a2a1a] border border-[#7a9e7e]/30 rounded-3xl p-8 relative">
              <div className="absolute -top-3 right-6">
                <span className="bg-[#7a9e7e] text-white text-[10px] font-sans font-bold px-3 py-1 rounded-full tracking-widest">
                  MOST POPULAR
                </span>
              </div>
              <div className="mb-6">
                <span className="text-[#7a9e7e] text-xs font-sans font-bold tracking-widest uppercase">PRIME</span>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-white text-4xl font-bold">¥4,980</span>
                  <span className="text-[#6a6a5a] text-sm font-sans pb-1">/month</span>
                </div>
                <p className="text-[#8a8a7a] text-sm font-sans mt-2">For serious longevity practitioners & B2B</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in CORE',
                  'Weekly deep-dive research reports',
                  'Monthly live researcher Q&A',
                  'Early marketplace product access',
                  'B2B certification pathway',
                  'Priority 1:1 protocol consultation (1x/quarter)',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[#9a9a7a] text-sm font-sans">
                    <Check size={16} className="text-[#7a9e7e] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-[#7a9e7e] text-white py-4 rounded-full font-sans font-bold hover:bg-[#6a8e6e] transition-all flex items-center justify-center gap-2">
                Join PRIME
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <p className="text-center text-[#6a6a5a] text-xs font-sans mt-8">
            Cancel anytime · No contracts · Billed monthly · Not medical advice
          </p>
        </div>
      </section>

      {/* PRIME extras */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#7a9e7e] text-xs font-sans tracking-[0.4em] uppercase mb-4">PRIME Exclusive</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a18]">Go beyond CORE</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {primeExtras.map((f, i) => (
              <div key={i} className="bg-[#f5f0e8] rounded-2xl p-6 border border-[#e8d5b7]/50">
                <h3 className="text-[#1a1a18] font-bold mb-2">{f.title}</h3>
                <p className="text-[#6a6a5a] text-sm font-sans leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-[#f5f0e8] text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold text-[#1a1a18] mb-4">
            Start with the free diagnosis.
          </h3>
          <p className="text-[#6a6a5a] font-sans mb-8">
            Know your 6-axis profile before deciding which membership level matches your goals.
          </p>
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-2 bg-[#1a1a18] text-[#fafaf8] px-8 py-4 rounded-full font-sans font-semibold hover:bg-[#c9a96e] transition-all"
          >
            Free 6-Axis Diagnosis
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
