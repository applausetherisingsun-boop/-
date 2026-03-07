import Link from 'next/link';

const events = [
  {
    n: 'Vol. 01',
    title: 'Ritual Night — Opening',
    date: '2025年 春 · 日程調整中',
    city: '東京',
    capacity: '25名',
    theme: 'ROOTS',
    description:
      'HOUSE IS A STATE の最初の夜。ROOTSをテーマに、シカゴからの音楽的系譜を身体で辿る。セレクション、空間、人数——すべてが設計された体験。DJと参加者の境界が曖昧になるような場を作る。',
    status: 'Coming',
  },
];

const what = [
  {
    q: 'Ritual Nightとは何か？',
    a: '20〜30人限定の小規模音楽体験。Listening × Movement × 集団同期。売るのは情報ではなく「身体状態の変化」。スケールしないことが価値の源泉。',
  },
  {
    q: '何が起きるのか？',
    a: 'キュレーションされた音楽空間で、身体が同期する過程を体験する。レクチャーではない。ワークショップでもない。ただ音楽があり、身体があり、空間がある。',
  },
  {
    q: 'なぜ25人なのか？',
    a: '集合的同期が起きるための人数には上限がある。大きすぎる空間では個人が群衆に消える。Ritual Nightは「ひとりひとりが感じられる」スケールを守る。',
  },
  {
    q: 'AIではできないのか？',
    a: 'AIはキュレートされたプレイリストを作れる。ヘッドフォンで聴くこともできる。しかし同じ空間で同じキックに揺れた後の、あの身体感覚は生成できない。',
  },
];

const design = [
  { label: '人数', value: '20〜30名', note: 'スケールしないことが価値' },
  { label: '頻度', value: '月1〜2回', note: '東京を拠点に' },
  { label: '価格', value: '¥12,000 / 人', note: '体験への対価' },
  { label: 'テーマ', value: 'ROOTS / NOW / NEXT', note: 'シリーズ構成' },
  { label: 'スタイル', value: 'Listening + Movement', note: 'ジャンルを超える' },
];

export default function RitualPage() {
  return (
    <div className="min-h-screen bg-[#050505] pt-28">

      {/* Header */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-6">Ritual Night</p>
          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black text-[#ede8e0] leading-[0.88] tracking-tight mb-8">
            身体状態の<br />
            <span className="text-gold">変化を売る。</span>
          </h1>
          <p className="text-[#7a7060] text-xl max-w-2xl leading-relaxed">
            AIは体験を生成できない。Ritual Nightは20〜30人限定の小規模音楽体験。
            スケールしないことが価値の源泉。
          </p>
        </div>
      </section>

      {/* Design specs */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-white/5">
            {design.map((d) => (
              <div key={d.label} className="bg-[#050505] p-8 hover:bg-[#0d0d0d] transition-colors">
                <p className="text-[#3a3628] text-[9px] tracking-widest uppercase mb-2">{d.label}</p>
                <p className="text-[#c9a96e] font-black text-sm mb-1">{d.value}</p>
                <p className="text-[#5a5040] text-[10px]">{d.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is it */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-12">Q&A</p>
          <div className="space-y-0">
            {what.map((item) => (
              <div key={item.q} className="border-b border-white/5 py-8 hover:border-white/10 transition-colors">
                <h3 className="text-[#ede8e0] font-bold mb-4">{item.q}</h3>
                <p className="text-[#7a7060] text-sm leading-relaxed max-w-2xl">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-20 px-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#c9a96e] text-[9px] tracking-[0.5em] uppercase mb-12">Upcoming</p>
          {events.map((ev) => (
            <div key={ev.n} className="border border-[#c9a96e]/20 p-10 md:p-14 hover:border-[#c9a96e]/40 transition-colors">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                <div>
                  <p className="text-[#c9a96e] text-[9px] tracking-widest uppercase mb-2">
                    {ev.n} · {ev.theme}
                  </p>
                  <h2 className="text-[#ede8e0] font-black text-2xl">{ev.title}</h2>
                </div>
                <span className="border border-[#c9a96e]/30 text-[#c9a96e] px-3 py-1 text-[10px] font-bold tracking-widest">
                  {ev.status}
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="text-[#3a3628] text-[9px] tracking-widest uppercase mb-1">Date</p>
                  <p className="text-[#a09880] text-sm">{ev.date}</p>
                </div>
                <div>
                  <p className="text-[#3a3628] text-[9px] tracking-widest uppercase mb-1">City</p>
                  <p className="text-[#a09880] text-sm">{ev.city}</p>
                </div>
                <div>
                  <p className="text-[#3a3628] text-[9px] tracking-widest uppercase mb-1">Capacity</p>
                  <p className="text-[#a09880] text-sm">{ev.capacity}</p>
                </div>
              </div>
              <p className="text-[#7a7060] text-sm leading-relaxed max-w-2xl mb-8">{ev.description}</p>
              <Link
                href="/circle"
                className="inline-flex items-center gap-2 border border-[#c9a96e]/40 text-[#c9a96e] px-6 py-3 text-sm font-bold hover:bg-[#c9a96e] hover:text-[#050505] transition-all"
              >
                STATE Circle メンバーが優先通知を受け取る →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy quote */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-y border-white/5 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#5a5040] text-[9px] tracking-[0.5em] uppercase mb-8">Why Small</p>
          <blockquote className="text-xl md:text-2xl text-[#7a7060] leading-relaxed mb-8 font-light">
            「体験の設計原則：スケールしないことが価値。<br />
            希少性を守る。<br />
            AIが大量生産できないものを、丁寧に作る。」
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-6 h-px bg-[#c9a96e]/40" />
            <p className="text-[#3a3628] text-[10px] tracking-[0.4em] uppercase">HOUSE IS A STATE</p>
            <div className="w-6 h-px bg-[#c9a96e]/40" />
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 px-6 bg-[#050505] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-black text-[#ede8e0] mb-4">
            通知を受け取る
          </h2>
          <p className="text-[#7a7060] mb-8">
            STATE Circleメンバーは Ritual Night の優先通知と割引を受け取ります。
          </p>
          <Link
            href="/circle"
            className="inline-flex items-center gap-2 border border-[#c9a96e]/50 text-[#c9a96e] px-10 py-4 font-black tracking-wide hover:bg-[#c9a96e] hover:text-[#050505] transition-all"
          >
            Enter STATE Circle →
          </Link>
        </div>
      </section>
    </div>
  );
}
