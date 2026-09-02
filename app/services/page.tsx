import Link from 'next/link'
import NavBar from '../components/NavBar'
import ContactMenu from '../components/ContactMenu'
import servicesData from '../../data/services.json'
import contactData from '../../data/contact.json'
import siteData from '../../data/site.json'

export const metadata = {
  title: servicesData.seo.title,
  description: servicesData.seo.description,
}

export default function ServicesPage() {
  const { hero, intro, services, clientGroups, audienceLabel, brief, cta } = servicesData
  const { email, whatsappNumber } = contactData as { email: string; whatsappNumber: string }
  const contactMethods = [
    { label: 'WhatsApp', href: `https://wa.me/${whatsappNumber}` },
    { label: 'Email', href: `mailto:${email}` },
  ]

  return (
    <div className="min-h-screen bg-brand-500 text-white selection:bg-white selection:text-brand-500">
      <NavBar forceLight />

      <header data-motion-section className="subpage-hero pt-40 pb-16 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-6">{hero.label}</p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-tight leading-tight max-w-3xl">
            {hero.heading}
          </h1>
        </div>
      </header>

      <section data-motion-section className="py-24 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-widest text-white/50">{intro.label}</p>
            <p className="text-sm font-light text-white/50 mt-4 max-w-xs">
              {intro.description}
            </p>
          </div>
          <div className="lg:col-span-8 divide-y divide-white/10">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="py-8 first:pt-0 flex flex-col md:flex-row md:justify-between md:items-start gap-3"
              >
                <div className="flex gap-4 md:gap-6">
                  <span className="text-xs text-white/30 tabular-nums pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-body text-base font-normal text-white">{service.title}</h3>
                    <p className="text-sm font-light text-white/70 leading-relaxed mt-2 max-w-xl">
                      {service.description}
                    </p>
                  </div>
                </div>
                <ContactMenu
                  label={intro.enquiryLabel}
                  methods={contactMethods}
                  align="right"
                  className="shrink-0 ml-10 md:ml-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-motion-section className="service-fit page-pad">
        <div className="section-rule"><span>{audienceLabel}</span><span>02</span></div>
        <div className="service-fit-grid">
          {clientGroups.map((group, index) => (
            <article data-motion-card key={group.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section data-motion-section className="service-brief page-pad">
        <div className="service-brief-copy">
          <p>{brief.label}</p>
          <h2>{brief.heading}</h2>
          <span>{brief.description}</span>
        </div>
        <ol>
          {brief.items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}
        </ol>
      </section>

      <section data-motion-section className="subpage-cta py-32 px-6 md:px-12 bg-brand-600 text-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-6">{cta.label}</p>
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-tight max-w-2xl mb-12 leading-tight">
            {cta.heading}
          </h2>
          <div className="max-w-xs">
            <ContactMenu label={cta.buttonLabel} methods={contactMethods} variant="button-dark" />
          </div>
        </div>
      </section>

      <footer className="bg-brand-600 text-white/50 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12 flex justify-between items-center border-t border-white/10">
        <p>{siteData.footer.copyright}</p>
        <Link href="/" className="hover:text-white transition-colors">Back to Home</Link>
      </footer>
    </div>
  )
}
