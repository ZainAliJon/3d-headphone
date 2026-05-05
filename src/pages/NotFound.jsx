import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] grid place-items-center pt-20">
      <div className="shell text-center max-w-xl">
        <p className="eyebrow text-accent mb-6">404</p>
        <h1 className="font-display font-medium text-5xl md:text-7xl tracking-tightest mb-6">
          Off the <span className="italic-display text-white/40">trail.</span>
        </h1>
        <p className="text-white/60 mb-10 leading-relaxed">
          The page you were looking for doesn't exist — or has moved. Try the home page, or browse our headphones.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="px-6 py-3 rounded-full bg-accent text-ink-900 font-medium hover:scale-[1.02] transition">Home</Link>
          <Link to="/headphones" className="px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition">Headphones</Link>
        </div>
      </div>
    </section>
  );
}
