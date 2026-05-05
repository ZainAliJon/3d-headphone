import { useState } from 'react';
import Scene from '../3d/Scene';

const FINISHES = [
  { id: 'graphite', name: 'Graphite',   color: '#0f0f12', accent: '#c8ff3e', metalness: 0.5, roughness: 0.32 },
  { id: 'porcelain', name: 'Porcelain', color: '#e9e6df', accent: '#1a1a1a', metalness: 0.15, roughness: 0.5 },
  { id: 'cobalt',   name: 'Cobalt',     color: '#1c2c5c', accent: '#7faaff', metalness: 0.55, roughness: 0.3 },
  { id: 'oxide',    name: 'Oxide',      color: '#7a2820', accent: '#ffb27a', metalness: 0.45, roughness: 0.38 },
  { id: 'sage',     name: 'Sage',       color: '#3a4a3d', accent: '#d4ffb4', metalness: 0.4, roughness: 0.42 },
  { id: 'champagne',name: 'Champagne',  color: '#caa56b', accent: '#1a1a1a', metalness: 0.85, roughness: 0.22 },
];

export default function Configurator() {
  const [selected, setSelected] = useState(FINISHES[0]);

  return (
    <section
      id="configurator"
      className="relative w-full py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent">
              Configurator
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-semibold mt-3 tracking-tight text-balance">
              Six finishes. <span className="text-white/40">One sound.</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md">
            Each finish is hand-anodised in our Lisbon workshop. Tap a swatch
            to preview yours — the live model rotates so you can inspect
            every angle.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-stretch">
          {/* 3D preview */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[560px] rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 overflow-hidden">
            <Scene
              color={selected.color}
              accent={selected.accent}
              metalness={selected.metalness}
              roughness={selected.roughness}
              spinSpeed={0.5}
              interactive
              cameraPosition={[0, 0.2, 5]}
              fov={32}
            />
            <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-ink-900/70 border border-white/10 backdrop-blur text-xs uppercase tracking-[0.25em] text-white/70">
              Drag to rotate
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <div className="font-display text-2xl">SONUS Mark IV</div>
                <div className="text-sm text-white/50">{selected.name} edition</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Price
                </div>
                <div className="font-display text-2xl">$349</div>
              </div>
            </div>
          </div>

          {/* Selector */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
              Finish — {selected.name}
            </div>
            {FINISHES.map((f) => {
              const active = f.id === selected.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelected(f)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition text-left ${
                    active
                      ? 'border-accent bg-accent/5'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <span
                    className="w-10 h-10 rounded-full border border-white/15 shrink-0 shadow-inner"
                    style={{
                      background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 55%), ${f.color}`,
                    }}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{f.name}</div>
                    <div className="text-xs text-white/50">
                      Anodised aluminium
                    </div>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      active ? 'bg-accent' : 'bg-white/20'
                    }`}
                  />
                </button>
              );
            })}

            <button
              id="shop"
              className="w-full mt-4 px-6 py-4 rounded-full bg-accent text-ink-900 font-semibold hover:scale-[1.01] active:scale-[0.99] transition glow-accent"
            >
              Add {selected.name} to bag — $349
            </button>
            <p className="text-xs text-white/40 text-center pt-1">
              Free worldwide shipping · 30-day returns · 2-year warranty
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
