const FEATURES = [
  {
    title: 'Adaptive ANC',
    body: 'Six microphones map your environment 48,000 times a second. The cabin you wanted, wherever you are.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
        <circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="7" opacity="0.6" /><circle cx="12" cy="12" r="11" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: '60 Hour Battery',
    body: 'A weekend, a week, a long-haul flight, then home. Five-minute fast charge buys you four hours.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
        <rect x="3" y="7" width="16" height="10" rx="2" /><path d="M19 10v4" /><path d="M9 12h4" />
      </svg>
    ),
  },
  {
    title: 'Beryllium Drivers',
    body: 'Custom 40mm drivers with beryllium-coated diaphragms — stiffer, lighter, stunningly transient.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Spatial Audio',
    body: 'Head-tracked spatial audio with personalised HRTF profiles. The orchestra is in the room.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
        <path d="M12 3v18" /><path d="M3 12h18" /><circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: 'Aerospace Build',
    body: '6000-series aluminium yokes, vegetable-tanned leather cushions, replaceable cables. Built to outlast trends.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
        <polygon points="12 3 21 8 21 16 12 21 3 16 3 8 12 3" />
      </svg>
    ),
  },
  {
    title: 'On-Device AI',
    body: 'Voice commands process locally. Nothing leaves the headset unless you ask it to.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
        <path d="M5 12c0-3.9 3.1-7 7-7s7 3.1 7 7" /><path d="M5 12v3a4 4 0 0 0 4 4h.5" /><path d="M19 12v3a4 4 0 0 1-4 4h-.5" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">
            Engineering
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-semibold mt-3 tracking-tight text-balance">
            Six years, two patents,
            <br />
            <span className="text-white/40">one obsession.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-ink-900 p-8 hover:bg-ink-800 transition group"
            >
              <div className="text-accent mb-6 group-hover:scale-110 transition origin-left">
                {f.icon}
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
