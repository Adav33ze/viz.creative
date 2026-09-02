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
  description: 'Interior design and architectural visualization that help clients align, approve, and experience spaces before construction.',
}

const projectOutcomes = [
  {
    label: 'Align',
    title: 'Make the idea legible.',
    description: 'Give clients, consultants, and decision-makers one clear visual language for scale, materials, light, and atmosphere.',
  },
  {
    label: 'Approve',
    title: 'Decide before site.',
    description: 'Test layouts, finishes, and key moments early—when refinement is faster and far less disruptive.',
  },
  {
    label: 'Present',
    title: 'Build belief in the vision.',
    description: 'Create presentation-ready imagery and film for pitches, stakeholder reviews, and property marketing.',
  },
]

const briefItems = ['Plans, sketches, or a model', 'Reference images or a mood', 'Required spaces and deliverables', 'Location, timeline, and target milestone']

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
              <p>Interior Design · 3D Visualization</p>
              <p>Abuja, Nigeria · Working beyond borders</p>
            </div>
            <h1 className="zoom-hero-title" aria-label="Ideas made inhabitable, visible, tangible, and real">
              <span className="hero-line-clip"><span data-hero-line>Ideas,</span></span>
              <span className="hero-line-clip zoom-hero-title-offset"><span data-hero-line>made</span></span>
              <span className="hero-line-clip hero-word-cycle-clip">
                <span data-hero-line className="hero-word-cycle" aria-hidden="true">
                  <span>inhabitable.</span><span>visible.</span><span>tangible.</span><span>real.</span>
                </span>
              </span>
            </h1>
            <div className="zoom-hero-bottom">
              <p>We help property teams, designers, and private clients align, approve, and experience a space before construction begins.</p>
              <div className="zoom-hero-actions">
                <Link href="/work">View our work <span>↘</span></Link>
                <ContactMenu label="Start a project" methods={contactMethods} variant="button-dark" direction="up" className="w-auto" />
              </div>
            </div>
          </div>
          <div className="zoom-hero-index" aria-hidden="true">01 — 07</div>
        </div>
      </section>

      <main>
        <section data-motion-section className="manifesto page-pad">
          <div className="section-rule"><span>What drives the work</span><span>01</span></div>
          <h2 className="manifesto-title">
            <RevealText text="We design the feeling before the finishes—then resolve every material, light source and line around how the space should live." />
          </h2>
          <div className="manifesto-foot">
            <p>{intro[0]} {intro[1]}</p>
            <span className="studio-seal" aria-hidden="true">VIZ<br />CRTV</span>
          </div>
        </section>

        <section id="work" data-motion-section className="showcase page-pad">
          <div className="section-rule section-rule-light"><span>Selected environment</span><span>02</span></div>
          <div className="showcase-heading">
            <h2>Seeing is the first<br /><em>act of building.</em></h2>
            <div>
              <p>Photorealistic visualization turns an abstract plan into a place that can be understood, tested and believed in.</p>
              <Link href="/work">Enter the portfolio ↗</Link>
            </div>
          </div>
          <Link href="/work" data-motion-card className="showcase-project group">
            <div className="showcase-project-media">
              <img
                src="/images/portfolio/Hero-Fallback.jpg"
                alt="Contemporary retail architecture visualized by Viz Creative"
                data-portfolio-motion
              />
              <span className="showcase-project-signal" data-portfolio-signal aria-hidden="true" />
              <small>Featured study · 01</small>
              <span>Explore the work ↗</span>
            </div>
            <div className="showcase-project-meta">
              <div><h3>Selected Environments</h3><p>Interior design · Architecture · Visualization</p></div>
              <p>Abuja, Nigeria / Beyond</p>
            </div>
          </Link>
          {projects.length > 0 && !projects[0].title.startsWith('TODO') ? (
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
          <div className="section-rule"><span>What the work unlocks</span><span>03</span></div>
          <div className="outcomes-head">
            <h2>Images are only useful when they <em>move a project forward.</em></h2>
            <p>Our role is to turn design intent into something people can understand, evaluate, and confidently act on.</p>
          </div>
          <div className="outcomes-grid">
            {projectOutcomes.map((outcome, index) => (
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
            <div data-story-media="0" className="story-media story-media--wide is-active"><img src="/images/portfolio/Hero-Fallback.jpg" alt="" /></div>
            <div data-story-media="1" className="story-media story-media--facade"><img src="/images/portfolio/Hero-Fallback.jpg" alt="" /></div>
            <div data-story-media="2" className="story-media story-media--detail"><img src="/images/portfolio/Hero-Fallback.jpg" alt="" /></div>
            <div data-story-media="3" className="story-media story-media--arrival"><img src="/images/portfolio/Hero-Fallback.jpg" alt="" /></div>
            <div className="story-progress"><span data-story-index>01</span><span>/ 04</span></div>
          </div>
          <div className="story-copy page-pad">
            <header className="story-intro">
              <div className="section-rule"><span>How a space comes to life</span><span>04</span></div>
              <h2>One process.<br /><em>Zero guesswork.</em></h2>
              <p>Scroll through the decisions that connect the first conversation to the final handover.</p>
            </header>
            {process.map((step, index) => (
              <article data-story-step={index} className={`story-step ${index === 0 ? 'is-active' : ''}`} key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="story-step-line"><i /><span>{index === 0 ? 'Listen' : index === 1 ? 'Compose' : index === 2 ? 'Experience' : 'Realise'}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" data-motion-section className="capabilities page-pad">
          <div className="capabilities-head">
            <div className="section-rule"><span>Capabilities</span><span>05</span></div>
            <h2>From first thought<br />to final <em>detail.</em></h2>
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
          <Link href="/services" className="capabilities-link">View services in detail ↗</Link>
        </section>

        <section id="about" data-motion-section className="about-editorial page-pad">
          <div className="about-marquee" aria-hidden="true"><span>Spaces that feel inevitable — </span><span>Spaces that feel inevitable — </span></div>
          <div className="about-editorial-inner">
            <div className="section-rule section-rule-light"><span>The studio</span><span>06</span></div>
            <div className="about-editorial-grid">
              <h2><RevealText text="Design and visualization, speaking the same language from day one." /></h2>
              <div>
                {intro.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                <div className="about-editorial-links"><Link href="/about">About the studio ↗</Link><ContactMenu label="Get in touch" methods={contactMethods} /></div>
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
          <div className="section-rule"><span>Collaboration</span><span>07</span></div>
          <h2><RevealText text="Have a space worth making unforgettable?" /></h2>
          <div className="project-brief">
            <div>
              <span>Starting a brief</span>
              <p>Send whatever you have. It does not need to be perfectly organized—we will help define the right scope and next step.</p>
            </div>
            <ol>
              {briefItems.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}
            </ol>
          </div>
          <div className="contact-stage-bottom">
            <a href={`mailto:${email}`}>Tell us about it <span>↗</span></a>
            <p>{contactData.address}<br />Available for projects across Nigeria and beyond.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer page-pad">
        <Link href="/" className="site-footer-mark">VIZ<span>.</span></Link>
        <p>Interior Design · 3D Visualization</p>
        <p>© 2026 Viz Creative</p>
      </footer>
    </div>
  )
}
