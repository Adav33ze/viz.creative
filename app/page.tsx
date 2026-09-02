import Link from 'next/link'
import type { CSSProperties } from 'react'
import NavBar from './components/NavBar'
import ContactMenu from './components/ContactMenu'
import heroData from '../data/hero.json'
import homeData from '../data/home.json'
import siteData from '../data/site.json'
import aboutData from '../data/about.json'
import servicesData from '../data/services.json'
import portfolioData from '../data/portfolio.json'
import contactData from '../data/contact.json'

export const metadata = {
  title: siteData.seo.title,
  description: siteData.seo.description,
}

interface HeroData {
  mode: 'single' | 'slideshow' | 'video'
  image: string
  video?: string
  videoPoster?: string
  alt: string
  slides: { image: string; alt: string }[]
}

function pathFor(path: string) {
  return path.startsWith('/') ? path : `/${path}`
}

function RevealText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className} data-text-reveal aria-label={text}>
      {text.split(/\s+/).map((word, index) => (
        <span className="reveal-word-clip" aria-hidden="true" key={`${word}-${index}`}>
          <span data-reveal-word>{word}</span>
        </span>
      ))}
    </span>
  )
}

export default function Home() {
  const projects = portfolioData.projects
    .filter((project) => project.published)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
  const { intro, process } = aboutData
  const { services } = servicesData as { services: { title: string; description: string }[] }
  const { hero: heroCopy, manifesto, showcase, outcomes, processIntro, capabilities, studio, contact } = homeData
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

  const rawHero = heroData as Partial<HeroData>
  const hero: HeroData = {
    mode: rawHero.mode ?? 'single',
    image: rawHero.image ?? '',
    alt: rawHero.alt ?? '',
    slides: rawHero.slides ?? [],
    video: rawHero.video,
    videoPoster: rawHero.videoPoster,
  }
  const isSlideshow = hero.mode === 'slideshow' && hero.slides.length > 1
  const isVideo = hero.mode === 'video' && Boolean(hero.video)
  const wordCycleStyle = { '--word-count': heroCopy.rotatingWords.length } as CSSProperties

  return (
    <div className="min-h-screen bg-brand-500 text-white selection:bg-accent selection:text-brand-700">
      <NavBar heroGradient />

      <section data-motion-hero-mask className="zoom-hero-shell">
        <div className="zoom-hero-sticky">
          <div data-hero-mask-frame className="zoom-hero-frame">
            {isVideo ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={pathFor(hero.videoPoster || hero.image)}
                className="zoom-hero-media"
              >
                <source src={pathFor(hero.video!)} />
              </video>
            ) : isSlideshow ? (
              hero.slides.map((slide, index) => (
                <img
                  key={slide.image}
                  src={pathFor(slide.image)}
                  alt={index === 0 ? slide.alt : ''}
                  className={`zoom-hero-media hero-slide ${index === 0 ? 'hero-slide--active' : ''}`}
                />
              ))
            ) : hero.image ? (
              <img src={pathFor(hero.image)} alt={hero.alt} className="zoom-hero-media" />
            ) : null}
            <div className="zoom-hero-shade" />
          </div>

          <div className="zoom-hero-content page-pad">
            <div className="zoom-hero-topline">
              <p>{heroCopy.serviceLine}</p>
              <p>{heroCopy.locationLine}</p>
            </div>
            <h1 className="zoom-hero-title" aria-label={`${heroCopy.lineOne} ${heroCopy.lineTwo} ${heroCopy.rotatingWords.join(', ')}`}>
              <span className="hero-line-clip"><span data-hero-line>{heroCopy.lineOne}</span></span>
              <span className="hero-line-clip zoom-hero-title-offset"><span data-hero-line>{heroCopy.lineTwo}</span></span>
              <span className="hero-line-clip hero-word-cycle-clip">
                <span data-hero-line className="hero-word-cycle" aria-hidden="true" style={wordCycleStyle}>
                  {heroCopy.rotatingWords.map((word, index) => (
                    <span key={`${word}-${index}`} style={{ '--word-index': index } as CSSProperties}>{word}</span>
                  ))}
                </span>
              </span>
            </h1>
            <div className="zoom-hero-bottom">
              <p>{heroCopy.description}</p>
              <div className="zoom-hero-actions">
                <Link href="/work">{heroCopy.workLinkLabel} <span>↘</span></Link>
                <ContactMenu label={heroCopy.contactLabel} methods={contactMethods} variant="button-dark" direction="up" className="w-auto" />
              </div>
            </div>
          </div>
          <div className="zoom-hero-index" aria-hidden="true">01 — 07</div>
        </div>
      </section>

      <main>
        <section data-motion-section className="manifesto page-pad">
          <div className="section-rule"><span>{manifesto.label}</span><span>01</span></div>
          <h2 className="manifesto-title">
            <RevealText text={manifesto.statement} />
          </h2>
          <div className="manifesto-foot">
            <p>{intro[0]} {intro[1]}</p>
            <span className="studio-seal" aria-hidden="true">VIZ<br />CRTV</span>
          </div>
        </section>

        <section id="work" data-motion-section className="showcase page-pad">
          <div className="section-rule section-rule-light"><span>{showcase.label}</span><span>02</span></div>
          <div className="showcase-heading">
            <h2>{showcase.heading}<br /><em>{showcase.headingEmphasis}</em></h2>
            <div>
              <p>{showcase.description}</p>
              <Link href="/work">{showcase.portfolioLinkLabel} ↗</Link>
            </div>
          </div>
          <Link href="/work" data-motion-card className="showcase-project group">
            <div className="showcase-project-media">
              <img
                src={pathFor(showcase.featured.image)}
                alt={showcase.featured.alt}
                data-portfolio-motion
              />
              <span className="showcase-project-signal" data-portfolio-signal aria-hidden="true" />
              <small>{showcase.featured.badge}</small>
              <span>{showcase.featured.linkLabel} ↗</span>
            </div>
            <div className="showcase-project-meta">
              <div><h3>{showcase.featured.title}</h3><p>{showcase.featured.category}</p></div>
              <p>{showcase.featured.location}</p>
            </div>
          </Link>
          {projects.length > 0 ? (
            <div className="showcase-secondary">
              {projects.slice(0, 3).map((project: any, index: number) => (
                <Link href={`/work/${project.slug}`} data-motion-card key={project.slug}>
                  <span>{String(index + 1).padStart(2, '0')}</span><h3>{project.title}</h3><p>{project.category}</p><i>↗</i>
                </Link>
              ))}
            </div>
          ) : null}
        </section>

        <section data-motion-section className="outcomes page-pad">
          <div className="section-rule"><span>{outcomes.label}</span><span>03</span></div>
          <div className="outcomes-head">
            <h2>{outcomes.heading} <em>{outcomes.headingEmphasis}</em></h2>
            <p>{outcomes.description}</p>
          </div>
          <div className="outcomes-grid">
            {outcomes.items.map((outcome, index) => (
              <article data-motion-card key={outcome.label}>
                <div><span>{String(index + 1).padStart(2, '0')}</span><i>{outcome.label}</i></div>
                <h3>{outcome.title}</h3>
                <p>{outcome.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section data-story-root className="story-shell">
          <div className="story-visual" aria-hidden="true">
            <div data-story-media="0" className="story-media story-media--wide is-active"><img src={pathFor(processIntro.media[0].image)} alt="" /></div>
            <div data-story-media="1" className="story-media story-media--facade"><img src={pathFor(processIntro.media[1].image)} alt="" /></div>
            <div data-story-media="2" className="story-media story-media--detail"><img src={pathFor(processIntro.media[2].image)} alt="" /></div>
            <div data-story-media="3" className="story-media story-media--arrival"><img src={pathFor(processIntro.media[3].image)} alt="" /></div>
            <div className="story-progress"><span data-story-index>01</span><span>/ 04</span></div>
          </div>
          <div className="story-copy page-pad">
            <header className="story-intro">
              <div className="section-rule"><span>{processIntro.label}</span><span>04</span></div>
              <h2>{processIntro.heading}<br /><em>{processIntro.headingEmphasis}</em></h2>
              <p>{processIntro.description}</p>
            </header>
            {process.map((step, index) => (
              <article data-story-step={index} className={`story-step ${index === 0 ? 'is-active' : ''}`} key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="story-step-line"><i /><span>{step.stage}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" data-motion-section className="capabilities page-pad">
          <div className="capabilities-head">
            <div className="section-rule"><span>{capabilities.label}</span><span>05</span></div>
            <h2>{capabilities.heading}<br /><em>{capabilities.headingEmphasis}</em></h2>
          </div>
          <ol className="capability-list">
            {services.map((service, index) => (
              <li data-motion-card key={service.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <i aria-hidden="true">↗</i>
              </li>
            ))}
          </ol>
          <Link href="/services" className="capabilities-link">{capabilities.linkLabel} ↗</Link>
        </section>

        <section id="about" data-motion-section className="about-editorial page-pad">
          <div className="about-marquee" aria-hidden="true"><span>Spaces that feel inevitable — </span><span>Spaces that feel inevitable — </span></div>
          <div className="about-editorial-inner">
            <div className="section-rule section-rule-light"><span>{studio.label}</span><span>06</span></div>
            <div className="about-editorial-grid">
              <h2><RevealText text={studio.heading} /></h2>
              <div>
                {intro.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                <div className="about-editorial-links"><Link href="/about">{studio.linkLabel} ↗</Link><ContactMenu label={studio.contactLabel} methods={contactMethods} /></div>
              </div>
            </div>
            <div className="about-facts">
              <div><strong>06</strong><span>Connected capabilities</span></div>
              <div><strong>04</strong><span>Steps from idea to place</span></div>
              <div><strong>∞</strong><span>Room for possibility</span></div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-stage page-pad">
          <div className="section-rule"><span>{contact.label}</span><span>07</span></div>
          <h2><RevealText text={contact.heading} /></h2>
          <div className="project-brief">
            <div>
              <span>{contact.briefLabel}</span>
              <p>{contact.briefDescription}</p>
            </div>
            <ol>
              {contact.briefItems.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}
            </ol>
          </div>
          <div className="contact-stage-bottom">
            <a href={`mailto:${email}`}>{contact.emailLinkLabel} <span>↗</span></a>
            <p>{contactData.address}<br />{contact.availability}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer page-pad">
        <Link href="/" className="site-footer-mark">VIZ<span>.</span></Link>
        <p>{siteData.footer.descriptor}</p>
        <p>{siteData.footer.copyright}</p>
      </footer>
    </div>
  )
}
