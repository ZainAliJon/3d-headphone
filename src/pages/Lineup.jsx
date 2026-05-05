import { Link } from 'react-router-dom';
import Scene from '../3d/Scene';

const MODELS = [
  {
    slug: 'mark-iv',
    name: 'Mark IV',
    tag: 'Flagship · Wireless',
    price: 349,
    body: 'Our reference over-ear. 60-hour battery, adaptive ANC, six anodised finishes.',
    color: '#1a1a1d',
    accent: '#b0b0b4',
    metalness: 0.35,
    roughness: 0.45,
    available: true,
  },
  {
    slug: 'mark-iv-pro',
    name: 'Mark IV Pro',
    tag: 'Studio · Wired',
    price: 599,
    body: 'Calibrated for mastering. Detachable XLR, custom-tuned 50mm drivers, removable everything.',
    color: '#0c0c0f',
    accent: '#7a7a80',
    metalness: 0.5,
    roughness: 0.38,
    available: true,
  },
  {
    slug: 'mark-iii-refurb',
    name: 'Mark III',
    tag: 'Refurbished · Limited',
    price: 249,
    body: 'Our previous flagship, expertly restored at our Lisbon workshop. New cushions, new battery, full warranty.',
    color: '#3a4a3d',
    accent: '#a3b6a5',
    metalness: 0.3,
    roughness: 0.5,
    available: true,
  },
];

export default function Lineup() {
  return (
    <>
      <header className="pt-36 pb-16 border-b border-white/5">
        <div className="shell">
          <p className="eyebrow mb-5">Headphones</p>
          <h1 className="font-display font-medium text-5xl md:text-7xl tracking-tightest text-balance max-w-4xl mb-6">
            Three headphones. <span className="italic-display text-white/45">One philosophy.</span>
          </h1>
          <p className="text-lg text-white/60 max-w-xl leading-relaxed">
            Every Sonus headphone is hand-assembled in Lisbon, individually
            measured, and sealed with a numbered passport.
          </p>
        </div>
      </header>

      <section className="py-20">
        <div className="shell space-y-24">
          {MODELS.map((m, i) => (
            <article
              key={m.slug}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                i % 2 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 overflow-hidden">
                <Scene
                  color={m.color}
                  accent={m.accent}
                  metalness={m.metalness}
                  roughness={m.roughness}
                  spinSpeed={0.4}
                  controls="presentation"
                  cameraPosition={[0, 0, 5.6]}
                  fov={32}
                />
              </div>
              <div>
                <p className="eyebrow mb-3" style={{ color: m.accent }}>{m.tag}</p>
                <h2 className="font-display font-medium text-4xl md:text-6xl tracking-tightest mb-5">
                  {m.name}
                </h2>
                <p className="text-white/65 leading-relaxed text-lg max-w-md mb-8">
                  {m.body}
                </p>

                <div className="flex items-baseline gap-3 mb-8">
                  <span className="font-display text-3xl">${m.price}</span>
                  <span className="text-sm text-white/50">incl. worldwide shipping</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/headphones/${m.slug === 'mark-iv' ? 'mark-iv' : 'mark-iv'}`}
                    className="px-6 py-3 rounded-full bg-accent text-ink-900 font-medium hover:scale-[1.02] transition"
                  >
                    {m.slug === 'mark-iv' ? 'Configure' : 'Notify me'}
                  </Link>
                  <Link
                    to="/headphones/mark-iv"
                    className="px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
                  >
                    Specifications →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
