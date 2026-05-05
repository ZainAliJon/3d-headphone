export default function Footer() {
  return (
    <footer className="relative pt-24 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* CTA banner */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-800 px-8 md:px-16 py-16 mb-20">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
          <div className="relative max-w-xl">
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-balance">
              Hear what you've been missing.
            </h2>
            <p className="text-white/60 mb-8">
              Order today, ships within 48 hours. 30-day return window — no questions, no restocking fees.
            </p>
            <a
              href="#shop"
              className="inline-block px-8 py-4 rounded-full bg-accent text-ink-900 font-semibold hover:scale-[1.02] transition glow-accent"
            >
              Order SONUS Mark IV — $349
            </a>
          </div>
        </div>

        {/* Footer columns */}
        <div className="grid md:grid-cols-4 gap-10 pb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_#c8ff3e]" />
              <span className="font-display tracking-[0.3em] font-semibold">SONUS</span>
            </div>
            <p className="text-sm text-white/50 max-w-xs">
              Independent audio company designing and assembling in Lisbon, Portugal.
            </p>
          </div>

          <FooterCol
            title="Product"
            links={['Mark IV', 'Mark III (refurb)', 'Cables', 'Cushions', 'Travel case']}
          />
          <FooterCol
            title="Support"
            links={['Help center', 'Repairs', 'Warranty', 'Care guide', 'Contact']}
          />
          <FooterCol
            title="Company"
            links={['Story', 'Engineering', 'Reviewers', 'Press', 'Careers']}
          />
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row gap-4 justify-between text-xs text-white/40">
          <p>© 2026 Sonus Audio Lda. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><a href="#" className="hover:text-white/70">Privacy</a></li>
            <li><a href="#" className="hover:text-white/70">Terms</a></li>
            <li><a href="#" className="hover:text-white/70">Cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
        {title}
      </div>
      <ul className="space-y-2.5 text-sm text-white/80">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-accent transition">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
