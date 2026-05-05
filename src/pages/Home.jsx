import { Link } from 'react-router-dom';
import Scene from '../3d/Scene';

export default function Home() {
  return (
    <>
      <Hero />
      <PullQuote />
      <FeatureRow />
      <CompareTeaser />
      <Press />
    </>
  );
}

/* ----------------------------- HERO --------------------------------- */

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,255,62,0.07),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(85,120,255,0.10),transparent_50%)]" />
        <div className="absolute inset-0 grain opacity-30" />
      </div>

      <div className="absolute inset-0">
        <Scene
          color="#1a1a1d"
          accent="#b0b0b4"
          metalness={0.35}
          roughness={0.45}
          spinSpeed={0.22}
          controls="presentation"
        />
      </div>

      <div className="relative z-10 shell pt-28 pb-20 w-full pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs uppercase tracking-[0.3em] text-white/70 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
            Mark IV — Now shipping
          </span>

          <h1 className="font-display font-medium text-[3.5rem] md:text-[6.5rem] leading-[0.95] tracking-tightest text-balance mb-6">
            Sound, <span className="italic-display text-accent">sculpted.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/65 max-w-xl leading-relaxed mb-10">
            Studio-grade wireless headphones engineered around a single
            principle — get out of the way of the music.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/headphones/mark-iv"
              className="px-7 py-3.5 rounded-full bg-accent text-ink-900 font-medium hover:scale-[1.02] active:scale-[0.99] transition glow-accent"
            >
              Configure Mark IV
            </Link>
            <Link
              to="/technology"
              className="px-7 py-3.5 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
            >
              The technology →
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.4em] text-white/35 z-10 pointer-events-none">
        Drag to explore — scroll to read
      </div>
    </section>
  );
}

/* ------------------------- PULL QUOTE ------------------------------- */

function PullQuote() {
  return (
    <section className="relative py-32 border-t border-white/5">
      <div className="shell">
        <p className="eyebrow mb-6">A note from our acoustic engineers</p>
        <p className="font-display font-light text-3xl md:text-5xl leading-[1.15] tracking-tight max-w-4xl text-balance">
          We started with a question — <span className="italic-display text-white/50">what if every headphone you've owned was getting in the way?</span> Six years and two patents later, we have an answer.
        </p>
        <div className="flex items-center gap-3 mt-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-dim" />
          <div>
            <div className="font-medium">Tomás Reis</div>
            <div className="text-sm text-white/50">Co-founder, Acoustics Lead</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- FEATURE ROW ------------------------------ */

const FEATURES = [
  {
    n: '01',
    title: 'Beryllium drivers',
    body: 'Custom 40mm drivers with beryllium-coated diaphragms — stiffer, lighter, transient-honest.',
  },
  {
    n: '02',
    title: 'Adaptive ANC',
    body: 'Six microphones map your environment 48,000 times a second. The cabin you wanted, wherever you are.',
  },
  {
    n: '03',
    title: '60-hour battery',
    body: 'A weekend, a week, a long-haul flight, then home. Five-minute fast charge buys you four hours.',
  },
  {
    n: '04',
    title: 'Aerospace build',
    body: '6000-series aluminium, vegetable-tanned leather, replaceable cables. Built to outlast trends.',
  },
];

function FeatureRow() {
  return (
    <section className="relative py-32 border-t border-white/5">
      <div className="shell">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Engineering</p>
            <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tightest text-balance">
              Six years.<br />
              <span className="italic-display text-white/40">Two patents.</span>{' '}
              One obsession.
            </h2>
          </div>
          <Link
            to="/technology"
            className="self-start md:self-end text-sm text-white/55 hover:text-white transition"
          >
            Read the engineering paper →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {FEATURES.map((f) => (
            <div
              key={f.n}
              className="bg-ink-900 p-10 hover:bg-ink-800 transition group"
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-display text-accent text-sm">{f.n}</span>
                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight">
                  {f.title}
                </h3>
              </div>
              <p className="text-white/60 leading-relaxed max-w-md ml-9">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- COMPARE -------------------------------- */

function CompareTeaser() {
  return (
    <section className="relative py-32 border-t border-white/5">
      <div className="shell">
        <p className="eyebrow mb-4">The Sonus lineup</p>
        <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tightest mb-16 max-w-3xl text-balance">
          One philosophy. <span className="italic-display text-white/40">Three expressions.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Mark III', tag: 'Refurbished', price: '$249', body: 'Our previous flagship, expertly restored.' },
            { name: 'Mark IV', tag: 'Flagship', price: '$349', body: 'The reference for over-ear wireless audio.', featured: true },
            { name: 'Mark IV Pro', tag: 'Studio', price: '$599', body: 'Wired-only. Calibrated for mastering.' },
          ].map((m) => (
            <div
              key={m.name}
              className={`p-8 rounded-2xl border transition ${
                m.featured
                  ? 'border-accent/40 bg-accent/[0.04]'
                  : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex justify-between items-baseline mb-8">
                <span className="text-xs uppercase tracking-[0.3em] text-white/50">{m.tag}</span>
                <span className="font-display text-lg">{m.price}</span>
              </div>
              <h3 className="font-display text-3xl font-medium tracking-tight mb-3">{m.name}</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-8">{m.body}</p>
              <Link
                to="/headphones"
                className={`text-sm transition ${
                  m.featured ? 'text-accent hover:text-white' : 'text-white/55 hover:text-white'
                }`}
              >
                Discover →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- PRESS --------------------------------- */

function Press() {
  const quotes = [
    { q: '"The most honest headphone we\'ve tested this year."', src: 'Stereophile' },
    { q: '"Build quality that humbles competitors twice the price."', src: 'What Hi-Fi?' },
    { q: '"You forget you\'re wearing them. Then you forget they\'re wireless."', src: 'The Verge' },
  ];
  return (
    <section className="relative py-32 border-t border-white/5">
      <div className="shell">
        <p className="eyebrow mb-12">Reviewers, editors, listeners</p>
        <div className="grid md:grid-cols-3 gap-10">
          {quotes.map((q, i) => (
            <figure key={i} className="border-t border-white/10 pt-8">
              <blockquote className="font-display text-xl md:text-2xl font-light leading-snug mb-6 text-balance">
                {q.q}
              </blockquote>
              <figcaption className="text-xs uppercase tracking-[0.3em] text-white/45">
                {q.src}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
