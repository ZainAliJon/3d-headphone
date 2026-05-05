import { useState } from 'react';
import { Link } from 'react-router-dom';
import Scene from '../3d/Scene';

const FINISHES = [
  { id: 'graphite',  name: 'Graphite',  color: '#0f0f12', accent: '#c8ff3e', metalness: 0.55, roughness: 0.32 },
  { id: 'porcelain', name: 'Porcelain', color: '#e9e6df', accent: '#1a1a1a', metalness: 0.18, roughness: 0.5 },
  { id: 'cobalt',    name: 'Cobalt',    color: '#1c2c5c', accent: '#7faaff', metalness: 0.6, roughness: 0.3 },
  { id: 'oxide',     name: 'Oxide',     color: '#7a2820', accent: '#ffb27a', metalness: 0.45, roughness: 0.38 },
  { id: 'sage',      name: 'Sage',      color: '#3a4a3d', accent: '#d4ffb4', metalness: 0.4, roughness: 0.42 },
  { id: 'champagne', name: 'Champagne', color: '#caa56b', accent: '#1a1a1a', metalness: 0.85, roughness: 0.22 },
];

const CUSHIONS = [
  { id: 'leather', name: 'Vegetable-tanned leather', sub: 'Standard' },
  { id: 'alcantara', name: 'Italian Alcantara', sub: '+$40' },
  { id: 'velour', name: 'Recycled velour', sub: '+$25' },
];

const ENGRAVING_LIMIT = 18;

export default function MarkIV() {
  const [finish, setFinish] = useState(FINISHES[0]);
  const [cushion, setCushion] = useState(CUSHIONS[0]);
  const [engraving, setEngraving] = useState('');
  const [exploded, setExploded] = useState(false);

  const total = 349 + (cushion.id === 'alcantara' ? 40 : cushion.id === 'velour' ? 25 : 0);

  return (
    <>
      <Breadcrumb />

      <section className="pb-32">
        <div className="shell">
          <header className="grid md:grid-cols-[1fr_auto] gap-6 items-end mb-12">
            <div>
              <p className="eyebrow mb-3">Mark IV — Reference wireless</p>
              <h1 className="font-display font-medium text-5xl md:text-7xl tracking-tightest">
                Configure <span className="italic-display text-white/40">your pair.</span>
              </h1>
            </div>
            <p className="text-white/55 max-w-sm leading-relaxed">
              Six finishes. Three cushion materials. One engraving line.
              Each pair is hand-assembled in Lisbon and ships within 48 hours.
            </p>
          </header>

          <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-stretch">
            {/* 3D viewer */}
            <div className="relative aspect-square lg:aspect-auto lg:min-h-[640px] rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 overflow-hidden">
              <Scene
                color={finish.color}
                accent={finish.accent}
                metalness={finish.metalness}
                roughness={finish.roughness}
                spinSpeed={0.45}
                controls="presentation"
                exploded={exploded}
                showAnnotations
                cameraPosition={[0, 0.2, exploded ? 6.2 : 5]}
                fov={32}
              />

              <div className="absolute top-5 left-5 flex gap-2">
                <span className="px-3 py-1.5 rounded-full bg-ink-900/70 backdrop-blur border border-white/10 text-[11px] uppercase tracking-[0.25em] text-white/80">
                  Drag
                </span>
                <span className="px-3 py-1.5 rounded-full bg-ink-900/70 backdrop-blur border border-white/10 text-[11px] uppercase tracking-[0.25em] text-white/80">
                  Hover parts
                </span>
              </div>

              <button
                onClick={() => setExploded((e) => !e)}
                className={`absolute top-5 right-5 px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] transition border ${
                  exploded
                    ? 'bg-accent text-ink-900 border-accent'
                    : 'bg-ink-900/70 backdrop-blur border-white/10 text-white/85 hover:bg-ink-900'
                }`}
              >
                {exploded ? '✕ Reassemble' : 'Exploded view'}
              </button>

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <div className="font-display text-2xl tracking-tight">SONUS Mark IV</div>
                  <div className="text-sm text-white/55">{finish.name} · {cushion.name.split(' ').slice(-1)[0]}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-white/50">Total</div>
                  <div className="font-display text-2xl">${total}</div>
                </div>
              </div>
            </div>

            {/* Configurator */}
            <div className="space-y-10">
              {/* Finish */}
              <Group title="Finish" subtitle={finish.name}>
                <div className="grid grid-cols-3 gap-2.5">
                  {FINISHES.map((f) => {
                    const active = f.id === finish.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setFinish(f)}
                        title={f.name}
                        className={`group relative aspect-square rounded-xl border transition overflow-hidden ${
                          active
                            ? 'border-accent ring-2 ring-accent/30'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <span
                          className="absolute inset-0"
                          style={{
                            background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.4), transparent 55%), ${f.color}`,
                          }}
                        />
                        <span className="absolute bottom-1.5 left-2 text-[10px] uppercase tracking-[0.2em] text-white/90 mix-blend-difference">
                          {f.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Group>

              {/* Cushion */}
              <Group title="Cushion" subtitle={cushion.name}>
                <div className="space-y-2">
                  {CUSHIONS.map((c) => {
                    const active = c.id === cushion.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setCushion(c)}
                        className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                          active
                            ? 'border-accent bg-accent/[0.05]'
                            : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-sm">{c.name}</div>
                          <div className="text-xs text-white/45 mt-0.5">{c.sub}</div>
                        </div>
                        <span className={`w-2 h-2 rounded-full ${active ? 'bg-accent' : 'bg-white/20'}`} />
                      </button>
                    );
                  })}
                </div>
              </Group>

              {/* Engraving */}
              <Group title="Engraving" subtitle={engraving || 'Optional'}>
                <input
                  value={engraving}
                  maxLength={ENGRAVING_LIMIT}
                  onChange={(e) => setEngraving(e.target.value)}
                  placeholder="A name, a date, a coordinate"
                  className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] focus:bg-white/[0.05] focus:border-white/30 outline-none text-sm placeholder-white/30 transition"
                />
                <div className="text-xs text-white/40 mt-2">
                  {engraving.length}/{ENGRAVING_LIMIT} characters · Engraved on the headband interior. No additional cost.
                </div>
              </Group>

              {/* CTA */}
              <div className="space-y-3 pt-2">
                <button className="w-full px-6 py-4 rounded-full bg-accent text-ink-900 font-medium hover:scale-[1.01] active:scale-[0.99] transition glow-accent">
                  Add to bag — ${total}
                </button>
                <p className="text-xs text-white/40 text-center">
                  Ships within 48 hours · 30-day returns · 2-year warranty
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs strip */}
      <section className="border-y border-white/5 py-12 bg-white/[0.01]">
        <div className="shell grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ['60h', 'Battery (ANC off)'],
            ['248g', 'Weight'],
            ['40mm', 'Beryllium drivers'],
            ['6×', 'Beamforming microphones'],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-3xl md:text-4xl tracking-tight">{v}</div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/45 mt-2">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Specifications */}
      <section className="py-32">
        <div className="shell max-w-4xl">
          <p className="eyebrow mb-3">Specifications</p>
          <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tightest mb-12">
            For the people who like <span className="italic-display text-white/40">numbers.</span>
          </h2>
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {[
              ['Driver', '40 mm beryllium-coated dynamic'],
              ['Frequency response', '4 Hz – 40 kHz'],
              ['Impedance', '32 Ω'],
              ['Sensitivity', '105 dB SPL / mW'],
              ['Codecs', 'aptX Lossless · LDAC · AAC · LC3'],
              ['Battery', '60 h ANC off · 42 h ANC on'],
              ['Charge', 'USB-C · 5 min = 4 h playback'],
              ['Bluetooth', '5.4 with multipoint'],
              ['Microphones', '6× MEMS with beamforming'],
              ['Weight', '248 g'],
              ['Materials', '6000-series aluminium · leather · recycled foam'],
              ['Warranty', '2 years, parts and labour'],
              ['In the box', 'Headphones · USB-C cable · 3.5mm cable · travel case · cleaning cloth · numbered passport'],
            ].map(([k, v]) => (
              <div key={k} className="grid md:grid-cols-[220px_1fr] gap-2 py-4 px-2 hover:bg-white/[0.02] transition">
                <dt className="text-xs uppercase tracking-[0.25em] text-white/45">{k}</dt>
                <dd className="text-base text-white/90">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="pb-32">
        <div className="shell">
          <p className="eyebrow mb-6">You might also need</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Travel case', body: 'Hard-shell, vegan leather exterior.', price: '$59' },
              { name: 'Replacement cushions', body: 'Same fit, choose your material.', price: '$45' },
              { name: '3.5mm cable, braided', body: 'Hand-built in Porto. 1.5m.', price: '$35' },
            ].map((p) => (
              <div key={p.name} className="p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition">
                <div className="font-display text-xl font-medium mb-2">{p.name}</div>
                <p className="text-sm text-white/55 leading-relaxed mb-6">{p.body}</p>
                <div className="flex justify-between items-center">
                  <span className="font-display text-lg">{p.price}</span>
                  <button className="text-xs uppercase tracking-[0.25em] text-white/55 hover:text-accent transition">Add →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Group({ title, subtitle, children }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-xs uppercase tracking-[0.3em] text-white/55">{title}</h3>
        <span className="text-xs text-white/40">{subtitle}</span>
      </div>
      {children}
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="pt-24 pb-6 border-b border-white/5">
      <div className="shell text-xs text-white/40">
        <Link to="/" className="hover:text-white/70 transition">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/headphones" className="hover:text-white/70 transition">Headphones</Link>
        <span className="mx-2">/</span>
        <span className="text-white/70">Mark IV</span>
      </div>
    </div>
  );
}
