import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const cities = [
  { city: 'Tokyo', count: '200+', active: true },
  { city: 'New York', count: '150+', active: true },
  { city: 'Paris', count: '120+', active: true },
  { city: 'Chicago', count: '80+', active: true },
  { city: 'Seoul', count: '90+', active: true },
  { city: 'São Paulo', count: '60+', active: false },
  { city: 'London', count: '70+', active: false },
  { city: 'Berlin', count: '40+', active: false },
];

const pillars = [
  {
    icon: '◯',
    title: 'The Cipher',
    body: 'The circle is the heart of house. No hierarchy. You enter when ready, give what you have, receive what comes back. FLOOR connects you to ciphers — physical ones — happening near you.',
  },
  {
    icon: '△',
    title: 'Practitioner Network',
    body: 'Connect with house dancers at every level: from students to 20-year veterans. Filter by city, style, availability. Real connections for real sessions.',
  },
  {
    icon: '□',
    title: 'Culture Repository',
    body: 'Upload footage, write histories, document local scenes. The culture lives in bodies, but it also needs to be recorded. This is the collective memory of house dance.',
  },
];

const manifesto = [
  'The floor is not a stage. It is a conversation.',
  'The cipher is not competition. It is co-creation.',
  'The body is not an instrument of performance. It is an instrument of presence.',
  'AI can generate music. It cannot generate the moment two strangers arrive at the same unplanned phrase.',
  'This community exists to keep that moment alive.',
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#070707] pt-28">

      {/* Header */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-6">Global Community</p>
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black text-white leading-[0.9] tracking-tight mb-8">
            The cipher<br />
            <span className="text-fire">is everywhere.</span>
          </h1>
          <p className="text-[#7a746c] text-lg max-w-2xl leading-relaxed">
            House dance is a global language. This platform connects the practitioners —
            the people who show up to the floor every week, in every city,
            and keep the culture alive through their bodies.
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="border border-white/5 p-10 md:p-16">
            <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-8">Why This Exists</p>
            <div className="space-y-6">
              {manifesto.map((line, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <span className="text-[#FF5A1F] font-black text-lg flex-shrink-0 mt-0.5">—</span>
                  <p className="text-[#a09880] text-lg leading-relaxed">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-12">What FLOOR Community Offers</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {pillars.map((p) => (
              <div key={p.title} className="bg-[#0d0d0d] p-10 hover:bg-[#111] transition-colors">
                <span className="text-[#FF5A1F] font-black text-3xl block mb-6">{p.icon}</span>
                <h3 className="text-white font-black text-xl mb-4">{p.title}</h3>
                <p className="text-[#7a746c] text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-20 px-6 bg-[#070707]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-12">Active Scenes</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5">
            {cities.map((c) => (
              <div
                key={c.city}
                className={`p-8 transition-colors ${
                  c.active ? 'bg-[#070707] hover:bg-[#0d0d0d]' : 'bg-[#070707] opacity-50'
                }`}
              >
                <p className="text-white font-black text-xl mb-1">{c.city}</p>
                <p className="text-[#FF5A1F] font-bold text-sm">{c.count}</p>
                <p className="text-[#3a3630] text-xs mt-1">practitioners</p>
                {!c.active && (
                  <p className="text-[#3a3630] text-[10px] mt-2 tracking-widest">Growing</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The AI Statement */}
      <section className="py-20 px-6 bg-[#0d0d0d] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-6">In the AI Era</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                Real bodies.<br />Real community.<br />
                <span className="text-fire">Irreplaceable.</span>
              </h2>
              <p className="text-[#7a746c] text-base leading-relaxed">
                This platform believes that in a world where artificial intelligence can generate,
                simulate, and optimize almost anything — the lived experience of human bodies
                moving together in a shared space remains irreducibly valuable.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { q: 'Can AI generate house music?', a: 'Yes. It already does.' },
                { q: 'Can AI map house dance movements?', a: 'Yes. Motion capture does this.' },
                { q: 'Can AI replicate the moment in the cipher?', a: 'No. Not yet. Not ever, we suspect.' },
                { q: 'Why not?', a: 'Because the cipher requires two people to be genuinely present — with their actual bodies, their actual histories, their actual fear of entering the circle.' },
              ].map(({ q, a }) => (
                <div key={q} className="border border-white/5 p-5 hover:border-[#FF5A1F]/20 transition-colors">
                  <p className="text-[#7a746c] text-xs mb-2">{q}</p>
                  <p className="text-[#a09880] text-sm font-medium">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-28 px-6 bg-[#070707] text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#FF5A1F] text-[10px] tracking-[0.5em] uppercase mb-6">Join the Platform</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            The floor is waiting.<br />
            <span className="text-fire">Step in.</span>
          </h2>
          <p className="text-[#7a746c] text-lg leading-relaxed mb-12">
            Connect with practitioners in your city. Find ciphers.
            Share your events. Contribute to the culture archive.
            This is the global home of house dance.
          </p>

          <div className="border border-white/10 p-10 max-w-md mx-auto mb-8">
            <p className="text-[#7a746c] text-xs tracking-widest uppercase mb-6">Early Access</p>
            <div className="flex flex-col gap-3 mb-4">
              <input
                type="text"
                placeholder="Your name / ニックネーム"
                className="bg-transparent border border-white/10 text-[#f0ece4] placeholder-[#3a3630] px-4 py-3 text-sm outline-none focus:border-[#FF5A1F]/40 transition-colors"
              />
              <input
                type="email"
                placeholder="Email / メール"
                className="bg-transparent border border-white/10 text-[#f0ece4] placeholder-[#3a3630] px-4 py-3 text-sm outline-none focus:border-[#FF5A1F]/40 transition-colors"
              />
              <select className="bg-[#070707] border border-white/10 text-[#7a746c] px-4 py-3 text-sm outline-none focus:border-[#FF5A1F]/40 transition-colors">
                <option value="">Your city / 都市</option>
                <option>Tokyo</option>
                <option>New York</option>
                <option>Paris</option>
                <option>Chicago</option>
                <option>Seoul</option>
                <option>São Paulo</option>
                <option>London</option>
                <option>Other</option>
              </select>
            </div>
            <button className="w-full bg-[#FF5A1F] text-white py-4 font-bold tracking-wide hover:bg-[#e84e17] transition-all flex items-center justify-center gap-2">
              Request Early Access
              <ArrowRight size={16} />
            </button>
            <p className="text-[#3a3630] text-[10px] mt-4">
              No spam. No algorithms. Just the cipher.
            </p>
          </div>

          <p className="text-[#4a4640] text-sm">
            Already part of a local scene?{' '}
            <Link href="/events" className="text-[#FF5A1F] hover:underline">
              List your events →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
