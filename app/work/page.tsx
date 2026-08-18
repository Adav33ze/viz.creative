import Link from 'next/link'
import NavBar from '../components/NavBar'
import portfolioData from '../../data/portfolio.json'

export const metadata = {
  title: 'Work — Viz Creative',
  description: 'Selected interior design and 3D visualization projects by Viz Creative.',
}

export default function WorkPage() {
  const projects = portfolioData.projects

  return (
    <div className="min-h-screen bg-brand-500 text-white selection:bg-white selection:text-brand-500">
      <NavBar forceLight />

      <header data-motion-section className="pt-40 pb-16 px-6 md:px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Work</p>
          <h1 className="font-display text-4xl md:text-7xl font-light tracking-tight max-w-2xl">
            Selected projects.
          </h1>
          <p className="mt-6 text-sm font-light text-white/50 max-w-xl">
            Residential, commercial, and hospitality projects across Nigeria and beyond.
          </p>
        </div>
      </header>

      <main className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {projects.map((project: any, index: number) => (
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
      </main>

      <footer className="bg-brand-600 text-white/50 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12 border-t border-white/10">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <p>© 2026 Viz Creative. All rights reserved.</p>
          <Link href="/" className="hover:text-white transition-colors">Back to Home</Link>
        </div>
      </footer>
    </div>
  )
}