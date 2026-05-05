import Scene from '../3d/Scene';

export default function Technology() {
  return (
    <>
      <header className="pt-36 pb-20 border-b border-white/5">
        <div className="shell">
          <p className="eyebrow mb-5">Technology</p>
          <h1 className="font-display font-medium text-5xl md:text-7xl tracking-tightest text-balance max-w-4xl mb-8">
            How we made the music <span className="italic-display text-white/45">disappear.</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
            A reference headphone is the absence of the headphone. Six years
            of acoustic engineering, distilled into 248 grams of aluminium
            and leather.
          </p>
        </div>
      </header>

      {/* Section 1 — Drivers */}
      <Section
        eyebrow="The driver"
        title="A diaphragm that gets out of its own way."
        body={
          <>
            <p className="mb-4">
              Beryllium has the highest specific stiffness of any metal in
              widespread use — eighty percent stiffer than titanium at half
              the weight. We sputter-coat each 40 mm diaphragm with a 0.2 µm
              beryllium layer, then anneal in vacuum at 600°C.
            </p>
            <p>
              The result is a transient response that resolves cymbals as
              cymbals — never as smudge.
            </p>
          </>
        }
        right={<DriverDiagram />}
      />

      {/* Visual break with 3D */}
      <section className="relative py-28 border-y border-white/5 bg-gradient-to-b from-ink-900 via-ink-800/50 to-ink-900">
        <div className="shell grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow mb-3">The architecture</p>
            <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tightest mb-6">
              Anatomy of a <span className="italic-display text-white/40">Mark IV.</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8 max-w-md">
              Drag to rotate. Hover the model to read each component.
              Every part is replaceable, every cable is detachable, every
              cushion lifts off without tools.
            </p>
            <ul className="space-y-3 text-sm">
              {[
                'Anodised 6000-series aluminium ear cup',
                'Vegetable-tanned leather cushion (replaceable)',
                'Beryllium-coated 40 mm dynamic driver',
                'Cold-forged stainless steel pivot',
                'Padded leather headband, replaceable',
              ].map((l) => (
                <li key={l} className="flex items-start gap-3 text-white/70">
                  <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-square rounded-3xl border border-white/10 overflow-hidden bg-ink-900">
            <Scene
              color="#0e0e11"
              accent="#c8ff3e"
              metalness={0.55}
              roughness={0.32}
              spinSpeed={0.35}
              controls="presentation"
              showAnnotations
              cameraPosition={[0, 0.2, 5]}
              fov={32}
            />
          </div>
        </div>
      </section>

      {/* Section 2 — ANC */}
      <Section
        eyebrow="Adaptive ANC"
        title="The cabin you wanted, wherever you are."
        reverse
        body={
          <>
            <p className="mb-4">
              Six MEMS microphones — four feed-forward, two feed-back — sample
              the world at 48 kHz. A custom DSP runs a 256-tap adaptive filter
              that updates 48,000 times per second.
            </p>
            <p>
              The headphones learn your environment in three breaths.
              Engine drone disappears. Speech remains.
            </p>
          </>
        }
        right={<AncDiagram />}
      />

      {/* Section 3 — Sustainability */}
      <Section
        eyebrow="Built to last"
        title="Repairable. Replaceable. Recyclable."
        body={
          <>
            <p className="mb-4">
              Every component is replaceable with a Torx-15 driver. We
              stock service parts for ten years. Cushions, batteries,
              cables, even drivers — all available, all installable at
              home.
            </p>
            <p>
              When a Mark IV reaches end of life, send it back. We reuse
              what we can and recycle the rest.
            </p>
          </>
        }
        right={<SustainGrid />}
      />

      {/* Stats band */}
      <section className="py-24 border-t border-white/5 bg-white/[0.01]">
        <div className="shell grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            ['80%', 'Stiffer diaphragm than titanium'],
            ['48,000×', 'ANC samples per second'],
            ['10 yrs', 'Service-parts availability'],
            ['96%', 'Of materials are recyclable'],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-4xl md:text-5xl tracking-tightest">{v}</div>
              <div className="text-xs uppercase tracking-[0.25em] text-white/45 mt-3 max-w-[180px] leading-relaxed">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-32 border-t border-white/5">
        <div className="shell max-w-3xl">
          <p className="eyebrow mb-6">The Sonus manifesto</p>
          <div className="space-y-6 font-display text-2xl md:text-3xl font-light leading-snug tracking-tight">
            <p>We do not make accessories.</p>
            <p>We make instruments — for listening.</p>
            <p>An instrument is repairable. So are ours.</p>
            <p>An instrument lasts. So do ours.</p>
            <p>An instrument disappears in the playing. So does ours.</p>
            <p className="italic-display text-accent pt-4">— Sonus, since 2019.</p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ----------------------------------------------------------------- */

function Section({ eyebrow, title, body, right, reverse }) {
  return (
    <section className="py-28 border-t border-white/5">
      <div className={`shell grid md:grid-cols-2 gap-16 items-start ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tightest mb-8 text-balance">
            {title}
          </h2>
          <div className="text-white/65 leading-relaxed text-lg max-w-md">{body}</div>
        </div>
        <div className="md:pl-12">{right}</div>
      </div>
    </section>
  );
}

function DriverDiagram() {
  return (
    <div className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 grid place-items-center p-12">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {[90, 70, 50, 30].map((r, i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="#c8ff3e"
            strokeWidth="0.6"
            opacity={0.15 + i * 0.18}
          />
        ))}
        <circle cx="100" cy="100" r="14" fill="#c8ff3e" opacity="0.85" />
        <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

function AncDiagram() {
  return (
    <div className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-10 grid place-items-center">
      <svg viewBox="0 0 220 200" className="w-full h-full">
        {[...Array(12)].map((_, i) => {
          const x = 20 + (i * 16);
          const h = 10 + Math.abs(Math.sin(i * 0.7)) * 70;
          return (
            <rect
              key={i}
              x={x}
              y={100 - h / 2}
              width="6"
              height={h}
              fill="rgba(255,255,255,0.12)"
              rx="2"
            />
          );
        })}
        {[...Array(12)].map((_, i) => {
          const x = 20 + (i * 16) + 2.5;
          const h = 6 + Math.abs(Math.sin(i * 0.7 + 1.5)) * 14;
          return (
            <rect
              key={`a-${i}`}
              x={x - 2.5}
              y={100 - h / 2}
              width="6"
              height={h}
              fill="#c8ff3e"
              rx="2"
            />
          );
        })}
        <text x="20" y="20" fill="rgba(255,255,255,0.4)" fontSize="9" letterSpacing="2">INPUT</text>
        <text x="120" y="190" fill="#c8ff3e" fontSize="9" letterSpacing="2">RESIDUAL</text>
      </svg>
    </div>
  );
}

function SustainGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { l: 'Cushions', v: '$45' },
        { l: 'Battery', v: '$60' },
        { l: 'Cables', v: '$25' },
        { l: 'Drivers', v: '$120' },
        { l: 'Headband', v: '$40' },
        { l: 'Pivots', v: '$15' },
      ].map((p) => (
        <div key={p.l} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="text-xs uppercase tracking-[0.25em] text-white/45">{p.l}</div>
          <div className="font-display text-xl mt-2">{p.v}</div>
        </div>
      ))}
    </div>
  );
}
