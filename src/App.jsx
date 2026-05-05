import Nav from './components/Nav';
import Hero from './components/Hero';
import Configurator from './components/Configurator';
import Features from './components/Features';
import Specs from './components/Specs';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="relative bg-ink-900 text-white">
      <Nav />
      <Hero />
      <Configurator />
      <Features />
      <Specs />
      <Footer />
    </main>
  );
}
