import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Package, FlaskConical, Globe, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sell on SHIROKUMA | Certified Marketplace for Japanese Longevity Products',
  description: 'List your Japanese tea, fermented food, onsen product, or wellness item on SHIROKUMA\'s global marketplace. Get 6-axis certified and reach evidence-based international buyers.',
};

const steps = [
  {
    step: '01',
    title: 'Submit Your Application',
    desc: 'Tell us about your product, its origin, production method, and which longevity mechanisms you believe it supports. We review all applications within 14 business days.',
  },
  {
    step: '02',
    title: '6-Axis Scientific Review',
    desc: 'Our research team evaluates your product against the SHIROKUMA framework. We look for mechanism plausibility, traditional evidence, and (ideally) peer-reviewed support.',
  },
  {
    step: '03',
    title: 'Lab Testing (if required)',
    desc: 'Fermented and consumable products may require independent lab verification of active compounds (nattokinase, EGCG, live cultures, etc.). We\'ll guide you through this process.',
  },
  {
    step: '04',
    title: 'Certified Listing',
    desc: 'Approved products receive a SHIROKUMA Certification Score (out of 100) across relevant axes, a verified origin story, and access to our international customer base.',
  },
];

const eligibleCategories = [
  { emoji: '🍵', label: 'Tea & Matcha', desc: 'Shade-grown, ceremonial grade, single-origin Japanese teas' },
  { emoji: '🫘', label: 'Fermented Foods', desc: 'Natto, miso, amazake, tsukemono, and other traditionally fermented products' },
  { emoji: '♨️', label: 'Onsen & Bath', desc: 'Mineral bath salts, hinoki products, thermal wellness goods' },
  { emoji: '🍄', label: 'Functional Mushrooms', desc: 'Reishi, shiitake, maitake — Japanese-grown, extract or whole' },
  { emoji: '🌿', label: 'Seaweed & Sea Vegetables', desc: 'Kombu, wakame, nori, hijiki — sustainably harvested' },
  { emoji: '🫙', label: 'Traditional Condiments', desc: 'Naturally brewed soy sauce, ponzu, yuzu products, wasabi' },
  { emoji: '🏡', label: 'Wellness & Lifestyle', desc: 'Zen-inspired home goods, natural sleep products, movement tools' },
  { emoji: '📚', label: 'Experiences & Knowledge', desc: 'Online courses, farm stays, guided shinrin-yoku experiences' },
];

const fees = [
  { label: 'Application review', value: 'Free', note: '14-day turnaround' },
  { label: 'Lab testing (if required)', value: 'At cost', note: 'We coordinate testing; you pay actual cost' },
  { label: 'Annual listing fee', value: '¥12,000', note: 'Per certified product/year' },
  { label: 'Transaction commission', value: '15–20%', note: 'Lower for PRIME members' },
  { label: 'B2B certification (PRIME)', value: 'Included', note: 'In PRIME membership' },
];

export default function SellerPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] pt-24">
      {/* Hero */}
      <section className="py-20 px-6 bg-[#1a1a18]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">For Producers & Sellers</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Bring Japan&apos;s<br />
                longevity wisdom<br />
                <span className="text-[#c9a96e]">to the world.</span>
              </h1>
              <p className="text-[#8a8a7a] font-sans leading-relaxed mb-8">
                SHIROKUMA connects Japan&apos;s most scientifically validated traditional products —
                teas, ferments, onsen goods, and more — with a global audience actively seeking evidence-based longevity.
              </p>
              <a
                href="#apply"
                className="inline-flex items-center gap-3 bg-[#c9a96e] text-[#1a1a18] px-8 py-4 rounded-full font-sans font-bold hover:bg-[#b8956a] transition-all"
              >
                Apply to Sell
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, title: 'Global Reach', desc: 'Buyers in 40+ countries actively seeking Japan-origin wellness' },
                { icon: FlaskConical, title: 'Scientific Credibility', desc: 'Our 6-axis certification lends peer-reviewed authority to your brand' },
                { icon: TrendingUp, title: 'Growing Market', desc: '$30B+ evidence-based longevity market, Japan critically underrepresented' },
                { icon: Package, title: 'Seller Support', desc: 'Export guidance, translation support, and logistics partnerships' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-[#2a2a28] p-5 rounded-2xl border border-[#3a3a38]">
                    <Icon size={20} className="text-[#c9a96e] mb-3" />
                    <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-[#8a8a7a] text-xs font-sans leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Eligible Categories */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">What We Accept</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a18]">Eligible product categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eligibleCategories.map((cat) => (
              <div key={cat.label} className="bg-[#f5f0e8] rounded-2xl p-5 border border-[#e8d5b7]/50 text-center">
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <h4 className="text-[#1a1a18] font-bold text-sm mb-1">{cat.label}</h4>
                <p className="text-[#8a8a7a] text-xs font-sans leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#9a9a8a] text-sm font-sans mt-6">
            Not sure if your product qualifies? Apply anyway — we review all submissions and provide feedback.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6 bg-[#1a1a18]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">The Process</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">How certification works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="bg-[#2a2a28] rounded-2xl p-6 border border-[#3a3a38]">
                <div className="text-[#c9a96e] font-bold text-3xl font-sans mb-4">{step.step}</div>
                <h3 className="text-white font-bold mb-3">{step.title}</h3>
                <p className="text-[#8a8a7a] text-sm font-sans leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees & Structure */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">Transparent Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a18]">Fees & structure</h2>
          </div>
          <div className="bg-white rounded-2xl border border-[#e8d5b7]/50 overflow-hidden shadow-sm">
            {fees.map((fee, i) => (
              <div
                key={fee.label}
                className={`flex items-center justify-between p-5 ${i < fees.length - 1 ? 'border-b border-[#f0ede6]' : ''}`}
              >
                <div>
                  <p className="text-[#1a1a18] font-semibold text-sm">{fee.label}</p>
                  <p className="text-[#9a9a8a] text-xs font-sans mt-0.5">{fee.note}</p>
                </div>
                <span
                  className="font-bold font-sans text-sm"
                  style={{ color: fee.value === 'Free' || fee.value === 'Included' ? '#7a9e7e' : '#1a1a18' }}
                >
                  {fee.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="py-20 px-6 bg-[#f5f0e8]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">Apply Now</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a18] mb-4">
              Start your application
            </h2>
            <p className="text-[#6a6a5a] font-sans">
              Tell us about your product. We&apos;ll respond within 14 business days with evaluation feedback.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#e8d5b7]/50 p-8 shadow-sm">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#1a1a18] text-sm font-semibold mb-1.5">Your Name</label>
                  <input type="text" className="w-full border border-[#e8d5b7] rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-[#c9a96e] transition-colors" placeholder="田中 誠" />
                </div>
                <div>
                  <label className="block text-[#1a1a18] text-sm font-semibold mb-1.5">Company / Brand</label>
                  <input type="text" className="w-full border border-[#e8d5b7] rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-[#c9a96e] transition-colors" placeholder="Tanaka Foods Co." />
                </div>
              </div>
              <div>
                <label className="block text-[#1a1a18] text-sm font-semibold mb-1.5">Email</label>
                <input type="email" className="w-full border border-[#e8d5b7] rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-[#c9a96e] transition-colors" placeholder="you@company.jp" />
              </div>
              <div>
                <label className="block text-[#1a1a18] text-sm font-semibold mb-1.5">Product Name</label>
                <input type="text" className="w-full border border-[#e8d5b7] rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-[#c9a96e] transition-colors" placeholder="Organic Uji Matcha — First Flush 2024" />
              </div>
              <div>
                <label className="block text-[#1a1a18] text-sm font-semibold mb-1.5">Product Category</label>
                <select className="w-full border border-[#e8d5b7] rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-[#c9a96e] transition-colors bg-white text-[#1a1a18]">
                  <option value="">Select category...</option>
                  <option>Tea & Matcha</option>
                  <option>Fermented Foods</option>
                  <option>Onsen & Bath</option>
                  <option>Functional Mushrooms</option>
                  <option>Seaweed & Sea Vegetables</option>
                  <option>Traditional Condiments</option>
                  <option>Wellness & Lifestyle</option>
                  <option>Experiences & Knowledge</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[#1a1a18] text-sm font-semibold mb-1.5">
                  Longevity Mechanism (how do you believe this supports healthy aging?)
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-[#e8d5b7] rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-[#c9a96e] transition-colors resize-none"
                  placeholder="Describe the active compounds, traditional use evidence, or any scientific backing..."
                ></textarea>
              </div>
              <div>
                <label className="block text-[#1a1a18] text-sm font-semibold mb-1.5">Product Website or Photos (URL)</label>
                <input type="url" className="w-full border border-[#e8d5b7] rounded-xl px-4 py-2.5 text-sm font-sans focus:outline-none focus:border-[#c9a96e] transition-colors" placeholder="https://..." />
              </div>
              <button className="w-full bg-[#1a1a18] text-[#fafaf8] py-4 rounded-full font-sans font-bold hover:bg-[#c9a96e] transition-all flex items-center justify-center gap-2">
                Submit Application
                <ArrowRight size={16} />
              </button>
              <p className="text-center text-[#9a9a8a] text-xs font-sans">
                All applications reviewed. We respond within 14 business days regardless of outcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-12 px-6 bg-[#1a1a18]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '100%', label: 'Japan-origin verified' },
              { value: '15–20%', label: 'Fair commission rate' },
              { value: '40+', label: 'Countries we ship to' },
              { value: '14 days', label: 'Application review time' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-[#c9a96e] text-2xl font-bold font-sans mb-1">{stat.value}</div>
                <div className="text-[#6a6a5a] text-xs font-sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
