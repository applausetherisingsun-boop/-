import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NISHI 投資戦略 | Personal Investment Strategy',
  description: 'NISHI個人投資戦略ブリーフィング — 2035年総資産5億円達成ロードマップ',
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const portfolio = [
  {
    asset: 'BTC',
    amount: '1,450万円',
    pct: 48,
    color: '#e8a838',
    role: '長期ガチホ・デジタルゴールド',
    sub: '0.7 BTC → Ledger（金庫）　0.3 BTC → SBI VC Trade（流動性）',
  },
  {
    asset: '米国個別株',
    amount: '800万円',
    pct: 27,
    color: '#7b68ee',
    role: '楽しみ枠・攻め',
    sub: 'IONQ・NBIS・OKLO・RGTI・IREN・CCCX + 待機280万円',
  },
  {
    asset: '変額保険（AXA UL）',
    amount: '600万円',
    pct: 20,
    color: '#7a9e7e',
    role: '強制積立・守り',
    sub: '世界株式型・月10万円自動積立',
  },
  {
    asset: '現金',
    amount: '200万円',
    pct: 7,
    color: '#9a9a8a',
    role: '逆張り弾薬',
    sub: 'エントリー待機資金',
  },
];

const stocks = [
  { ticker: 'IONQ', label: '量子コンピューター', amount: '250万円', tag: 'コアガチホ', color: '#7b68ee', status: 'hold' },
  { ticker: 'NBIS', label: 'Nebius Group', amount: '130万円', tag: '衛星→IONQ統合予定', color: '#c9a96e', status: 'watch' },
  { ticker: 'OKLO', label: '次世代原子力・AI電力', amount: '50万円', tag: '中期保有', color: '#e07b54', status: 'hold' },
  { ticker: 'RGTI', label: '量子', amount: '40万円', tag: '中期保有', color: '#7a9e7e', status: 'hold' },
  { ticker: 'IREN', label: 'BTCマイニング×AI', amount: '40万円', tag: '中期保有', color: '#3d5a80', status: 'hold' },
  { ticker: 'CCCX', label: '暗号資産関連', amount: '10万円', tag: '中期保有', color: '#9a9a8a', status: 'hold' },
  { ticker: 'NBIS 追加', label: 'NISA枠・エントリー待機', amount: '280万円', tag: '条件待機中', color: '#c9a96e', status: 'pending' },
];

const mutualFunds = [
  { account: 'NISA', fund: 'FANG+', monthly: '5万円' },
  { account: '特定', fund: 'レバレッジFANG+', monthly: '0.5万円' },
  { account: '特定', fund: 'USテック20', monthly: '1万円' },
  { account: '特定', fund: 'Zテック20（2倍）', monthly: '2万円' },
  { account: '特定', fund: 'auAMレバレッジNASDAQ100', monthly: '1.5万円' },
];

const rules = [
  {
    num: '①',
    title: 'コアは触らない（ガチホ）',
    color: '#7b68ee',
    items: [
      'IONQ：量子コンピューター商用化まで保有',
      'BTC：1 BTC = $1M（約1.5億円）まで保有',
      '変額保険・投信積立：自動継続',
    ],
  },
  {
    num: '②',
    title: '逆張りエントリー（衛星株）',
    color: '#c9a96e',
    items: [
      '週足 RSI(14) < 40',
      '週足 StochRSI K < 20 かつ D < 20',
      '→ 条件同時成立で分割買い増し',
    ],
  },
  {
    num: '③',
    title: 'ルール利確（衛星株）',
    color: '#7a9e7e',
    items: [
      '×3達成 または 週足 StochRSI > 80 で分割売却',
      '売却資金は IONQ へ統合',
    ],
  },
];

const roadmap = [
  { year: '2026', milestone: 'NBIS仕込み完了（NISA）・Ledger全統合完了' },
  { year: '2027', milestone: 'NBIS黒字化 → 利確 → IONQ統合' },
  { year: '2028', milestone: 'BTC半減期後天井　$300k〜$500k' },
  { year: '2030', milestone: '中間目標　1.5〜2億円' },
  { year: '2033', milestone: 'IONQ 大型量子契約期待' },
  { year: '2035', milestone: 'BTC $1M・IONQ $760〜$1,140 → 総資産5億円' },
];

const scenarios = [
  {
    label: 'Base',
    color: '#7a9e7e',
    ionq: '×10 → 2,500万',
    btc: '×3 → 4,350万',
    other: '×2.5 → 1,800万',
    total: '約8,650万円',
  },
  {
    label: 'Mid',
    color: '#c9a96e',
    ionq: '×20 → 5,000万',
    btc: '×6 → 8,700万',
    other: '×2.5 → 1,800万',
    total: '約1.6億円',
  },
  {
    label: 'Dream',
    color: '#7b68ee',
    ionq: '×30 → 7,500万',
    btc: '×10 → 1.45億',
    other: '×3 → 2,400万',
    total: '約2.7〜5億円',
  },
];

const riskTriggers = [
  'ハイパースケーラー Capex 対売上比：3四半期連続拡大',
  '主要AI企業（NVIDIA等）の業績ミス連続',
  'GPU稼働率 < 40%',
  'VIX > 30 が2週連続（新規エントリー停止モード）',
  'Fed ストレステスト S&P500 ▲54% シナリオ発動',
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#c9a96e] text-xs font-sans tracking-[0.45em] uppercase mb-2">{children}</p>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[#1a1a18] border border-[#2a2a28] rounded-2xl p-5 hover:border-[#3a3a38] transition-colors ${className}`}>
      {children}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    hold: { label: 'HOLD', color: '#7a9e7e', bg: '#7a9e7e18' },
    watch: { label: 'WATCH', color: '#c9a96e', bg: '#c9a96e18' },
    pending: { label: 'PENDING', color: '#7b68ee', bg: '#7b68ee18' },
  };
  const s = map[status] ?? map.hold;
  return (
    <span
      className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full tracking-widest"
      style={{ color: s.color, backgroundColor: s.bg }}
    >
      {s.label}
    </span>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function InvestmentPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0e] text-[#e8d5b7] pt-24">

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-b border-[#2a2a28]">
        <div className="max-w-5xl mx-auto">
          <Label>NISHI 個人投資戦略ブリーフィング · 2026年3月更新版</Label>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
            総資産 <span className="text-[#c9a96e]">3,050万円</span>
          </h1>
          <p className="text-[#6a6a5a] font-sans text-sm mb-6">
            目標：2035年 5億円　／　必要年率{' '}
            <span className="text-[#e07b54] font-bold">+37%</span>　／　現在進捗{' '}
            <span className="text-white font-bold">6.1%</span>
          </p>
          {/* Progress bar */}
          <div className="max-w-sm">
            <div className="flex justify-between text-[10px] font-sans text-[#6a6a5a] mb-1.5">
              <span>現在　3,050万円</span>
              <span>目標　5億円</span>
            </div>
            <div className="h-2 bg-[#2a2a28] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(3050 / 50000) * 100}%`,
                  background: 'linear-gradient(90deg, #c9a96e, #7a9e7e)',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── LOSS HISTORY WARNING ──────────────────────────────────────────── */}
      <section className="px-6 py-10 border-b border-[#2a2a28]">
        <div className="max-w-5xl mx-auto">
          <div className="border border-[#e07b54]/30 bg-[#e07b5408] rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl flex-shrink-0">⚠️</span>
              <div>
                <p className="text-[#e07b54] font-bold text-sm font-sans tracking-widest uppercase mb-3">
                  重要な損失履歴 — 必ず把握すること
                </p>
                <p className="text-[#c0a0a0] font-sans text-sm leading-relaxed mb-3">
                  <span className="text-white font-bold">2025年：</span>
                  米国個別株でピーク <span className="text-white font-bold">3,000万円</span> →{' '}
                  <span className="text-[#e07b54] font-bold">800万円（▲2,200万円、▲73%の大損失）</span>
                </p>
                <p className="text-[#8a8a7a] font-sans text-sm leading-relaxed mb-2">
                  原因：AI・量子・テーマ株の急落局面で耐えきれずor高値掴み
                </p>
                <p className="text-[#8a8a7a] font-sans text-sm leading-relaxed mb-3">
                  現在の総資産3,050万円は <span className="text-[#e8a838] font-semibold">BTC上昇（1,450万円）に支えられており</span>、
                  個別株単体では損失は未回復。
                </p>
                <p className="text-[#c9a96e] font-sans text-sm font-semibold">
                  → この教訓から「逆張りエントリー × ルール利確」の現戦略に移行。
                  個別株の損失（▲2,200万）はBTCと時間が回収する。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ───────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 border-b border-[#2a2a28]">
        <div className="max-w-5xl mx-auto">
          <Label>資産構成</Label>
          <h2 className="text-2xl font-bold text-white mb-8">Portfolio Allocation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolio.map((p) => (
              <Card key={p.asset}>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-white font-bold text-lg">{p.asset}</p>
                    <p className="text-[#6a6a5a] text-xs font-sans mt-0.5">{p.role}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="font-bold text-xl" style={{ color: p.color }}>{p.amount}</p>
                    <p className="text-[#6a6a5a] text-xs font-sans">{p.pct}%</p>
                  </div>
                </div>
                <div className="h-1.5 bg-[#2a2a28] rounded-full overflow-hidden my-3">
                  <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: p.color }} />
                </div>
                <p className="text-[#6a6a5a] text-xs font-sans">{p.sub}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── STOCKS ──────────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 border-b border-[#2a2a28]">
        <div className="max-w-5xl mx-auto">
          <Label>米国個別株内訳</Label>
          <h2 className="text-2xl font-bold text-white mb-8">US Equity Positions</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-[#2a2a28] text-[#6a6a5a] text-xs tracking-widest uppercase">
                  <th className="text-left pb-3 pr-6">Ticker</th>
                  <th className="text-left pb-3 pr-6">テーマ</th>
                  <th className="text-right pb-3 pr-6">評価額</th>
                  <th className="text-right pb-3 pr-6">メモ</th>
                  <th className="text-right pb-3">ステータス</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((s) => (
                  <tr key={s.ticker} className="border-b border-[#1e1e1c] hover:bg-[#1a1a18] transition-colors">
                    <td className="py-3.5 pr-6">
                      <span className="font-bold text-base" style={{ color: s.color }}>{s.ticker}</span>
                    </td>
                    <td className="py-3.5 pr-6 text-[#9a9a7a]">{s.label}</td>
                    <td className="py-3.5 pr-6 text-right text-white font-semibold">{s.amount}</td>
                    <td className="py-3.5 pr-6 text-right text-[#6a6a5a] text-xs">{s.tag}</td>
                    <td className="py-3.5 text-right"><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Auto-invest */}
          <Label>自動積立（月20万円・思考停止エリア）</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Insurance */}
            <Card>
              <p className="text-[#7a9e7e] text-xs font-sans tracking-widest uppercase mb-3">
                ① 変額保険（AXA ユニットリンク）
              </p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-bold">世界株式型</span>
                <span className="text-[#7a9e7e] font-bold font-sans">月10万円</span>
              </div>
              <p className="text-[#6a6a5a] text-xs font-sans">強制積立・長期分散・生命保険機能。引き落とし確認のみ。</p>
            </Card>
            {/* Mutual funds */}
            <Card>
              <p className="text-[#7a9e7e] text-xs font-sans tracking-widest uppercase mb-3">
                ② 投資信託積立
              </p>
              <div className="space-y-2 mb-3">
                {mutualFunds.map((f) => (
                  <div key={f.fund} className="flex justify-between text-xs font-sans">
                    <span className="text-[#6a6a5a]">
                      <span className="text-[#3d9ae8] mr-2">{f.account}</span>
                      {f.fund}
                    </span>
                    <span className="text-white font-semibold">{f.monthly}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2a2a28] pt-2 flex justify-between text-xs font-sans">
                <span className="text-[#6a6a5a]">月合計</span>
                <span className="text-[#7a9e7e] font-bold">10万円</span>
              </div>
            </Card>
          </div>
          <p className="text-[#6a6a5a] text-xs font-sans mt-3">
            年間投資額 240万円（保険＋投信）　／　2035年までの追加投入 約2,160万円　／　アクション：感情ゼロで引き落とし確認のみ
          </p>
        </div>
      </section>

      {/* ── 3 RULES ─────────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 border-b border-[#2a2a28]">
        <div className="max-w-5xl mx-auto">
          <Label>戦略の3ルール</Label>
          <h2 className="text-2xl font-bold text-white mb-8">Investment Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {rules.map((r) => (
              <Card key={r.num}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-2xl" style={{ color: r.color }}>{r.num}</span>
                  <h3 className="text-white font-bold text-sm leading-snug">{r.title}</h3>
                </div>
                <ul className="space-y-2">
                  {r.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#8a8a7a] text-sm font-sans">
                      <span style={{ color: r.color }} className="flex-shrink-0 mt-0.5">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── NBIS ────────────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 border-b border-[#2a2a28]">
        <div className="max-w-5xl mx-auto">
          <Label>メインターゲット · エントリー待ち</Label>
          <h2 className="text-2xl font-bold text-white mb-8">NBIS 詳細戦略</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status */}
            <Card>
              <p className="text-[#c9a96e] text-xs font-sans tracking-widest uppercase mb-4">
                現在の状況（2026/3/3）
              </p>
              <div className="space-y-3">
                {[
                  { label: '現在価格', value: '$86.80', note: 'ピーク$141から▲38%' },
                  { label: '直近安値', value: '$73.87', note: '2025/2/5' },
                  { label: 'VIX', value: '26.62', note: '警戒水準（30超で停止）' },
                  { label: '週足 RSI', value: '推定 40〜48', note: '条件未達（<40が必要）' },
                  { label: '週足 StochRSI K / D', value: '推定 25〜35', note: '条件未達（<20が必要）' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-start border-b border-[#2a2a28] pb-2.5">
                    <span className="text-[#6a6a5a] text-sm font-sans">{row.label}</span>
                    <div className="text-right">
                      <span className="text-white text-sm font-semibold">{row.value}</span>
                      <span className="text-[#6a6a5a] text-xs font-sans block">{row.note}</span>
                    </div>
                  </div>
                ))}
                <div className="pt-1">
                  <span className="inline-block text-xs font-sans font-bold px-3 py-1 rounded-full bg-[#e07b5420] text-[#e07b54] tracking-widest">
                    今週は NO BUY — 日曜夜に毎週再確認
                  </span>
                </div>
              </div>
            </Card>
            {/* Plan */}
            <Card>
              <p className="text-[#c9a96e] text-xs font-sans tracking-widest uppercase mb-4">エントリー計画</p>
              <div className="space-y-3 mb-4">
                {[
                  { label: 'エントリー条件', value: '週足 RSI<40 & StochRSI K・D<20 & $75〜82' },
                  { label: '予算', value: 'NISA 240万円を2〜3回分割' },
                  { label: '利確目標', value: '$143〜$225（×1.9〜×3.0）' },
                  { label: '触媒', value: '2027年黒字化' },
                  { label: '売却後', value: '全額 IONQ 統合' },
                ].map((row) => (
                  <div key={row.label} className="border-b border-[#2a2a28] pb-2.5">
                    <span className="text-[#6a6a5a] text-xs font-sans">{row.label}</span>
                    <p className="text-white text-sm font-sans mt-0.5">{row.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-[#6a6a5a] text-xs font-sans">
                イラン戦争によるリスクオフ継続中。条件成立まで待機。
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── IONQ ────────────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 border-b border-[#2a2a28]">
        <div className="max-w-5xl mx-auto">
          <Label>長期コア</Label>
          <h2 className="text-2xl font-bold text-white mb-8">IONQ 買増ゾーン</h2>

          {/* Current price banner */}
          <div className="bg-[#1a1a18] border border-[#7b68ee]/30 rounded-2xl p-5 mb-6 flex flex-wrap gap-6 items-center">
            <div>
              <p className="text-[#6a6a5a] text-xs font-sans">現在値（2026/3/3）</p>
              <p className="text-[#7b68ee] font-bold text-3xl">$37.05</p>
            </div>
            <div>
              <p className="text-[#6a6a5a] text-xs font-sans">52週高値</p>
              <p className="text-white font-bold text-xl">$84.64</p>
            </div>
            <div>
              <p className="text-[#6a6a5a] text-xs font-sans">高値比</p>
              <p className="text-[#e07b54] font-bold text-xl">▲56%</p>
            </div>
            <div>
              <p className="text-[#6a6a5a] text-xs font-sans">現在保有</p>
              <p className="text-white font-bold text-xl">250万円</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { zone: 'Zone 1', price: '$32〜$38', budget: '500万円', color: '#c9a96e', note: '現在価格付近' },
              { zone: 'Zone 2', price: '$28〜$32', budget: '1,000万円', color: '#e07b54', note: 'メイン押し目' },
              { zone: 'Zone 3', price: '$20〜$26', budget: '1,000万円', color: '#7b68ee', note: '強い逆張り' },
            ].map((z) => (
              <Card key={z.zone}>
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase" style={{ color: z.color }}>{z.zone}</span>
                <p className="text-white text-2xl font-bold mt-1">{z.price}</p>
                <p className="font-bold mt-1" style={{ color: z.color }}>{z.budget}</p>
                <p className="text-[#6a6a5a] text-xs font-sans mt-1">{z.note}</p>
              </Card>
            ))}
          </div>

          <Card>
            <p className="text-[#6a6a5a] text-xs font-sans tracking-widest uppercase mb-3">価格目標</p>
            <div className="flex flex-wrap gap-4">
              {[
                { year: '2028', range: '$120〜$190' },
                { year: '2030', range: '$190〜$400' },
                { year: '2035', range: '$760〜$1,140' },
              ].map((t) => (
                <div key={t.year} className="flex items-center gap-3 bg-[#2a2a28] rounded-xl px-5 py-3">
                  <span className="text-[#7b68ee] text-xs font-sans font-bold">{t.year}</span>
                  <span className="text-white font-bold text-lg">{t.range}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ── ROADMAP ──────────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 border-b border-[#2a2a28]">
        <div className="max-w-5xl mx-auto">
          <Label>2035年ロードマップ</Label>
          <h2 className="text-2xl font-bold text-white mb-10">Milestones to ¥500M</h2>

          <div className="space-y-4">
            {roadmap.map((m, i) => (
              <div key={m.year} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2"
                  style={{ borderColor: '#c9a96e', backgroundColor: '#1a1a18' }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#c9a96e]" />
                </div>
                <div className="flex-1 bg-[#1a1a18] border border-[#2a2a28] rounded-xl p-4 hover:border-[#3a3a38] transition-colors">
                  <span className="text-[#c9a96e] font-bold font-sans text-base">{m.year}</span>
                  <p className="text-[#9a9a7a] text-sm font-sans mt-1">{m.milestone}</p>
                </div>
                {/* connecting line */}
                {i < roadmap.length - 1 && (
                  <div className="absolute ml-[19px] mt-10 w-px h-4 bg-[#2a2a28]" style={{ position: 'relative', left: '-100%' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCENARIOS ────────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 border-b border-[#2a2a28]">
        <div className="max-w-5xl mx-auto">
          <Label>シナリオ試算</Label>
          <h2 className="text-2xl font-bold text-white mb-8">2035 Scenario Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {scenarios.map((s) => (
              <Card key={s.label} className="!p-6">
                <span
                  className="text-xs font-sans font-bold tracking-widest uppercase"
                  style={{ color: s.color }}
                >
                  {s.label}
                </span>
                <div className="mt-4 space-y-2">
                  {[
                    { label: 'IONQ', value: s.ionq },
                    { label: 'BTC', value: s.btc },
                    { label: '保険・積立', value: s.other },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm font-sans border-b border-[#2a2a28] pb-1.5">
                      <span className="text-[#6a6a5a]">{row.label}</span>
                      <span className="text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2">
                  <p className="text-xs font-sans text-[#6a6a5a] mb-0.5">合計</p>
                  <p className="font-bold text-xl" style={{ color: s.color }}>{s.total}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── RISK ─────────────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 border-b border-[#2a2a28]">
        <div className="max-w-5xl mx-auto">
          <Label>AI崩壊リスク監視</Label>
          <h2 className="text-2xl font-bold text-white mb-8">Risk Triggers</h2>
          <div className="space-y-3">
            {riskTriggers.map((t, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-[#1a1a18] border border-[#2a2a28] rounded-xl p-4 hover:border-[#e07b5430] transition-colors"
              >
                <span className="text-[#e07b54] font-bold text-sm flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[#9a9a7a] text-sm font-sans flex-1">{t}</p>
                <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-[#2a2a28] text-[#6a6a5a] flex-shrink-0">
                  監視中
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MENTAL MODEL ─────────────────────────────────────────────────────── */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <Label>メンタルモデル</Label>
          <h2 className="text-2xl font-bold text-white mb-8">Zones of Attention</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="!border-[#7a9e7e]/20">
              <p className="text-[#7a9e7e] text-xs font-sans tracking-widest uppercase mb-3">思考停止エリア</p>
              <p className="text-white font-bold mb-3">自動・触らない</p>
              <ul className="space-y-2 text-[#8a8a7a] text-sm font-sans">
                <li>· BTC → Ledger保管・シード金属板2箇所</li>
                <li>· 変額保険：月10万円自動確認のみ</li>
                <li>· 投信積立：月10万円自動確認のみ</li>
              </ul>
            </Card>
            <Card className="!border-[#c9a96e]/20">
              <p className="text-[#c9a96e] text-xs font-sans tracking-widest uppercase mb-3">楽しむエリア</p>
              <p className="text-white font-bold mb-3">週1回・日曜夜15分</p>
              <ul className="space-y-2 text-[#8a8a7a] text-sm font-sans">
                <li>· NBIS・IONQ：週足チェック → 条件揃えば翌月曜買い</li>
                <li>· OKLO / RGTI / IREN：中期保有継続</li>
              </ul>
            </Card>
            <Card className="!border-[#3d5a80]/40">
              <p className="text-[#3d9ae8] text-xs font-sans tracking-widest uppercase mb-3">人生優先</p>
              <p className="text-white font-bold mb-3">仕事・結婚・プライベート</p>
              <ul className="space-y-2 text-[#8a8a7a] text-sm font-sans">
                <li>· 投資の土台は完成済み</li>
                <li>· 焦らない</li>
                <li>· 個別株損失（▲2,200万）はBTCと時間が回収する</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
