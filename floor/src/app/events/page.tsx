import Link from 'next/link';

const eventTypes = [
  { id: 'battle',   label: 'Battle',   ja: 'バトル',      desc: 'Head-to-head or crew competition' },
  { id: 'jam',      label: 'Jam',      ja: 'ジャム',      desc: 'Open cipher — all levels welcome' },
  { id: 'workshop', label: 'Workshop', ja: 'ワークショップ', desc: 'Technique and culture sessions' },
  { id: 'festival', label: 'Festival', ja: 'フェスティバル', desc: 'Multi-day cultural gathering' },
];

const events = [
  {
    id: 1,
    name: 'Tokyo House Jam Vol. 18',
    type: 'Jam',
    city: 'Tokyo',
    country: 'Japan',
    date: 'Mar 22, 2025',
    venue: 'Studio Aobadai, Meguro',
    description: 'Monthly open cipher. All levels. Bring your body, leave your judgment.',
    tags: ['Open Cipher', 'All Levels', '月例'],
    featured: true,
  },
  {
    id: 2,
    name: 'Juste Debout 2025',
    type: 'Battle',
    city: 'Paris',
    country: 'France',
    date: 'Apr 5, 2025',
    venue: 'Accor Arena, Bercy',
    description: 'One of the world\'s most prestigious house dance battle events. International competitors, legendary atmosphere.',
    tags: ['International', 'Professional', 'Legendary'],
    featured: true,
  },
  {
    id: 3,
    name: 'Body Rock NYC',
    type: 'Battle',
    city: 'New York',
    country: 'USA',
    date: 'May 17, 2025',
    venue: 'SOB\'s, Manhattan',
    description: 'The classic New York battle returns. House, breaking, and NYC underground culture.',
    tags: ['New York', 'Classic', 'Underground'],
    featured: false,
  },
  {
    id: 4,
    name: 'House Dance Fundamentals',
    type: 'Workshop',
    city: 'Osaka',
    country: 'Japan',
    date: 'Mar 29, 2025',
    venue: 'Move Studio Namba',
    description: 'Full-day workshop covering footwork, jack, and loft fundamentals. Taught by 20-year practitioner.',
    tags: ['Fundamentals', 'Osaka', '大阪'],
    featured: false,
  },
  {
    id: 5,
    name: 'Seoul Cipher Night',
    type: 'Jam',
    city: 'Seoul',
    country: 'Korea',
    date: 'Apr 12, 2025',
    venue: 'Space Ground, Hongdae',
    description: 'Seoul\'s underground house community monthly gathering. Intimate, soulful, real.',
    tags: ['Seoul', 'Underground', '서울'],
    featured: false,
  },
  {
    id: 6,
    name: 'Chicago House Roots Festival',
    type: 'Festival',
    city: 'Chicago',
    country: 'USA',
    date: 'Jun 7–8, 2025',
    venue: 'Multiple Venues, South Side',
    description: 'Return to the origin. Two days celebrating Chicago house music and dance heritage.',
    tags: ['Origins', 'Chicago', 'Heritage'],
    featured: true,
  },
];

const typeColors: Record<string, string> = {
  Battle:   '#FF5A1F',
  Jam:      '#e8b84b',
  Workshop: '#3a7bd5',
  Festival: '#7a9e7e',
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#070707] pt-28">

      {/* Header */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-6">Events & Battles</p>
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black text-white leading-[0.9] tracking-tight mb-8">
            Find your<br />
            <span className="text-fire">next cipher.</span>
          </h1>
          <p className="text-[#7a746c] text-lg max-w-xl leading-relaxed">
            Battles, open jams, workshops, and festivals — happening now, in real spaces,
            with real bodies. The culture lives on the floor.
          </p>
        </div>
      </section>

      {/* Event type filter */}
      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <button className="border border-[#FF5A1F] text-[#FF5A1F] px-5 py-2 text-sm font-bold tracking-wide">
              All Events
            </button>
            {eventTypes.map((type) => (
              <button
                key={type.id}
                className="border border-white/10 text-[#7a746c] px-5 py-2 text-sm tracking-wide hover:border-white/20 hover:text-white transition-all"
              >
                {type.label}
                <span className="ml-2 text-[10px] text-[#4a4640]">{type.ja}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#3a3630] text-[10px] tracking-[0.4em] uppercase mb-6">Featured</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {events.filter((e) => e.featured).map((event) => (
              <div key={event.id} className="bg-[#070707] p-8 hover:bg-[#0d0d0d] transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1"
                    style={{ color: typeColors[event.type], backgroundColor: `${typeColors[event.type]}15` }}
                  >
                    {event.type}
                  </span>
                  <span className="text-[#3a3630] text-xs">{event.date}</span>
                </div>
                <h3 className="text-white font-black text-xl mb-1 group-hover:text-[#FF5A1F] transition-colors">
                  {event.name}
                </h3>
                <p className="text-[#7a746c] text-xs tracking-wide mb-4">
                  {event.city}, {event.country} · {event.venue}
                </p>
                <p className="text-[#7a746c] text-sm leading-relaxed mb-5">{event.description}</p>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-[#4a4640] border border-white/5 px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Events */}
      <section className="px-6 pb-28">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#3a3630] text-[10px] tracking-[0.4em] uppercase mb-6">All Events</p>
          <div className="space-y-px">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 bg-[#070707] hover:bg-[#0d0d0d] transition-colors p-6 group cursor-pointer border-b border-white/5"
              >
                <div className="md:w-24 flex-shrink-0">
                  <span
                    className="text-[9px] font-bold tracking-widest uppercase px-2 py-1"
                    style={{ color: typeColors[event.type], backgroundColor: `${typeColors[event.type]}15` }}
                  >
                    {event.type}
                  </span>
                </div>
                <div className="md:w-32 flex-shrink-0">
                  <p className="text-[#a09880] text-sm">{event.date}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold group-hover:text-[#FF5A1F] transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-[#4a4640] text-xs mt-0.5">{event.city}, {event.country}</p>
                </div>
                <div className="md:w-64 hidden md:block">
                  <p className="text-[#4a4640] text-xs leading-relaxed">{event.venue}</p>
                </div>
                <div className="md:w-8 text-[#3a3630] group-hover:text-[#FF5A1F] transition-colors">
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit CTA */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-black text-white mb-2">Running an event?</h2>
            <p className="text-[#7a746c] text-sm">
              Share it with the global house dance community. Battles, jams, workshops — all welcome.
            </p>
          </div>
          <Link
            href="/community"
            className="flex-shrink-0 border border-[#FF5A1F] text-[#FF5A1F] px-8 py-4 font-bold tracking-wide hover:bg-[#FF5A1F] hover:text-white transition-all"
          >
            Submit Your Event →
          </Link>
        </div>
      </section>
    </div>
  );
}
