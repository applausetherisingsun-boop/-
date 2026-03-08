'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink } from 'lucide-react';

type Tab = 'shopify' | 'japan';

// ── Shopify Products ──────────────────────────────────────────────────────────
// Replace shopifyUrl with your actual Shopify product URLs.
const SHOPIFY_PRODUCTS = [
  {
    id: 'sh1',
    kanji: '豆',
    name_en: 'Natto Starter Culture',
    name_ja: '納豆スターターカルチャー',
    origin_en: 'Ibaraki Prefecture',
    origin_ja: '茨城県',
    desc_en: 'Bacillus subtilis natto culture for home fermentation. Packed with nattokinase, vitamin K2, and longevity-linked Bifidobacterium strains.',
    desc_ja: '自宅発酵用バチルス・ナットー菌。ナットウキナーゼ・ビタミンK2・長寿関連ビフィズス菌を含む。',
    axes: ['Gut', 'Inflammation'],
    axes_ja: ['腸内', '炎症'],
    price: '$34',
    score: 94,
    shopifyUrl: 'https://YOUR-SHOPIFY-STORE.myshopify.com/products/natto-starter',
  },
  {
    id: 'sh2',
    kanji: '茶',
    name_en: 'Ceremonial Grade Matcha',
    name_ja: '抹茶（宇治産・最高級）',
    origin_en: 'Uji, Kyoto',
    origin_ja: '京都・宇治',
    desc_en: 'First-harvest shade-grown tencha, stone-ground. High EGCG activates AMPK; L-theanine supports alpha-wave focus without caffeine crash.',
    desc_ja: '一番茶・遮光栽培・石臼挽き。高濃度EGCGがAMPKを活性化。L-テアニンがカフェインクラッシュなしにα波集中を促進。',
    axes: ['Neural', 'Metabolic'],
    axes_ja: ['神経', '代謝'],
    price: '$58',
    score: 91,
    shopifyUrl: 'https://YOUR-SHOPIFY-STORE.myshopify.com/products/ceremonial-matcha',
  },
  {
    id: 'sh3',
    kanji: '湯',
    name_en: 'Hinoki Bath Salt Blend',
    name_ja: '檜風呂塩ブレンド',
    origin_en: 'Kiso Valley, Nagano',
    origin_ja: '長野・木曽谷',
    desc_en: 'Onsen-inspired thermal bath with Japanese cypress extract. Heat stress activates HSP70 and promotes mitochondrial biogenesis.',
    desc_ja: '温泉体験を自宅で。檜エキスで熱ストレスがHSP70を活性化し、ミトコンドリア新生を促進。',
    axes: ['Metabolic', 'Neural'],
    axes_ja: ['代謝', '神経'],
    price: '$42',
    score: 88,
    shopifyUrl: 'https://YOUR-SHOPIFY-STORE.myshopify.com/products/hinoki-bath-salt',
  },
  {
    id: 'sh4',
    kanji: '菌',
    name_en: 'Aged Hatcho Miso (3-Year)',
    name_ja: '三年熟成八丁味噌',
    origin_en: 'Okazaki, Aichi',
    origin_ja: '愛知県・岡崎',
    desc_en: 'Unpasteurized 3-year barrel-aged miso. Live lactobacillus, high isoflavones, demonstrated effects on gut diversity and hormone balance.',
    desc_ja: '非加熱・樽仕込み3年熟成。生乳酸菌・高濃度イソフラボン・腸内多様性とホルモンバランスへの効果が実証済み。',
    axes: ['Gut', 'Inflammation'],
    axes_ja: ['腸内', '炎症'],
    price: '$28',
    score: 96,
    shopifyUrl: 'https://YOUR-SHOPIFY-STORE.myshopify.com/products/hatcho-miso',
  },
];

// ── Japan Affiliate Products ──────────────────────────────────────────────────
// Replace amazonUrl / rakutenUrl with your actual affiliate links.
const JAPAN_PRODUCTS = [
  {
    id: 'jp1',
    kanji: '豆',
    name_en: 'Freeze-Dried Natto (Miyagino)',
    name_ja: '宮城野凍結乾燥納豆',
    origin_en: 'Miyagi Prefecture',
    origin_ja: '宮城県',
    desc_en: 'Premium freeze-dried natto retaining full nattokinase activity. No refrigeration needed — perfect for travel.',
    desc_ja: 'ナットウキナーゼ活性を完全保持したフリーズドライ納豆。冷蔵不要で旅行にも最適。',
    axes_en: ['Gut', 'Inflammation'],
    axes_ja: ['腸内', '炎症'],
    price_ja: '¥2,980',
    platforms: [
      { name: 'Amazon', url: 'https://www.amazon.co.jp/dp/ASIN-PLACEHOLDER/?tag=YOUR-AFFILIATE-TAG', color: '#FF9900' },
      { name: '楽天', url: 'https://item.rakuten.co.jp/STORE/ITEM-PLACEHOLDER/?scid=YOUR-RAKUTEN-TAG', color: '#BF0000' },
    ],
  },
  {
    id: 'jp2',
    kanji: '茶',
    name_en: 'Uji Matcha Powder (100g)',
    name_ja: '宇治抹茶パウダー 100g',
    origin_en: 'Uji, Kyoto',
    origin_ja: '京都・宇治',
    desc_en: 'Authentic ceremonial-grade matcha sourced directly from Uji farms. Tested for pesticides and heavy metals.',
    desc_ja: '宇治の茶農家から直仕入れの本物の抹茶。農薬・重金属検査済み。',
    axes_en: ['Neural', 'Metabolic'],
    axes_ja: ['神経', '代謝'],
    price_ja: '¥3,500',
    platforms: [
      { name: 'Amazon', url: 'https://www.amazon.co.jp/dp/ASIN-PLACEHOLDER/?tag=YOUR-AFFILIATE-TAG', color: '#FF9900' },
      { name: '楽天', url: 'https://item.rakuten.co.jp/STORE/ITEM-PLACEHOLDER/?scid=YOUR-RAKUTEN-TAG', color: '#BF0000' },
    ],
  },
  {
    id: 'jp3',
    kanji: '菌',
    name_en: 'Amazake (Fermented Rice Drink)',
    name_ja: '甘酒（無添加・米糀仕込み）',
    origin_en: 'Niigata Prefecture',
    origin_ja: '新潟県',
    desc_en: 'Zero-alcohol, zero-sugar amazake brewed from rice koji. Rich in B vitamins, glucose, and gut-feeding oligosaccharides.',
    desc_ja: 'ノンアルコール・無糖の米糀仕込み甘酒。ビタミンB群・ブドウ糖・腸内育成オリゴ糖が豊富。',
    axes_en: ['Gut', 'Metabolic'],
    axes_ja: ['腸内', '代謝'],
    price_ja: '¥1,200',
    platforms: [
      { name: 'Amazon', url: 'https://www.amazon.co.jp/dp/ASIN-PLACEHOLDER/?tag=YOUR-AFFILIATE-TAG', color: '#FF9900' },
      { name: '楽天', url: 'https://item.rakuten.co.jp/STORE/ITEM-PLACEHOLDER/?scid=YOUR-RAKUTEN-TAG', color: '#BF0000' },
    ],
  },
  {
    id: 'jp4',
    kanji: '海',
    name_en: 'Naruto Wakame Seaweed',
    name_ja: '鳴門わかめ（天然乾燥）',
    origin_en: 'Naruto, Tokushima',
    origin_ja: '徳島県・鳴門',
    desc_en: 'Wild-harvested Naruto wakame, sun-dried with no additives. Fucoidan fraction shows anti-inflammatory and metabolic benefits.',
    desc_ja: '天然採取・天日干し・無添加の鳴門わかめ。フコイダン成分が抗炎症・代謝改善効果を発揮。',
    axes_en: ['Inflammation', 'Metabolic'],
    axes_ja: ['炎症', '代謝'],
    price_ja: '¥2,200',
    platforms: [
      { name: 'Amazon', url: 'https://www.amazon.co.jp/dp/ASIN-PLACEHOLDER/?tag=YOUR-AFFILIATE-TAG', color: '#FF9900' },
      { name: '楽天', url: 'https://item.rakuten.co.jp/STORE/ITEM-PLACEHOLDER/?scid=YOUR-RAKUTEN-TAG', color: '#BF0000' },
    ],
  },
  {
    id: 'jp5',
    kanji: '茸',
    name_en: 'Reishi Mushroom Extract (Dual)',
    name_ja: '霊芝デュアルエキス（水・アルコール抽出）',
    origin_en: 'Niigata Prefecture',
    origin_ja: '新潟県',
    desc_en: 'Water + alcohol dual-extracted reishi. Triterpenes regulate cortisol; beta-glucans boost NK cell activity.',
    desc_ja: '水とアルコールのデュアル抽出。トリテルペンがコルチゾール調節、βグルカンがNK細胞活性を高める。',
    axes_en: ['Neural', 'Inflammation'],
    axes_ja: ['神経', '炎症'],
    price_ja: '¥4,800',
    platforms: [
      { name: 'Amazon', url: 'https://www.amazon.co.jp/dp/ASIN-PLACEHOLDER/?tag=YOUR-AFFILIATE-TAG', color: '#FF9900' },
      { name: '楽天', url: 'https://item.rakuten.co.jp/STORE/ITEM-PLACEHOLDER/?scid=YOUR-RAKUTEN-TAG', color: '#BF0000' },
    ],
  },
  {
    id: 'jp6',
    kanji: '禅',
    name_en: 'Bamboo Meditation Cushion (Zafu)',
    name_ja: '竹製座蒲（禅・瞑想用）',
    origin_en: 'Kyoto Craft',
    origin_ja: '京都・職人手作り',
    desc_en: 'Handcrafted zafu cushion from Kyoto artisans. Proper seated posture reduces lumbar strain and sustains longer meditation sessions.',
    desc_ja: '京都職人による手作り座蒲。正しい座位が腰部負荷を軽減し、瞑想の継続時間を延ばす。',
    axes_en: ['Neural', 'Social'],
    axes_ja: ['神経', '社会'],
    price_ja: '¥8,500',
    platforms: [
      { name: 'Amazon', url: 'https://www.amazon.co.jp/dp/ASIN-PLACEHOLDER/?tag=YOUR-AFFILIATE-TAG', color: '#FF9900' },
      { name: '楽天', url: 'https://item.rakuten.co.jp/STORE/ITEM-PLACEHOLDER/?scid=YOUR-RAKUTEN-TAG', color: '#BF0000' },
    ],
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

export default function ShopPage() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';
  const [tab, setTab] = useState<Tab>('shopify');

  return (
    <div className="min-h-screen" style={{ background: '#faf8f4', color: '#1c1917' }}>

      {/* ── HEADER ── */}
      <div className="pt-32 pb-16 px-8 text-center" style={{ background: '#1c1917' }}>
        <p className="font-sans text-[9px] tracking-[0.45em] uppercase mb-6" style={{ color: '#a8895a' }}>
          {isEn ? 'Shop · Affiliate' : 'ショップ · アフィリエイト'}
        </p>
        <h1 className="font-serif font-light leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#faf8f4' }}>
          {isEn
            ? <>Science-backed products<br /><span className="italic" style={{ color: '#a8895a' }}>from Japan to the world.</span></>
            : <>科学的根拠のある商品を<br /><span className="italic" style={{ color: '#a8895a' }}>日本から世界へ。</span></>}
        </h1>
        <p className="font-serif font-light text-lg max-w-xl mx-auto" style={{ color: '#7a7065' }}>
          {isEn
            ? 'Every product is selected for its measurable impact on the 6 longevity axes.'
            : '全商品が6つの長寿軸に対する実測可能な効果で選ばれています。'}
        </p>
      </div>

      {/* ── TAB SWITCHER ── */}
      <div className="sticky top-16 z-30 border-b" style={{ background: '#faf8f4', borderColor: '#e8e0d0' }}>
        <div className="max-w-6xl mx-auto px-8 flex">
          {([
            { key: 'shopify' as Tab, en: 'SHIROKUMA Shop', ja: 'SHIROKUMAショップ', sub: isEn ? 'Ship worldwide · Shopify' : '世界発送 · Shopify' },
            { key: 'japan'   as Tab, en: 'Japan Picks', ja: '日本セレクト', sub: isEn ? 'Amazon JP · Rakuten' : 'Amazon JP · 楽天' },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex flex-col items-start py-5 pr-10 transition-all duration-300"
              style={{ borderBottom: tab === t.key ? '2px solid #a8895a' : '2px solid transparent', marginBottom: '-1px' }}
            >
              <span className="font-sans text-xs tracking-[0.2em] uppercase font-medium" style={{ color: tab === t.key ? '#1c1917' : '#7a7065' }}>
                {isEn ? t.en : t.ja}
              </span>
              <span className="font-sans text-[9px] mt-0.5" style={{ color: '#c4b49a' }}>{t.sub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── SHOPIFY TAB ── */}
      {tab === 'shopify' && (
        <div className="max-w-6xl mx-auto px-8 py-16">

          <div className="mb-10 flex items-center gap-4">
            <div className="w-8 h-px" style={{ background: '#c4b49a' }}></div>
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase" style={{ color: '#a8895a' }}>
              {isEn ? 'Exclusive items · Global shipping' : '限定商品 · 世界発送'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#e8e0d0' }}>
            {SHOPIFY_PRODUCTS.map((p) => (
              <div key={p.id} className="flex flex-col group" style={{ background: '#faf8f4' }}>
                {/* image area */}
                <div
                  className="h-48 flex items-center justify-center border-b"
                  style={{ background: '#f5f0e8', borderColor: '#e8e0d0' }}
                >
                  <span className="font-serif text-6xl font-light" style={{ color: '#c4b49a' }}>{p.kanji}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {(isEn ? p.axes : p.axes_ja).map((a) => (
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
                    <span className="font-serif font-light text-lg" style={{ color: '#1c1917' }}>{p.price}</span>
                    <a
                      href={p.shopifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.15em] uppercase px-4 py-2 transition-all duration-300"
                      style={{ background: '#1c1917', color: '#faf8f4' }}
                    >
                      {isEn ? 'Buy Now' : '購入する'}
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Powered by Shopify badge */}
          <div className="mt-8 text-center">
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: '#c4b49a' }}>
              {isEn ? 'Secure checkout powered by Shopify · Ships worldwide' : 'Shopify決済 · セキュア · 世界発送'}
            </p>
          </div>
        </div>
      )}

      {/* ── JAPAN PICKS TAB ── */}
      {tab === 'japan' && (
        <div className="max-w-6xl mx-auto px-8 py-16">

          {/* notice */}
          <div className="mb-10 border-l-2 pl-5 py-1" style={{ borderColor: '#a8895a' }}>
            <p className="font-sans text-xs leading-relaxed" style={{ color: '#7a7065' }}>
              {isEn
                ? 'These products are available on Amazon Japan and Rakuten. Links may be affiliate links — we may earn a small commission at no extra cost to you. All products are hand-selected against SHIROKUMA\'s 6-axis framework.'
                : '以下の商品はAmazon.co.jpおよび楽天市場で購入できます。アフィリエイトリンクを含む場合があります（購入者への追加費用は一切ありません）。全商品はSHIROKUMAの6軸基準で厳選されています。'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e8e0d0' }}>
            {JAPAN_PRODUCTS.map((p) => (
              <div key={p.id} className="flex flex-col group" style={{ background: '#faf8f4' }}>
                {/* image area */}
                <div
                  className="h-40 flex items-center justify-center border-b"
                  style={{ background: '#f5f0e8', borderColor: '#e8e0d0' }}
                >
                  <span className="font-serif text-5xl font-light" style={{ color: '#c4b49a' }}>{p.kanji}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
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

                  {/* platform buttons */}
                  <div className="flex gap-2 flex-wrap mt-auto">
                    {p.platforms.map((pl) => (
                      <a
                        key={pl.name}
                        href={pl.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.1em] uppercase px-4 py-2 transition-all duration-300 hover:opacity-80"
                        style={{ background: pl.color, color: '#fff' }}
                      >
                        {pl.name}
                        <ExternalLink size={9} />
                      </a>
                    ))}
                    <span className="font-serif font-light text-base ml-auto self-center" style={{ color: '#a8895a' }}>
                      {p.price_ja}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ color: '#c4b49a' }}>
              {isEn ? '※ Affiliate disclosure · Amazon Associates / Rakuten Affiliate' : '※ アフィリエイト開示 · Amazonアソシエイト / 楽天アフィリエイト'}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
