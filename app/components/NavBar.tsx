'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavBarProps {
  forceLight?: boolean
  heroGradient?: boolean
}

export default function NavBar({ forceLight = false, heroGradient = false }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isLight = forceLight || scrolled

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {heroGradient && !scrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none" />
      )}

      <div
        className={`
          relative flex justify-between items-center
          px-4 py-5 md:px-12 md:py-6
          transition-all duration-300 ease-in-out
          ${isLight
            ? 'bg-white/80 backdrop-blur-md border-b border-zinc-100 shadow-sm'
            : 'bg-transparent border-b border-transparent'
          }
        `}
      >
        <Link
          href="/"
          className={`
            text-xs uppercase tracking-wider md:tracking-widest font-light transition-colors duration-300
            ${isLight ? 'text-black hover:opacity-50' : 'text-white hover:opacity-50'}
          `}
        >
          VIZ CREATIVE
        </Link>

        <div className={`
          flex gap-4 md:gap-8 text-xs uppercase tracking-wider md:tracking-widest transition-colors duration-300
          ${isLight ? 'text-black' : 'text-white'}
        `}>
          <Link href="/work" className="hover:opacity-50 transition-opacity">Work</Link>
          <Link href="/services" className="hover:opacity-50 transition-opacity">Services</Link>
          <Link href="/about" className="hover:opacity-50 transition-opacity">About</Link>
        </div>
      </div>
    </nav>
  )
}