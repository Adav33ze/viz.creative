import type {Metadata} from 'next'
import Link from 'next/link'
import NavBar from './components/NavBar'

export const metadata: Metadata = {title:'Page not found | Viz Creative',robots:{index:false,follow:true}}

export default function NotFound() {
  return <div className="min-h-screen bg-brand-500 text-white">
    <NavBar forceLight />
    <main className="px-6 md:px-12 pt-40 pb-28 max-w-7xl mx-auto">
      <h1 className="font-display text-5xl md:text-7xl font-light max-w-3xl">This page is outside the frame.</h1>
      <p className="mt-8 text-white/70 max-w-xl leading-relaxed">404 — This link may have changed. Explore the studio, our services, or the current showreel.</p>
      <nav aria-label="Find your next page" className="mt-12 flex flex-wrap gap-8 text-sm underline">
        <Link prefetch={false} href="/">Home</Link>
        <Link prefetch={false} href="/work/">Work</Link>
        <Link prefetch={false} href="/services/">Services</Link>
        <Link prefetch={false} href="/about/">About</Link>
      </nav>
    </main>
  </div>
}
