import { NavLink, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LINKS = [
  { to: '/headphones', label: 'Headphones' },
  { to: '/technology', label: 'Technology' },
  { to: '/support', label: 'Support' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-ink-900/70 border-b border-white/5'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="shell h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_14px_#c8ff3e]" />
          <span className="font-display text-base font-medium tracking-[0.45em]">SONUS</span>
        </Link>

        <ul className="hidden md:flex items-center gap-9 text-sm">
          {LINKS.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `transition tracking-tight ${
                    isActive ? 'text-white' : 'text-white/55 hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/support"
            className="hidden md:inline text-sm text-white/55 hover:text-white transition"
          >
            Account
          </Link>
          <Link
            to="/headphones/mark-iv"
            className="text-sm bg-white text-ink-900 px-4 py-2 rounded-full font-medium hover:bg-accent transition"
          >
            Buy
          </Link>
        </div>
      </div>
    </nav>
  );
}
