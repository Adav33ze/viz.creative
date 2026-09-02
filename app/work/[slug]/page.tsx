import Link from 'next/link'
import { notFound } from 'next/navigation'
import NavBar from '../../components/NavBar'
import portfolioData from '../../../data/portfolio.json'

interface PageProps {
  params: Promise<{ slug: string }>
}

const projects = portfolioData.projects.filter(
  (project: any) => !project.title.startsWith('TODO') && !project.image.includes('PLACEHOLDER'),
)

export async function generateStaticParams() {
  return portfolioData.projects.map((project: any) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = projects.find((item: any) => item.slug === slug)
  return {
    title: project ? `${project.title} — Viz Creative` : 'Project — Viz Creative',
    description: project?.description,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const projectIndex = projects.findIndex((item: any) => item.slug === slug)
  const project = projects[projectIndex] as any

  if (!project) notFound()

  const prevProject = projectIndex > 0 ? (projects[projectIndex - 1] as any) : null
  const nextProject = projectIndex < projects.length - 1 ? (projects[projectIndex + 1] as any) : null
  const hasWriteUp = project.write_up && !project.write_up.startsWith('TODO')

  return (
    <div className="min-h-screen bg-brand-500 text-white selection:bg-white selection:text-brand-500">
      <NavBar forceLight />

      <section data-motion-hero className="relative h-[88vh] w-full bg-brand-600 overflow-hidden flex items-end p-6 md:p-12">
        <img
          src={`/${project.image}`}
          alt={project.alt_text}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-600/90 via-brand-600/10 to-transparent" />
        <div data-hero-content className="relative z-10 max-w-4xl text-white">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-3">{project.location}</p>
          <h1 className="font-display text-3xl md:text-7xl font-light tracking-tight">{project.title}</h1>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 border-t border-white/10 pt-8 space-y-6 text-xs uppercase tracking-wider">
          <div>
            <p className="text-white/50 mb-1">Location</p>
            <p className="text-white">{project.location}</p>
          </div>
          <div>
            <p className="text-white/50 mb-1">Category</p>
            <p className="text-white">{project.category}</p>
          </div>
        </div>
        <div className="lg:col-span-8 border-t border-white/10 pt-8">
          <h2 className="text-xs uppercase tracking-widest text-white/50 mb-6">Project Overview</h2>
          <p className="font-body text-base md:text-xl font-light leading-relaxed text-white/90 max-w-3xl">
            {project.description}
          </p>
        </div>
      </section>

      {hasWriteUp && (
        <section className="py-16 px-6 md:px-12 bg-brand-600 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-white/50 mb-10">Project Narrative</h2>
            <div className="space-y-6">
              {project.write_up.split('\n\n').filter(Boolean).map((para: string, i: number) => (
                <p key={i} className="font-body text-sm md:text-base font-light leading-relaxed text-white/70">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section data-motion-section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-white/50 mb-12 border-t border-white/10 pt-8">
            Project Images
          </h2>
          <div className="space-y-6">
            {project.gallery.map((item: any, i: number) => (
              <div key={i} data-motion-card className="relative w-full overflow-hidden bg-white/5 aspect-[3/2]">
                <img
                  src={`/${item.image}`}
                  alt={item.alt_text}
                  data-motion-image
                  data-motion-zoom="strong"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <nav className="border-t border-white/10 px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-white/50 mb-10">More Projects</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {prevProject && (
              <Link href={`/work/${prevProject.slug}`} className="group flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">← Previous</span>
                <span className="font-display text-2xl font-light group-hover:opacity-60 transition-opacity">{prevProject.title}</span>
                <span className="text-xs text-white/50">{prevProject.location}</span>
              </Link>
            )}
          </div>
          <div className="md:text-right">
            {nextProject && (
              <Link href={`/work/${nextProject.slug}`} className="group flex flex-col gap-2 md:items-end">
                <span className="text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Next →</span>
                <span className="font-display text-2xl font-light group-hover:opacity-60 transition-opacity">{nextProject.title}</span>
                <span className="text-xs text-white/50">{nextProject.location}</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <footer className="bg-brand-600 text-white/50 text-[10px] uppercase tracking-widest py-8 px-6 md:px-12 border-t border-white/10">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <Link href="/work" className="hover:text-white transition-colors">← All Work</Link>
          <p>© 2026 Viz Creative. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
