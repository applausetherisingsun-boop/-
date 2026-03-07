import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const elements = [
  {
    id: 'footwork',
    en: 'Footwork',
    ja: 'フットワーク',
    number: '01',
    description:
      'Complex rhythmic patterns born from direct dialogue with the kick and snare. The feet translate music into language. When footwork is deep, no translation is needed.',
    note: 'The foundation. Everything starts from the ground.',
  },
  {
    id: 'jack',
    en: 'Jack',
    ja: 'ジャック',
    number: '02',
    description:
      'The torso as a rhythmic instrument. Jacking is not performance — it is surrender. When the body locks into the groove, thought stops. This is the dynamic meditation state.',
    note: '"Jack your body." — Steve \'Silk\' Hurley, 1987',
  },
  {
    id: 'loft',
    en: 'Loft',
    ja: 'ロフト',
    number: '03',
    description:
      'Floor-level artistry where jazz meets club culture. The ground is not the limit — it is an invitation. Lofting dissolves the boundary between athlete and artist.',
    note: 'Jazz in the body. Freedom in the fall.',
  },
  {
    id: 'cipher',
    en: 'Cipher',
    ja: 'サイファー',
    number: '04',
    description:
      'The circle where house breathes. A ritual space with no hierarchy — you enter when ready, you give what you have, you receive what the floor returns. The cipher is Jungian: individual voices dissolving into collective unconscious.',
    note: 'Respect · Vulnerability · Presence · Now',
  },
];

const scenes = [
  { city: 'Chicago', note: 'The Warehouse · 1977', detail: 'Where it began. Frankie Knuckles, Ron Hardy.' },
  { city: 'New York', note: 'Paradise Garage · The Loft', detail: 'Larry Levan. The dance and the DJ became one.' },
  { city: 'Paris', note: 'Scene since late 80s', detail: 'European underground embraced house deeply.' },
  { city: 'Tokyo', note: '東京 · One of the world\'s strongest', detail: '20 years of dedicated practitioners. The culture runs deep here.' },
  { city: 'São Paulo', note: 'Brasil · Afro-Brazilian roots', detail: 'House fused with local soul.' },
  { city: 'Seoul', note: '서울 · Rising global voice', detail: 'New generation carrying the cipher forward.' },
];

const truths = [
  {
    n: '1',
    title: 'Dynamic Meditation',
    body: 'House dance fuses non-verbal expression, improvisation, and rhythmic repetition. These silence thought and produce a moving trance state. The body in motion becomes the mind at rest.',
  },
  {
    n: '2',
    title: 'Collective Unconscious',
    body: 'In deep focus, movement accesses a shared emotional field that transcends the individual. Like jazz improvisation, dance dissolves the boundary between inner and outer — the self begins to resonate with others.',
  },
  {
    n: '3',
    title: 'The Rarity of Bodily Truth',
    body: 'No two people feel the same "blue." Because of this, bodily resonance is closer to truth than words. The cipher becomes a rare space where genuine empathy — beyond language — can emerge.',
  },
  {
    n: '4',
    title: 'Music as Consciousness Shift',
    body: 'House music is minimal: few lyrics, groove and repetition at the center. Its rhythm naturally synchronizes with heartbeat, breath, and body sway. The result is a shift in conscious state — a mechanism for rewriting the self.',
  },
  {
    n: '5',
    title: 'The Circle as Collective Story',
    body: 'In house culture, dancers form a circle and take turns entering the floor. They weave life stories through rhythm. It is a ritual of sharing respect, vulnerability, and the present moment.',
  },
  {
    n: '6',
    title: 'Pre-Verbal Energy',
    body: 'Soulful music and universal rhythm awaken emotions and desires that existed before language. Here, the person you truly want to become appears not as thought, but as sensation.',
  },
  {
    n: '7',
    title: 'Collective Self-Efficacy',
    body: 'That collective energy generates trust, warmth, and wordless solidarity. The cipher amplifies the courage of each body. In the AI era, this — only this — cannot be simulated.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070707]">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)',
          }}
        />

        {/* Orange vertical accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#FF5A1F] to-transparent opacity-60" />

        <div className="relative z-10 max-w-5xl mx-auto text-center pt-32 pb-20">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 border border-white/10 px-4 py-1.5 mb-12">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse-dot" />
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#7a746c] uppercase">
              House Dance · Global Culture Platform
            </span>
          </div>

          <h1 className="text-[clamp(3rem,10vw,7rem)] font-black text-white leading-[0.9] tracking-tight mb-6">
            The floor<br />
            <span className="text-fire">doesn&apos;t lie.</span>
          </h1>

          <p className="text-[#7a746c] text-sm tracking-[0.5em] mb-8">
            フロアは嘘をつかない。
          </p>

          <p className="text-[#a09880] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            House dance is not choreography. It is conversation —
            between body, music, and the people standing in the circle.
            20 years of practice taught us that this conversation
            cannot be replaced.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/culture"
              className="group flex items-center justify-center gap-3 bg-[#FF5A1F] text-white px-8 py-4 font-bold tracking-wide hover:bg-[#e84e17] transition-all duration-300"
            >
              Explore Culture
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/events"
              className="flex items-center justify-center gap-3 border border-white/10 text-[#a09880] px-8 py-4 font-medium tracking-wide hover:border-[#FF5A1F]/40 hover:text-white transition-all duration-300"
            >
              Find Events
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[#3a3630] text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#FF5A1F] to-transparent" />
        </div>
      </section>

      {/* ── The 7 Truths ── */}
      <section className="py-28 px-6 bg-[#070707]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-4">Philosophy</p>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                House Dance<br />as Urban Meditation
              </h2>
            </div>
            <p className="text-[#7a746c] text-sm max-w-sm leading-relaxed">
              7 deep truths about what happens to the human body
              and consciousness when house dance goes deep.
              <span className="block mt-2 text-[#4a4640]">都市の瞑想としてのハウスダンス</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {truths.map((t, i) => (
              <div
                key={t.n}
                className={`bg-[#070707] p-8 hover:bg-[#111111] transition-colors ${
                  i === 6 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-[#FF5A1F] font-black text-2xl leading-none">{t.n}</span>
                  <h3 className="text-white font-bold text-base leading-tight pt-1">{t.title}</h3>
                </div>
                <p className="text-[#7a746c] text-sm leading-relaxed">{t.body}</p>
              </div>
            ))}
            {/* Eighth block — the AI statement */}
            <div className="bg-[#FF5A1F]/5 border border-[#FF5A1F]/20 p-8">
              <p className="text-[#FF5A1F] text-xs tracking-widest uppercase mb-3">In the AI Era</p>
              <p className="text-white text-lg font-bold leading-snug mb-3">
                &ldquo;Real human experience, sensation, and community remain essential.&rdquo;
              </p>
              <p className="text-[#7a746c] text-sm leading-relaxed">
                AI can generate music, simulate movement, and optimize routines.
                What it cannot replicate: the moment two bodies in a cipher arrive
                at the same unplanned phrase. That is irreducibly human.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Elements ── */}
      <section className="py-28 px-6 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-4">The Elements</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">4 Pillars of House Dance</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {elements.map((el) => (
              <div key={el.id} className="bg-[#0d0d0d] p-10 hover:bg-[#111111] transition-colors group">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-[#3a3630] font-black text-5xl leading-none">{el.number}</span>
                  <div>
                    <h3 className="text-white font-black text-2xl group-hover:text-[#FF5A1F] transition-colors">
                      {el.en}
                    </h3>
                    <span className="text-[#4a4640] text-sm">{el.ja}</span>
                  </div>
                </div>
                <p className="text-[#7a746c] text-sm leading-relaxed mb-5">{el.description}</p>
                <div className="border-l-2 border-[#FF5A1F]/40 pl-4">
                  <p className="text-[#5a5450] text-xs italic">{el.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Scenes ── */}
      <section className="py-28 px-6 bg-[#070707]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-4">Global Scenes</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Born in Chicago.<br />Alive Everywhere.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {scenes.map((scene) => (
              <div key={scene.city} className="bg-[#070707] p-8 hover:bg-[#111] transition-colors group">
                <h3 className="text-white font-black text-xl mb-1 group-hover:text-[#FF5A1F] transition-colors">
                  {scene.city}
                </h3>
                <p className="text-[#FF5A1F] text-[10px] tracking-widest mb-4">{scene.note}</p>
                <p className="text-[#7a746c] text-sm leading-relaxed">{scene.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy Quote ── */}
      <section className="py-28 px-6 bg-[#111111] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#3a3630] text-[10px] tracking-[0.5em] uppercase mb-10">Why this platform exists</p>
          <blockquote className="text-2xl md:text-3xl text-[#a09880] leading-relaxed font-light mb-10">
            &ldquo;When I first saw house dance in high school,
            I felt that I could see something essential about human beings.
            I have been asking the same question ever since —
            through dance, through the body, through medicine, through zen.
            The question has never changed. Only the vocabulary has grown.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#FF5A1F]" />
            <p className="text-[#4a4640] text-xs tracking-[0.3em] uppercase">
              NISHI — Founder · 20 years House Dance · Physician
            </p>
            <div className="w-8 h-px bg-[#FF5A1F]" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 bg-[#070707] text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-6">Join the Cipher</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            The floor is waiting.<br />
            <span className="text-fire">Are you ready?</span>
          </h2>
          <p className="text-[#7a746c] text-lg leading-relaxed mb-12">
            Connect with house dance practitioners worldwide.
            Find events, share culture, and keep the cipher alive —
            in the real world, with real bodies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/community"
              className="group flex items-center justify-center gap-3 bg-[#FF5A1F] text-white px-10 py-5 font-black text-lg tracking-wide hover:bg-[#e84e17] transition-all duration-300"
            >
              Enter the Cipher
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/culture"
              className="flex items-center justify-center border border-white/10 text-[#a09880] px-10 py-5 font-medium tracking-wide hover:border-white/20 hover:text-white transition-all duration-300"
            >
              Read the Culture
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
