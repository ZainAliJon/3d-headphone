import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-10 border-t border-white/5">
      <div className="shell">
        {/* CTA banner */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-800 px-8 md:px-16 py-16 mb-20">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
          <div className="relative max-w-xl">
            <p className="eyebrow mb-3">Mark IV — In stock</p>
            <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tightest mb-4 text-balance">
              Hear what you've <span className="italic-display text-accent">been missing.</span>
            </h2>
            <p className="text-white/60 mb-8 max-w-md leading-relaxed">
              Order today, ships within 48 hours from Lisbon. Thirty-day return window — no questions, no restocking fees.
            </p>
            <Link
              to="/headphones/mark-iv"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-ink-900 font-medium hover:scale-[1.02] transition glow-accent"
            >
              Configure yours →
            </Link>
          </div>
        </div>

        {/* Footer columns */}
        <div className="grid md:grid-cols-12 gap-10 pb-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_12px_#c8ff3e]" />
              <span className="font-display tracking-[0.45em] font-medium">SONUS</span>
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed mb-6">
              Independent audio company designing and assembling in Lisbon, Portugal. Established 2019.
            </p>
            <div className="flex gap-3">
              {['Twitter', 'Instagram', 'YouTube'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 grid place-items-center text-white/60 text-xs"
                  aria-label={s}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <FooterCol title="Headphones" links={[
              { l: 'Mark IV', to: '/headphones/mark-iv' },
              { l: 'All models', to: '/headphones' },
            ]} />
          </div>
          <div className="md:col-span-2">
            <FooterCol title="Inside" links={[
              { l: 'Technology', to: '/technology' },
              { l: 'Story', to: '/technology' },
              { l: 'Press', to: '/technology' },
            ]} />
          </div>
          <div className="md:col-span-2">
            <FooterCol title="Support" links={[
              { l: 'Help center', to: '/support' },
              { l: 'Repairs', to: '/support' },
              { l: 'Warranty', to: '/support' },
              { l: 'Contact', to: '/support' },
            ]} />
          </div>
          <div className="md:col-span-2">
            <FooterCol title="Company" links={[
              { l: 'Careers', to: '/support' },
              { l: 'Sustainability', to: '/technology' },
              { l: 'Reviewers', to: '/support' },
            ]} />
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row gap-4 justify-between text-xs text-white/40">
          <p>© 2026 Sonus Audio Lda. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><a href="#" className="hover:text-white/70">Privacy</a></li>
            <li><a href="#" className="hover:text-white/70">Terms</a></li>
            <li><a href="#" className="hover:text-white/70">Cookies</a></li>
            <li><a href="#" className="hover:text-white/70">Accessibility</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <>
      <div className="text-xs uppercase tracking-[0.3em] text-white/45 mb-4">
        {title}
      </div>
      <ul className="space-y-2.5 text-sm text-white/80">
        {links.map((l) => (
          <li key={l.l}>
            <Link to={l.to} className="hover:text-accent transition">
              {l.l}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
