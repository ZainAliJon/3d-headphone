import { useState } from 'react';

const FAQ = [
  {
    q: 'How long does shipping take?',
    a: 'Orders placed before 2pm Lisbon time ship the same day. UK and EU deliveries arrive within 2–3 working days; North America 3–5; Asia and Oceania 5–8.',
  },
  {
    q: 'What is your return policy?',
    a: 'Thirty days, no questions, no restocking fee. Listen at home, on a commute, in a studio. If they\'re not for you, send them back in the original packaging.',
  },
  {
    q: 'Are the headphones repairable?',
    a: 'Yes — every component is replaceable with a Torx-15 driver. We stock service parts for ten years. Send them in or repair at home.',
  },
  {
    q: 'How long does the battery last?',
    a: '60 hours with ANC off, 42 hours with ANC on. A five-minute fast charge buys you four hours of playback.',
  },
  {
    q: 'Can I use them wired?',
    a: 'Yes. Both 3.5mm and USB-C wired modes are supported. Audio bypasses the wireless DSP for a true direct path.',
  },
  {
    q: 'What\'s the warranty?',
    a: 'Two years, parts and labour, worldwide. Extendable to four years for €50 at checkout.',
  },
  {
    q: 'Do they support multipoint?',
    a: 'Yes, two devices simultaneously. Switch between phone and laptop without re-pairing.',
  },
];

export default function Support() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <>
      <header className="pt-36 pb-16 border-b border-white/5">
        <div className="shell">
          <p className="eyebrow mb-5">Support</p>
          <h1 className="font-display font-medium text-5xl md:text-7xl tracking-tightest text-balance max-w-4xl mb-6">
            We're here, <span className="italic-display text-white/40">whenever.</span>
          </h1>
          <p className="text-lg text-white/60 max-w-xl leading-relaxed">
            Real humans in Lisbon, Monday through Friday, 09:00 to 18:00 WET. We answer all messages within one business day.
          </p>
        </div>
      </header>

      {/* Quick channels */}
      <section className="py-20 border-b border-white/5">
        <div className="shell grid md:grid-cols-3 gap-4">
          {[
            { title: 'Email us', body: 'support@sonus.audio', cta: 'Compose →', detail: 'Replies within one business day.' },
            { title: 'Chat live', body: 'Mon–Fri · 09:00–18:00 WET', cta: 'Open chat →', detail: 'Average response under three minutes.' },
            { title: 'Book a call', body: '20-minute slots, free.', cta: 'Find a time →', detail: 'For setup help, fitting questions, or product advice.' },
          ].map((c) => (
            <div key={c.title} className="p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition group">
              <h3 className="font-display text-xl font-medium mb-2">{c.title}</h3>
              <p className="text-white/85 mb-3">{c.body}</p>
              <p className="text-xs text-white/45 mb-6 leading-relaxed">{c.detail}</p>
              <a href="#" className="text-sm text-accent hover:text-white transition">{c.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-b border-white/5">
        <div className="shell grid md:grid-cols-[260px_1fr] gap-12">
          <div>
            <p className="eyebrow mb-4">FAQ</p>
            <h2 className="font-display font-medium text-3xl tracking-tightest">
              Common <span className="italic-display text-white/40">questions.</span>
            </h2>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {FAQ.map((item, i) => {
              const open = i === openIdx;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    className="w-full flex items-center justify-between py-5 text-left hover:text-accent transition"
                  >
                    <span className="text-base md:text-lg font-medium pr-8">{item.q}</span>
                    <span className={`shrink-0 text-xl transition ${open ? 'rotate-45 text-accent' : 'text-white/40'}`}>+</span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      open ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-white/65 leading-relaxed max-w-2xl pr-8">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <ContactForm />

      {/* Locations */}
      <section className="py-24 border-t border-white/5">
        <div className="shell">
          <p className="eyebrow mb-3">Where to find us</p>
          <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tightest mb-12 max-w-2xl">
            Three workshops. <span className="italic-display text-white/40">One philosophy.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { city: 'Lisbon', role: 'Headquarters · Assembly', addr: 'Rua das Olarias 24, 1100-360' },
              { city: 'Tokyo', role: 'Service · APAC', addr: 'Shibuya 3-21-3, 150-0002' },
              { city: 'Brooklyn', role: 'Service · Americas', addr: '67 W 19th St, NY 11211' },
            ].map((l) => (
              <div key={l.city} className="p-7 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="font-display text-2xl mb-1">{l.city}</div>
                <div className="text-xs uppercase tracking-[0.25em] text-accent mb-4">{l.role}</div>
                <p className="text-sm text-white/55 leading-relaxed">{l.addr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-24">
      <div className="shell max-w-2xl">
        <p className="eyebrow mb-4">Or write to us</p>
        <h2 className="font-display font-medium text-3xl md:text-4xl tracking-tightest mb-10">
          We answer every message <span className="italic-display text-white/40">personally.</span>
        </h2>

        {submitted ? (
          <div className="p-8 rounded-2xl border border-accent/40 bg-accent/[0.05]">
            <div className="font-display text-xl mb-2">Thank you.</div>
            <p className="text-white/65 text-sm">
              You'll hear from us within one business day. We always reply
              from a real address — check your spam folder if it's quiet.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Name" placeholder="Your name" />
              <Input label="Email" type="email" placeholder="you@example.com" />
            </div>
            <Input label="Order number" placeholder="Optional · SO-1234" />
            <Textarea label="Message" placeholder="Tell us how we can help" />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-accent text-ink-900 font-medium hover:scale-[1.02] active:scale-[0.99] transition"
            >
              Send message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Input({ label, ...rest }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</span>
      <input
        {...rest}
        className="mt-2 w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] focus:bg-white/[0.05] focus:border-white/30 outline-none transition placeholder-white/30"
      />
    </label>
  );
}

function Textarea({ label, ...rest }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.25em] text-white/45">{label}</span>
      <textarea
        {...rest}
        rows={6}
        className="mt-2 w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] focus:bg-white/[0.05] focus:border-white/30 outline-none transition placeholder-white/30 resize-none"
      />
    </label>
  );
}
