'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavBarProps {
  forceLight?: boolean
  heroGradient?: boolean
}

export default function NavBar({ heroGradient = false }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${heroGradient && !scrolled ? 'bg-black/10' : ''}`}>
      <div
        className={`
          relative flex items-center justify-between border-b
          px-6 py-5 md:px-12 md:py-6
          transition-all duration-300 ease-in-out
          ${scrolled
            ? 'border-white/12 bg-brand-700/96'
            : 'border-white/18 bg-transparent'
          }
        `}
      >
        <Link
          href="/"
          className="text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-opacity duration-300 hover:opacity-60"
        >
          VIZ CREATIVE
        </Link>

        <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.15em] text-white md:gap-7 md:text-[10px] md:tracking-[0.18em]">
          <Link href="/work" className="transition-colors hover:text-accent">Work</Link>
          <Link href="/services" className="transition-colors hover:text-accent">Services</Link>
          <Link href="/about" className="hidden transition-colors hover:text-accent sm:inline">About</Link>
          <Link href="/#contact" className="border-b border-accent pb-1 transition-colors hover:border-white">
            Start<span className="hidden md:inline"> a project</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
