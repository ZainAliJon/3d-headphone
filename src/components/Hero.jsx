import Scene from '../3d/Scene';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* Ambient gradient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,255,62,0.08),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(85,120,255,0.12),transparent_50%)]" />
        <div className="absolute inset-0 grain opacity-40" />
      </div>

      {/* 3D scene fills the hero */}
      <div className="absolute inset-0">
        <Scene
          color="#0f0f12"
          accent="#c8ff3e"
          metalness={0.5}
          roughness={0.32}
          spinSpeed={0.25}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20 w-full pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs uppercase tracking-[0.3em] text-white/70 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
            New — SONUS Mark IV
          </span>

          <h1 className="font-display font-semibold text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance mb-6">
            Sound, <span className="italic text-accent">sculpted.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-xl text-balance mb-8">
            Studio-grade wireless headphones engineered for the listener.
            40mm beryllium drivers, 60-hour battery, and adaptive ANC that
            disappears into the music.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#configurator"
              className="px-6 py-3 rounded-full bg-accent text-ink-900 font-semibold hover:scale-[1.02] active:scale-[0.99] transition glow-accent"
            >
              Configure yours
            </a>
            <a
              href="#features"
              className="px-6 py-3 rounded-full border border-white/15 bg-white/5 text-white hover:bg-white/10 transition"
            >
              See the details →
            </a>
          </div>

          <div className="mt-12 flex items-center gap-8 text-sm text-white/60">
            <Stat label="Battery" value="60h" />
            <Stat label="Drivers" value="40mm" />
            <Stat label="Weight" value="248g" />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-white/40 z-10">
        Scroll
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="font-display text-2xl text-white">{value}</div>
      <div className="text-xs uppercase tracking-[0.2em] text-white/50 mt-0.5">
        {label}
      </div>
    </div>
  );
}
