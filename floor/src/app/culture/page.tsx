import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const timeline = [
  {
    year: '1977',
    city: 'Chicago',
    event: 'The Warehouse opens',
    detail:
      'DJ Frankie Knuckles begins spinning at The Warehouse on South Jefferson Street. The music he plays — a fusion of disco, soul, gospel, and electronic — becomes the foundation of what will be called house music.',
    ja: 'シカゴ・ウェアハウス開業。ハウスミュージックの誕生。',
  },
  {
    year: '1981',
    city: 'Chicago',
    event: 'The Music Box era',
    detail:
      'Ron Hardy takes the residency at The Music Box. Known for his relentless, raw, experimental sets, Hardy pushes dancers into new physical territory. House dance as a movement vocabulary begins to solidify.',
    ja: 'ロン・ハーディーとミュージックボックス。ダンスの語彙が固まり始める。',
  },
  {
    year: '1987',
    city: 'Chicago / Global',
    event: 'Jack Your Body',
    detail:
      'Steve \'Silk\' Hurley releases "Jack Your Body," reaching #1 in the UK. House music — and its embodied philosophy — goes international. The word "jack" names the movement that was already happening.',
    ja: '"Jack Your Body"が全英1位。ハウスが国際化。',
  },
  {
    year: '1987–1992',
    city: 'New York',
    event: 'Paradise Garage · The Loft',
    detail:
      'Larry Levan at Paradise Garage, David Mancuso at The Loft. New York\'s house scene develops its own vocabulary — more jazz influence, deeper emotional range. The DJ-dancer relationship becomes symbiotic.',
    ja: 'ニューヨークのサイファー文化が深化。DJとダンサーの共生関係。',
  },
  {
    year: '1990s',
    city: 'Paris · Tokyo · London',
    event: 'Global spread',
    detail:
      'House culture takes root across Europe and Asia. Japan develops one of the world\'s strongest and most technically rigorous house dance scenes. Paris creates its own sophisticated aesthetic. The culture globalizes while deepening locally.',
    ja: '欧州・アジアへ。東京に世界屈指のハウスシーンが根付く。',
  },
  {
    year: '2000s–2010s',
    city: 'Global',
    event: 'Battles and formalization',
    detail:
      'House dance battles like Juste Debout (Paris), Body Rock (New York), and countless local events create international dialogue. The culture maintains its underground roots while building global networks.',
    ja: 'バトル文化が国際的な対話を生む。アンダーグラウンドのまま、グローバルへ。',
  },
  {
    year: '2020s',
    city: 'Everywhere',
    event: 'The AI era',
    detail:
      'Algorithms curate music. Motion capture maps movement. Yet the cipher remains irreducible. The question this platform asks: in a world where machines can simulate everything, what is the value of a human body that has spent 20 years learning to listen?',
    ja: 'AI時代。それでも、フロアで起きることは再現できない。',
  },
];

const figures = [
  {
    name: 'Frankie Knuckles',
    role: 'The Godfather of House',
    detail: 'Resident DJ at The Warehouse, Chicago. Created the sonic world in which house dance was born. His sets were a form of emotional architecture — dancers responded with their entire bodies.',
  },
  {
    name: 'Ron Hardy',
    role: 'The Music Box Architect',
    detail: 'Legendary for raw, experimental sets that pushed dancers beyond comfort zones. Hardy\'s music demanded physical honesty — there was no pretending on his floor.',
  },
  {
    name: 'Larry Levan',
    role: 'Paradise Garage, New York',
    detail: 'Brought jazz sophistication to house. Under Levan, the DJ was not just a selector but a co-creator of the collective experience. The garage style influenced how dancers moved — more lyrical, more vulnerable.',
  },
  {
    name: 'The Cipher',
    role: 'The Real Teacher',
    detail: 'Ultimately, house dance is learned not from a person but from a circle. The cipher teaches you to read the room, to give when the energy calls, to step back when it doesn\'t. No school teaches this. Only the floor does.',
  },
];

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-[#070707] pt-28">

      {/* Header */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-6">Culture & History</p>
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black text-white leading-[0.9] tracking-tight mb-8">
            Born in Chicago.<br />
            <span className="text-fire">Alive Everywhere.</span>
          </h1>
          <div className="max-w-2xl">
            <p className="text-[#a09880] text-xl leading-relaxed mb-4">
              House dance did not begin in a studio. It began in a warehouse on South Jefferson Street,
              Chicago, 1977 — in the dark, to music that had no name yet,
              danced by people who had no idea they were making history.
            </p>
            <p className="text-[#4a4640] text-sm">
              シカゴ、1977年。名前もなかった音楽と共に、歴史を作っているとも知らずに踊った人々。
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 pb-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-12">Timeline</p>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[4.5rem] top-0 bottom-0 w-px bg-white/5 hidden md:block" />
            <div className="space-y-0">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  {/* Year */}
                  <div className="hidden md:flex flex-col items-end min-w-[4.5rem] pt-8">
                    <span className="text-[#FF5A1F] font-black text-sm">{item.year}</span>
                    <div className="w-2 h-2 rounded-full bg-[#FF5A1F]/40 group-hover:bg-[#FF5A1F] transition-colors mt-2 translate-x-[calc(100%+0.5rem)]" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 border-b border-white/5 py-8 group-hover:border-white/10 transition-colors">
                    <div className="flex flex-wrap items-baseline gap-3 mb-3">
                      <span className="md:hidden text-[#FF5A1F] font-black text-xs">{item.year}</span>
                      <h3 className="text-white font-bold text-lg">{item.event}</h3>
                      <span className="text-[#3a3630] text-xs tracking-widest">{item.city}</span>
                    </div>
                    <p className="text-[#7a746c] text-sm leading-relaxed mb-3">{item.detail}</p>
                    <p className="text-[#3a3630] text-xs">{item.ja}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Philosophy — 7 Truths expanded */}
      <section className="py-28 px-6 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-6">Philosophy</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            What happens in the cipher<br />is not entertainment.
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#a09880] text-lg leading-relaxed mb-6">
                When house dance goes deep — when the footwork meets the kick drum, when the jack catches the groove,
                when the cipher starts breathing as a single organism — something happens that psychology has a name for:
                collective trance, Jungian collective unconscious, dynamic meditation.
              </p>
              <p className="text-[#7a746c] text-base leading-relaxed">
                House music is minimal by design: few lyrics, repetitive groove, rhythm that maps directly to heartbeat and breath.
                It is not background music. It is an induction system. The body synchronizes. Thought quiets.
                What remains is sensation — and the rare possibility of genuine resonance between people
                who have never spoken a word to each other.
              </p>
            </div>
            <div className="space-y-4">
              <div className="border border-white/5 p-6 hover:border-[#FF5A1F]/20 transition-colors">
                <p className="text-[#FF5A1F] text-[10px] tracking-widest uppercase mb-2">The Cipher as Ritual</p>
                <p className="text-[#a09880] text-sm leading-relaxed">
                  The circle is not a performance space. It is a ritual space — egalitarian, present-tense,
                  demanding vulnerability. You enter when ready. You give what you have. You receive what the floor returns.
                  This is not metaphor. This is social technology that predates language.
                </p>
              </div>
              <div className="border border-white/5 p-6 hover:border-[#FF5A1F]/20 transition-colors">
                <p className="text-[#FF5A1F] text-[10px] tracking-widest uppercase mb-2">Body as Instrument</p>
                <p className="text-[#a09880] text-sm leading-relaxed">
                  House dance treats the body not as an object to be shaped but as an instrument to be played.
                  The music plays through you. The distinction between dancer and music dissolves.
                  This is the moment practitioners call "being in it."
                </p>
              </div>
              <div className="border border-white/5 p-6 hover:border-[#FF5A1F]/20 transition-colors">
                <p className="text-[#FF5A1F] text-[10px] tracking-widest uppercase mb-2">Beyond Language</p>
                <p className="text-[#a09880] text-sm leading-relaxed">
                  Two people who share no language, no culture, no history — can step into a cipher together
                  and arrive at the same unplanned phrase. That moment of convergence cannot be engineered.
                  It can only be practiced.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Figures */}
      <section className="py-28 px-6 bg-[#070707]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-12">Key Figures</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
            {figures.map((fig) => (
              <div key={fig.name} className="bg-[#070707] p-10 hover:bg-[#0d0d0d] transition-colors">
                <h3 className="text-white font-black text-xl mb-1">{fig.name}</h3>
                <p className="text-[#FF5A1F] text-[10px] tracking-widest uppercase mb-5">{fig.role}</p>
                <p className="text-[#7a746c] text-sm leading-relaxed">{fig.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-t border-white/5 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">
            The culture is alive. Find it near you.
          </h2>
          <p className="text-[#7a746c] mb-8">
            Events, ciphers, workshops, and battles — happening now, in real spaces, with real people.
          </p>
          <Link
            href="/events"
            className="group inline-flex items-center gap-3 bg-[#FF5A1F] text-white px-8 py-4 font-bold tracking-wide hover:bg-[#e84e17] transition-all"
          >
            Find Events Near You
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
