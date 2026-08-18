import Link from 'next/link'
import NavBar from '../components/NavBar'
import ContactMenu from '../components/ContactMenu'
import aboutData from '../../data/about.json'
import contactData from '../../data/contact.json'

export const metadata = {
  title: 'About — Viz Creative',
  description: 'Viz Creative is an interior design and 3D visualization studio based in Abuja, Nigeria.',
}

export default function AboutPage() {
  const { intro, process } = aboutData as { intro: string[]; process: { title: string; description: string }[] }
  const { email, whatsappNumber } = contactData as { email: string; whatsappNumber: string }
  const contactMethods = [
    { label: 'WhatsApp', href: `https://wa.me/${whatsappNumber}` },
    { label: 'Email', href: `mailto:${email}` },
  ]

  return (
    <div className="min-h-screen bg-brand-500 text-white selection:bg-white selection:text-brand-500">
      <NavBar forceLight />

      <header className="pt-40 pb-16 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-6">Who We Are</p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight leading-tight max-w-3xl">
            Interior design and architectural visualization, built around how spaces are actually used.
          </h1>
        </div>
      </header>

      <section className="py-24 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-widest text-white/50">Introduction</p>
          </div>
          <div className="lg:col-span-8 space-y-5 text-white/70 font-light leading-relaxed text-sm md:text-base max-w-3xl">
            {intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-widest text-white/50">How We Work</p>
          </div>
          <div className="lg:col-span-8 divide-y divide-white/10">
            {process.map((step, i) => (
              <div key={step.title} className="py-8 first:pt-0 flex gap-6">
                <span className="text-xs text-white/30 tabular-nums pt-1">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-body text-base font-normal text-white">{step.title}</h3>
                  <p className="text-sm font-light text-white/70 leading-relaxed mt-2 max-w-xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-6">Collaboration</p>
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight max-w-2xl mb-12 leading-tight">
            Have a project in mind? Let's talk it through.
          </h2>
          <div className="max-w-xs">
            <ContactMenu label="Get in Touch" methods={contactMethods} variant="button-dark" />
          </div>
        </div>
      </section>

      <footer className="bg-brand-600 text-white/50 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12 flex justify-between items-center border-t border-white/10">
        <p>© 2026 Viz Creative. All rights reserved.</p>
        <Link href="/" className="hover:text-white transition-colors">Back to Home</Link>
      </footer>
    </div>
  )
}