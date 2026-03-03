'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Star } from 'lucide-react';

type AxisKey = 'all' | 'inflammation' | 'gut' | 'neural' | 'metabolic' | 'hormonal' | 'social';

const FILTER_AXES: { key: AxisKey; label: string; icon: string; color: string }[] = [
  { key: 'all', label: 'All', icon: '✦', color: '#1a1a18' },
  { key: 'inflammation', label: 'Inflammation', icon: '🔥', color: '#e07b54' },
  { key: 'gut', label: 'Gut', icon: '🦠', color: '#7a9e7e' },
  { key: 'neural', label: 'Neural', icon: '🧠', color: '#7b68ee' },
  { key: 'metabolic', label: 'Metabolic', icon: '⚡', color: '#e8a838' },
  { key: 'hormonal', label: 'Hormonal', icon: '🌙', color: '#3d5a80' },
  { key: 'social', label: 'Social', icon: '🤝', color: '#c9a96e' },
];

const PRODUCTS = [
  {
    id: 1, name: 'Premium Natto Starter Culture', origin: 'Mito, Ibaraki', price: 34,
    axes: ['gut', 'inflammation'],
    tag: 'Fermented · Vitamin K2 · Nattokinase · Bifidobacterium',
    emoji: '🫘', score: 94, certified: true,
    desc: 'Bacillus subtilis natto culture for home fermentation. Contains nattokinase (cardiovascular), vitamin K2 (bone/arterial), and seeded Bifidobacterium. One of Japan\'s most studied longevity foods.',
    badges: ['Lab-tested', 'Organic substrate'],
  },
  {
    id: 2, name: 'Ceremonial Grade Matcha', origin: 'Uji, Kyoto', price: 58,
    axes: ['neural', 'metabolic'],
    tag: 'L-Theanine · EGCG · Shade-grown · First flush',
    emoji: '🍵', score: 91, certified: true,
    desc: 'First-harvest shade-grown tencha, stone-ground to preserve EGCG polyphenol concentration. L-theanine promotes alpha-wave states, EGCG activates AMPK and supports mitochondrial function.',
    badges: ['Third-party tested', 'Pesticide-free'],
  },
  {
    id: 3, name: 'Hinoki Bath Salt Blend', origin: 'Kiso Valley, Nagano', price: 42,
    axes: ['metabolic', 'neural'],
    tag: 'HSP activation · Hinoki extract · Thermal stress',
    emoji: '♨️', score: 88, certified: true,
    desc: 'Onsen-inspired thermal bath experience using Japanese cypress (hinoki) essential oil. Heat stress activates HSP70 and promotes mitochondrial biogenesis — the mechanism behind onsen longevity.',
    badges: ['Sustainably harvested', 'No synthetic fragrance'],
  },
  {
    id: 4, name: 'Aged Miso (3-Year Hatcho)', origin: 'Okazaki, Aichi', price: 28,
    axes: ['gut', 'inflammation'],
    tag: 'Isoflavones · Unpasteurized · Live cultures',
    emoji: '🍲', score: 96, certified: true,
    desc: 'Traditionally brewed 3-year aged miso from Okazaki. Unpasteurized to preserve live lactobacillus. High in isoflavones with demonstrated effects on menopausal hormone levels and gut diversity.',
    badges: ['Unpasteurized', 'Traditional cedar barrel'],
  },
  {
    id: 5, name: 'Wakame & Kombu Seaweed Set', origin: 'Naruto, Tokushima', price: 36,
    axes: ['metabolic', 'inflammation'],
    tag: 'Iodine · Fucoidan · Prebiotic fiber',
    emoji: '🌿', score: 89, certified: true,
    desc: 'Sustainably harvested Naruto wakame and Rishiri kombu. Fucoidan from brown seaweed shows anti-inflammatory and anti-angiogenic properties. Natural iodine supports thyroid and metabolic function.',
    badges: ['Wild-harvested', 'No chemicals'],
  },
  {
    id: 6, name: 'Reishi Mushroom Extract', origin: 'Niigata Prefecture', price: 65,
    axes: ['neural', 'inflammation', 'hormonal'],
    tag: 'Triterpenes · Beta-glucans · Adaptogenic',
    emoji: '🍄', score: 87, certified: true,
    desc: 'Dual-extracted (water + alcohol) reishi (Ganoderma lucidum) from log-grown cultivation. Triterpenes modulate cortisol response; beta-glucans support NK cell activity and immune regulation.',
    badges: ['Dual extract', 'COA verified'],
  },
  {
    id: 7, name: 'Black Sesame & Walnut Paste', origin: 'Kyoto Blend', price: 22,
    axes: ['hormonal', 'neural'],
    tag: 'Sesamol · Omega-3 · Melatonin precursors',
    emoji: '🫙', score: 83, certified: false,
    desc: 'Traditional Japanese goma paste blended with walnut. Sesame lignans support estrogen metabolism and antioxidant activity. Walnut omega-3 and tryptophan provide melatonin pathway support.',
    badges: ['Stone-ground', 'No additives'],
  },
  {
    id: 8, name: 'Ginger & Yuzu Fermented Tonic', origin: 'Kochi Prefecture', price: 48,
    axes: ['inflammation', 'gut'],
    tag: '6-Gingerol · Limonene · Probiotic base',
    emoji: '🍋', score: 85, certified: false,
    desc: 'Lacto-fermented ginger with yuzu citrus. Gingerols inhibit COX-2 (same pathway as ibuprofen, naturally). Yuzu limonene elevates adiponectin. Fermented base delivers live cultures.',
    badges: ['Live cultures', 'Kochi yuzu'],
  },
  {
    id: 9, name: 'Silk Protein Sleep Mask', origin: 'Kyoto Nishijin', price: 78,
    axes: ['hormonal', 'neural'],
    tag: 'Blue light block · Silk sericin · Sleep onset',
    emoji: '😴', score: 80, certified: false,
    desc: 'Woven from Kyoto Nishijin silk with 100% blackout capacity. Silk sericin has been shown in studies to enhance slow-wave sleep. Designed for circadian light management and melatonin preservation.',
    badges: ['Pure silk', 'Nishijin weave'],
  },
];

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState<AxisKey>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = PRODUCTS.filter((p) => {
    const matchesAxis = activeFilter === 'all' || p.axes.includes(activeFilter);
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAxis && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fafaf8] pt-24">
      {/* Header */}
      <div className="bg-[#1a1a18] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">Certified Marketplace</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Products scored<br />by the 6 axes
          </h1>
          <p className="text-[#8a8a7a] font-sans text-lg max-w-2xl">
            Every product is evaluated against SHIROKUMA&apos;s 6-axis framework. Only those with demonstrated
            mechanisms on at least one longevity axis are listed.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-[#fafaf8]/95 backdrop-blur-md border-b border-[#e8d5b7]/50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9a8a]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e8d5b7] rounded-full text-sm font-sans focus:outline-none focus:border-[#c9a96e] transition-colors"
            />
          </div>
          {/* Axis filters */}
          <div className="flex flex-wrap gap-2">
            {FILTER_AXES.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeFilter === f.key ? f.color : 'transparent',
                  color: activeFilter === f.key ? '#fafaf8' : '#6a6a5a',
                  border: `1.5px solid ${activeFilter === f.key ? f.color : '#e8d5b7'}`,
                }}
              >
                <span>{f.icon}</span>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#6a6a5a] text-sm font-sans">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
          <div className="flex items-center gap-2 text-[#9a9a8a] text-xs font-sans">
            <SlidersHorizontal size={14} />
            Sorted by axis score
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const primaryAxisColor = FILTER_AXES.find((f) => f.key === product.axes[0])?.color ?? '#c9a96e';
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#e8d5b7]/50 hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                {/* Image area */}
                <div
                  className="h-44 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${primaryAxisColor}10, ${primaryAxisColor}05)` }}
                >
                  <span className="text-6xl">{product.emoji}</span>
                  {product.certified && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#7a9e7e] text-white text-[10px] font-sans font-bold px-2 py-1 rounded-full">
                      <Star size={10} fill="white" />
                      CERTIFIED
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Axis tags */}
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {product.axes.map((axisKey) => {
                      const axisData = FILTER_AXES.find((f) => f.key === axisKey);
                      return axisData ? (
                        <span
                          key={axisKey}
                          className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-full"
                          style={{ color: axisData.color, backgroundColor: `${axisData.color}15` }}
                        >
                          {axisData.icon} {axisData.label}
                        </span>
                      ) : null;
                    })}
                  </div>

                  <h3 className="font-bold text-[#1a1a18] mb-1 leading-tight">{product.name}</h3>
                  <p className="text-[#9a9a8a] text-xs font-sans mb-3">{product.origin}</p>
                  <p className="text-[#6a6a5a] text-sm font-sans leading-relaxed mb-4 flex-1">{product.desc}</p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.badges.map((b) => (
                      <span key={b} className="text-[10px] font-sans bg-[#f5f0e8] text-[#7a6a5a] px-2 py-0.5 rounded">
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Score + Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-[#f0ede6] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${product.score}%`, backgroundColor: primaryAxisColor }}
                        ></div>
                      </div>
                      <span className="text-xs font-sans font-bold" style={{ color: primaryAxisColor }}>
                        {product.score}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#1a1a18] font-sans">${product.price}</span>
                      <button className="bg-[#1a1a18] text-[#fafaf8] px-4 py-2 rounded-full text-xs font-sans font-semibold hover:bg-[#c9a96e] transition-all">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#9a9a8a] font-sans">No products found. Try adjusting your filters.</p>
          </div>
        )}

        {/* Seller CTA */}
        <div className="mt-16 bg-[#1a1a18] rounded-3xl p-10 text-center">
          <p className="text-[#c9a96e] text-xs font-sans tracking-[0.4em] uppercase mb-4">For Producers</p>
          <h3 className="text-3xl font-bold text-white mb-4">
            List your product<br />on SHIROKUMA Marketplace
          </h3>
          <p className="text-[#8a8a7a] font-sans mb-8 max-w-xl mx-auto">
            Japanese tea farmers, fermentation artisans, onsen resorts, and wellness brands —
            get your products evaluated and certified against our 6-axis framework.
          </p>
          <Link
            href="/seller"
            className="inline-block bg-[#c9a96e] text-[#1a1a18] px-8 py-3 rounded-full text-sm font-sans font-bold hover:bg-[#b8956a] transition-all"
          >
            Apply as a Seller →
          </Link>
        </div>
      </div>
    </div>
  );
}
