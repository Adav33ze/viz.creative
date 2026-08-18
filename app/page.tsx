import Link from 'next/link'
import NavBar from './components/NavBar'
import ContactMenu from './components/ContactMenu'
import heroData from '../data/hero.json'
import aboutData from '../data/about.json'
import servicesData from '../data/services.json'
import portfolioData from '../data/portfolio.json'
import contactData from '../data/contact.json'

export const metadata = {
  title: 'Viz Creative — Interior Design & 3D Visualization',
  description:
    'Viz Creative is an interior design and architectural visualization studio based in Abuja, Nigeria.',
}

export default function Home() {
  const projects = portfolioData.projects
  const { intro, process } = aboutData as { intro: string[]; process: { title: string; description: string }[] }
  const { services } = servicesData as { services: { title: string; description: string }[] }

  const { email, whatsappNumber, phoneDisplay } = contactData as {
    email: string
    whatsappNumber: string
    phoneDisplay: string
  }
  const contactMethods = [
    { label: 'WhatsApp', href: `https://wa.me/${whatsappNumber}` },
    { label: 'Call', href: `tel:${phoneDisplay.replace(/\s/g, '')}` },
    { label: 'Email', href: `mailto:${email}` },
  ]

  return (
    <div className="min-h-screen bg-brand-500 text-white selection:bg-white selection:text-brand-500">
      <NavBar heroGradient />

      {/* HERO */}
      <section data-motion-hero className="relative h-screen w-full bg-brand-600 flex items-end p-6 md:p-12 overflow-hidden">
        <img
          src={heroData.image.startsWith('/') ? heroData.image : `/${heroData.image}`}
          alt={heroData.alt}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-600 via-brand-600/40 to-transparent" />
        <div data-hero-content className="relative z-10 max-w-3xl">
          <h1 className="font-display text-5xl md:text-8xl text-white font-light tracking-tight leading-none drop-shadow-md">
            vizcreative
          </h1>
          <p className="font-body text-base md:text-2xl text-white/60 tracking-wide font-light mt-3 mb-6">
            /vɪz kriːˈeɪtɪv/ &nbsp; n.
          </p>
          <p className="font-display text-2xl md:text-4xl text-white/90 font-light italic leading-snug">
            spaces, visualized before they exist.
          </p>
          <p className="font-body text-sm md:text-base text-white/70 font-light mt-3 max-w-lg leading-relaxed">
            An interior design and 3D visualization studio working across residential, commercial, and hospitality projects in Nigeria and beyond.
          </p>
          <p className="font-body text-sm text-white/50 uppercase tracking-widest mt-4">
            Abuja, Nigeria
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="/work"
              className="text-xs uppercase tracking-widest bg-white text-brand-500 px-6 py-3 hover:bg-white/85 transition-colors"
            >
              View Work →
            </Link>
            <ContactMenu label="Get in Touch" methods={contactMethods} variant="button-dark" className="w-auto" />
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work" data-motion-section className="py-24 px-6 md:px-12 bg-brand-500">
        <div className="mb-16 flex justify-between items-end">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Selected Work</p>
            <h2 className="font-display text-4xl font-light">Projects</h2>
          </div>
          <Link
            href="/work"
            className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors border-b border-white/20 pb-1"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.slice(0, 4).map((project: any, index: number) => (
            <Link
              href={`/work/${project.slug}`}
              key={index}
              data-motion-card
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/2] w-full bg-white/5 overflow-hidden mb-6 transition-shadow duration-700 ease-out group-hover:shadow-2xl group-hover:-translate-y-1">
                <img
                  src={`/${project.image}`}
                  alt={project.alt_text}
                  data-motion-image
                  data-motion-zoom="strong"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col border-t border-white/10 pt-4 gap-3 md:flex-row md:justify-between md:items-start md:gap-0">
                <div>
                  <h3 className="font-body text-lg font-normal tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/50 mt-1">{project.location}</p>
                  {project.description && (
                    <p className="text-xs text-white/40 mt-2 font-light leading-relaxed max-w-xs">
                      {project.description}
                    </p>
                  )}
                </div>
                <span className="self-start text-xs font-light text-white/60 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full md:ml-4 md:shrink-0">
                  {project.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" data-motion-section className="py-32 px-6 md:px-12 bg-brand-600 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-white/50 mb-6">About</p>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-8 leading-tight">
              Interior design and architectural visualization, built around how spaces are actually used.
            </h2>
            <div className="space-y-5 text-white/70 font-light leading-relaxed text-sm md:text-base">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-12 flex gap-6 flex-wrap">
              <Link
                href="/about"
                className="text-xs uppercase tracking-widest border-b border-white pb-1 hover:opacity-50 transition-opacity"
              >
                Full Profile →
              </Link>
              <ContactMenu label="Get in Touch" methods={contactMethods} />
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
          {process.map((step, i) => (
            <div key={step.title} data-motion-card>
              <span className="text-xs text-white/30 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-body text-base font-normal text-white mt-2 mb-2">{step.title}</h3>
              <p className="text-sm font-light text-white/70 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section id="services" data-motion-section className="py-24 px-6 md:px-12 bg-brand-500 border-t border-white/10">
        <div className="mb-16 flex justify-between items-end">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Our Expertise</p>
            <h2 className="font-display text-4xl font-light">Services</h2>
          </div>
          <Link
            href="/services"
            className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors border-b border-white/20 pb-1"
          >
            View All →
          </Link>
        </div>
        <div className="divide-y divide-white/10">
          {services.slice(0, 4).map((service, i) => (
            <div key={service.title} className="py-8 first:pt-0 flex gap-6">
              <span className="text-xs text-white/30 tabular-nums pt-1">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-body text-base font-normal text-white">{service.title}</h3>
                <p className="text-sm font-light text-white/70 leading-relaxed mt-2 max-w-xl">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-12 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-6">Collaboration</p>
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight max-w-2xl mb-12 leading-tight">
            Got a vision or a bold project in mind? Let's bring it to life.
          </h2>
          <div className="max-w-xs">
            <ContactMenu label="Get in Touch" methods={contactMethods} variant="button-dark" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-600 text-white/50 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12 border-t border-white/10">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <p>© 2026 Viz Creative. All rights reserved.</p>
          <div className="flex flex-col gap-3 md:flex-row md:gap-6 md:items-center">
            <span className="text-white/40">{contactData.address}</span>
            <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}