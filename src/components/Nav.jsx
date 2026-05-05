export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-ink-900/40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_12px_#c8ff3e]" />
          <span className="font-display text-lg tracking-[0.3em] font-semibold">SONUS</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <li><a className="hover:text-white transition" href="#configurator">Configurator</a></li>
          <li><a className="hover:text-white transition" href="#features">Features</a></li>
          <li><a className="hover:text-white transition" href="#specs">Specs</a></li>
          <li><a className="hover:text-white transition" href="#shop">Shop</a></li>
        </ul>

        <a
          href="#shop"
          className="text-sm bg-white text-ink-900 px-4 py-2 rounded-full font-medium hover:bg-accent transition"
        >
          Buy — $349
        </a>
      </div>
    </nav>
  );
}
