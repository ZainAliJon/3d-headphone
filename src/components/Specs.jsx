const ROWS = [
  ['Driver', '40mm beryllium-coated dynamic'],
  ['Frequency response', '4 Hz – 40 kHz'],
  ['Impedance', '32 Ω'],
  ['Codecs', 'aptX Lossless · LDAC · AAC · LC3'],
  ['Battery', '60h ANC off · 42h ANC on'],
  ['Charge', 'USB-C · 5 min = 4h playback'],
  ['Mics', '6× MEMS with beamforming'],
  ['Weight', '248g'],
  ['Materials', '6000-series aluminium · leather · recycled foam'],
  ['Warranty', '2 years, parts & labour'],
];

export default function Specs() {
  return (
    <section id="specs" className="relative py-32 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <span className="text-xs uppercase tracking-[0.3em] text-accent">
          Specification
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-12 tracking-tight">
          Numbers, for the people who like numbers.
        </h2>

        <dl className="divide-y divide-white/10 border-y border-white/10">
          {ROWS.map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 py-4 hover:bg-white/[0.02] transition px-2"
            >
              <dt className="text-sm uppercase tracking-[0.2em] text-white/50">
                {k}
              </dt>
              <dd className="text-base text-white/90">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
