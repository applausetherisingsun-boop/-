'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';

type StoreKey = 'all' | 'becos' | 'musubi';

// ── Partner Stores ────────────────────────────────────────────────────────────
const STORES = [
  {
    key: 'becos' as StoreKey,
    name: 'BECOS',
    tagline_en: 'Beautiful Crafts Online Store',
    tagline_ja: '美しい工芸品オンラインストア',
    desc_en: '4,000+ made-in-Japan items. Every product visited in person at the artisan\'s workshop.',
    desc_ja: '4,000点以上のメイドインジャパン商品。職人の工房に直接足を運んで厳選。',
    commission: '10%',
    platform: 'Direct',
    affiliateUrl: 'https://en.thebecos.com/pages/become-a-becos-affiliate',
    storeUrl: 'https://en.thebecos.com/',
    color: '#2a4a7f',
    kanji: '藍',
  },
  {
    key: 'musubi' as StoreKey,
    name: 'Musubi Kiln',
    tagline_en: 'Live Well with Japanese Crafts',
    tagline_ja: '日本の工芸品と豊かに暮らす',
    desc_en: 'Curated Japanese tableware and lifestyle items from artisans across Japan. Ships worldwide.',
    desc_ja: '全国の職人から厳選した食器・生活道具。世界発送対応。',
    commission: '10%',
    platform: 'Awin',
    affiliateUrl: 'https://ui.awin.com/merchant-profile/80050',
    storeUrl: 'https://musubikiln.com/',
    color: '#5a6e3a',
    kanji: '結',
  },
];

// ── Curated Products ──────────────────────────────────────────────────────────
// TODO: Replace product URLs with your affiliate-tagged links after joining each program.
const CRAFT_PRODUCTS = [
  {
    id: 'c1',
    store: 'musubi' as StoreKey,
    kanji: '鉄',
    name_en: 'Nambu Ironware Teapot (Tetsubin)',
    name_ja: '南部鉄器 鉄瓶',
    origin_en: 'Morioka, Iwate',
    origin_ja: '岩手県・盛岡',
    desc_en: 'Cast iron tetsubin from Iwate\'s 400-year tradition. Enriches water with iron ions, raises boiling point perception, and brings meditative ritual to tea preparation.',
    desc_ja: '400年の歴史を持つ岩手の南部鉄器。鉄イオンで水を豊かにし、茶の湯の瞑想的儀式を日常に。',
    axes_en: ['Metabolic', 'Neural'],
    axes_ja: ['代謝', '神経'],
    price_range: '¥15,000~',
    url: 'https://musubikiln.com/collections/nambu-ironware',
  },
  {
    id: 'c2',
    store: 'becos' as StoreKey,
    kanji: '漆',
    name_en: 'Echizen Lacquerware Bowl Set',
    name_ja: '越前漆器 汁椀セット',
    origin_en: 'Echizen, Fukui',
    origin_ja: '福井県・越前',
    desc_en: 'Urushi lacquerware with 1,500-year history. Antimicrobial coating, thermal insulation, and the daily ritual of hand-washing mindfulness.',
    desc_ja: '1500年の歴史を持つ越前漆器。抗菌コーティング・断熱性、手洗いのマインドフルネスを日常に。',
    axes_en: ['Gut', 'Social'],
    axes_ja: ['腸内', '社会'],
    price_range: '¥8,000~',
    url: 'https://en.thebecos.com/collections/lacquerware',
  },
  {
    id: 'c3',
    store: 'musubi' as StoreKey,
    kanji: '焼',
    name_en: 'Bizen-yaki Yunomi Teacup',
    name_ja: '備前焼 湯呑',
    origin_en: 'Bizen, Okayama',
    origin_ja: '岡山県・備前',
    desc_en: 'Unglazed Bizen pottery, fired for 2 weeks at 1,300°C. Micro-porous surface is said to mellow the taste of water and tea — still studied for mineral interactions.',
    desc_ja: '無釉の備前焼、1300℃で2週間焼成。微多孔表面が水と茶の味をまろやかにするとされ、ミネラル相互作用として研究中。',
    axes_en: ['Gut', 'Social'],
    axes_ja: ['腸内', '社会'],
    price_range: '¥5,000~',
    url: 'https://musubikiln.com/collections/bizen-yaki',
  },
  {
    id: 'c5',
    store: 'becos' as StoreKey,
    kanji: '切',
    name_en: 'Edo-Kiriko Crystal Glass',
    name_ja: '江戸切子グラス',
    origin_en: 'Tokyo (Edo)',
    origin_ja: '東京（江戸）',
    desc_en: 'Traditional Edo-period cut crystal. The ritual of choosing a beautiful vessel elevates the act of drinking water — a daily mindfulness anchor.',
    desc_ja: '江戸時代から続く切子ガラス。美しい器を選ぶ儀式が日々の水を飲む行為を意識的なマインドフルネスへと昇華させる。',
    axes_en: ['Neural', 'Social'],
    axes_ja: ['神経', '社会'],
    price_range: '¥12,000~',
    url: 'https://en.thebecos.com/collections/edo-kiriko',
  },
  {
    id: 'c9',
    store: 'becos' as StoreKey,
    kanji: '箸',
    name_en: 'Wakasa-nuri Lacquer Chopsticks',
    name_ja: '若狭塗 箸（金箔仕上げ）',
    origin_en: 'Obama, Fukui',
    origin_ja: '福井県・小浜',
    desc_en: 'Hand-polished Wakasa-nuri chopsticks inlaid with eggshell and gold leaf. The act of mindful eating with beautiful utensils slows consumption — a natural hara hachi bu tool.',
    desc_ja: '卵殻と金箔を象嵌した若狭塗箸。美しい器での意識的な食事は摂食速度を自然に遅らせ、腹八分目を補助する道具となる。',
    axes_en: ['Gut', 'Metabolic'],
    axes_ja: ['腸内', '代謝'],
    price_range: '¥3,500~',
    url: 'https://en.thebecos.com/collections/chopsticks',
  },
];

const AXIS_COLORS: Record<string, string> = {
  Gut: '#7a9e7e', '腸内': '#7a9e7e',
  Inflammation: '#e07b54', '炎症': '#e07b54',
  Neural: '#7b68ee', '神経': '#7b68ee',
  Metabolic: '#e8a838', '代謝': '#e8a838',
  Hormonal: '#3d5a80', 'ホルモン': '#3d5a80',
  Social: '#c9a96e', '社会': '#c9a96e',
};

export default function CraftsPage() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [activeStore, setActiveStore] = useState<StoreKey>('all');

  const filtered = activeStore === 'all'
    ? CRAFT_PRODUCTS
    : CRAFT_PRODUCTS.filter((p) => p.store === activeStore);

  return (
    <div className="min-h-screen" style={{ background: '#faf8f4', color: '#1c1917' }}>

      {/* ── HEADER ── */}
      <div className="pt-32 pb-20 px-8" style={{ background: '#1c1917' }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-6" style={{ color: '#a8895a' }}>
            {isEn ? 'Japanese Crafts · Affiliate Partners' : '日本工芸品 · アフィリエイトパートナー'}
          </p>
          <h1 className="font-serif font-light leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#faf8f4' }}>
            {isEn
              ? <>Objects that carry<br /><span className="italic" style={{ color: '#a8895a' }}>centuries of wisdom.</span></>
              : <>数百年の叡智を宿す<br /><span className="italic" style={{ color: '#a8895a' }}>日本工芸品。</span></>}
          </h1>
          <p className="font-serif font-light text-lg max-w-2xl" style={{ color: '#7a7065' }}>
            {isEn
              ? 'Every item is selected for its connection to Japan\'s longevity culture — the ritual, the material, the maker. Curated from two trusted partner stores.'
              : '全商品を日本の長寿文化との繋がりで選定——儀式・素材・作り手。2つの信頼できるパートナーストアから厳選。'}
          </p>
        </div>
      </div>

      {/* ── PARTNER STORES ── */}
      <div className="py-16 px-8 border-b" style={{ background: '#f5f0e8', borderColor: '#e8e0d0' }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-sans text-[9px] tracking-[0.35em] uppercase mb-10" style={{ color: '#a8895a' }}>
            {isEn ? 'Partner Stores · Affiliate Programs' : 'パートナーストア · アフィリエイト'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: '#e8e0d0' }}>
            {STORES.map((store) => (
              <div key={store.key} style={{ background: '#faf8f4' }} className="p-7 flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="font-serif text-3xl font-light"
                    style={{ color: store.color }}
                  >{store.kanji}</span>
                  <span
                    className="font-sans text-[9px] tracking-[0.2em] uppercase px-2 py-1 border"
                    style={{ color: store.color, borderColor: `${store.color}40` }}
                  >
                    {store.commission}
                  </span>
                </div>
                <h3 className="font-sans text-sm font-semibold tracking-wide mb-1" style={{ color: '#1c1917' }}>
                  {store.name}
                </h3>
                <p className="font-sans text-[10px] tracking-[0.1em] mb-3" style={{ color: '#c4b49a' }}>
                  {isEn ? store.tagline_en : store.tagline_ja}
                </p>
                <p className="font-sans text-xs leading-relaxed mb-5 flex-1" style={{ color: '#7a7065' }}>
                  {isEn ? store.desc_en : store.desc_ja}
                </p>
                <div className="flex gap-2 mt-auto">
                  <a
                    href={store.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-sans text-[9px] tracking-[0.15em] uppercase px-3 py-2 border transition-colors"
                    style={{ borderColor: '#c4b49a', color: '#7a7065' }}
                  >
                    {isEn ? 'Visit' : '訪問'} <ExternalLink size={9} />
                  </a>
                  <a
                    href={store.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-sans text-[9px] tracking-[0.15em] uppercase px-3 py-2 transition-colors"
                    style={{ background: store.color, color: '#faf8f4' }}
                  >
                    {isEn ? 'Join Affiliate' : '提携する'} <ExternalLink size={9} />
                  </a>
                </div>
                <p className="font-sans text-[8px] mt-2" style={{ color: '#c4b49a' }}>
                  via {store.platform}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ── */}
      <div className="sticky top-16 z-30 border-b px-8 py-4" style={{ background: '#faf8f4/95', borderColor: '#e8e0d0' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 items-center">
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase mr-2" style={{ color: '#c4b49a' }}>
            {isEn ? 'Filter:' : '絞り込み:'}
          </span>
          {([{ key: 'all' as StoreKey, label: isEn ? 'All Stores' : 'すべて' }] as { key: StoreKey; label: string }[])
            .concat(STORES.map((s) => ({ key: s.key, label: s.name })))
            .map((f) => {
              const store = STORES.find((s) => s.key === f.key);
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveStore(f.key)}
                  className="font-sans text-[10px] tracking-[0.1em] uppercase px-4 py-1.5 transition-all duration-200"
                  style={{
                    background: activeStore === f.key ? (store?.color ?? '#1c1917') : 'transparent',
                    color: activeStore === f.key ? '#faf8f4' : '#7a7065',
                    border: `1px solid ${activeStore === f.key ? (store?.color ?? '#1c1917') : '#e8e0d0'}`,
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          <span className="font-sans text-[9px] ml-auto" style={{ color: '#c4b49a' }}>
            {filtered.length} {isEn ? 'items' : '点'}
          </span>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e8e0d0' }}>
          {filtered.map((p) => {
            const store = STORES.find((s) => s.key === p.store)!;
            return (
              <div key={p.id} className="flex flex-col" style={{ background: '#faf8f4' }}>
                {/* image area */}
                <div
                  className="h-44 flex flex-col items-center justify-center border-b relative"
                  style={{ background: '#f5f0e8', borderColor: '#e8e0d0' }}
                >
                  <span className="font-serif text-5xl font-light mb-2" style={{ color: '#c4b49a' }}>{p.kanji}</span>
                  {/* store badge */}
                  <span
                    className="absolute top-3 left-3 font-sans text-[8px] tracking-[0.15em] uppercase px-2 py-1"
                    style={{ background: store.color, color: '#faf8f4' }}
                  >
                    {store.name}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* axis tags */}
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {(isEn ? p.axes_en : p.axes_ja).map((a) => (
                      <span
                        key={a}
                        className="font-sans text-[9px] tracking-[0.1em] px-2 py-0.5 rounded-full"
                        style={{ color: AXIS_COLORS[a] ?? '#a8895a', background: `${AXIS_COLORS[a] ?? '#a8895a'}15` }}
                      >{a}</span>
                    ))}
                  </div>

                  <h3 className="font-serif font-light text-base leading-snug mb-1" style={{ color: '#1c1917' }}>
                    {isEn ? p.name_en : p.name_ja}
                  </h3>
                  <p className="font-sans text-[9px] tracking-[0.15em] uppercase mb-3" style={{ color: '#c4b49a' }}>
                    {isEn ? p.origin_en : p.origin_ja}
                  </p>
                  <p className="font-sans text-xs leading-relaxed mb-5 flex-1" style={{ color: '#7a7065' }}>
                    {isEn ? p.desc_en : p.desc_ja}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-serif font-light text-base" style={{ color: '#a8895a' }}>{p.price_range}</span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.15em] uppercase px-4 py-2 transition-all duration-300"
                      style={{ background: store.color, color: '#faf8f4' }}
                    >
                      {isEn ? 'Shop' : '購入'} <ExternalLink size={9} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* affiliate disclosure */}
        <div className="mt-12 border-t pt-8 text-center" style={{ borderColor: '#e8e0d0' }}>
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase mb-2" style={{ color: '#c4b49a' }}>
            {isEn ? '※ Affiliate Disclosure' : '※ アフィリエイト開示'}
          </p>
          <p className="font-sans text-xs max-w-2xl mx-auto leading-relaxed" style={{ color: '#7a7065' }}>
            {isEn
              ? 'Some links on this page are affiliate links. We may earn a commission when you make a purchase — at no additional cost to you. We only feature products that align with SHIROKUMA\'s 6-axis longevity framework.'
              : 'このページの一部リンクはアフィリエイトリンクです。購入時に手数料を受け取る場合がありますが、購入者への追加費用は一切ありません。SHIROKUMAの6軸長寿フレームワークに合致する商品のみを掲載しています。'}
          </p>
        </div>
      </div>

    </div>
  );
}
