'use client'

import { useState, useRef, useEffect } from 'react'

export type ContactMethod = {
  label: string
  href: string
}

interface ContactMenuProps {
  label: string
  methods: ContactMethod[]
  variant?: 'link' | 'button' | 'button-dark'
  align?: 'left' | 'right'
  className?: string
}

export default function ContactMenu({
  label,
  methods,
  variant = 'link',
  align = 'left',
  className = '',
}: ContactMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  const triggerClasses = {
    link: 'text-xs uppercase tracking-widest border-b border-white/30 pb-1 text-white/70 hover:text-white hover:border-white transition-colors',
    button:
      'w-full text-center text-xs uppercase tracking-widest py-4 border border-white/40 text-white hover:bg-white hover:text-brand-500 transition-colors',
    'button-dark':
      'w-full text-center text-xs uppercase tracking-widest py-4 border border-white text-white hover:bg-white hover:text-brand-500 transition-colors',
  }[variant]

  return (
    <div ref={ref} className={`relative inline-block ${variant !== 'link' ? 'w-full' : ''} ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={triggerClasses}
      >
        {label} {variant === 'link' ? (open ? '\u2191' : '\u2192') : ''}
      </button>

      {open && (
        <div
          className={`absolute z-20 mt-2 w-48 bg-brand-600 border border-white/15 text-xs uppercase tracking-widest ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {methods.map((m) => {
            const isExternal = m.href.startsWith('http')
            return (
              <a
                key={m.label}
                href={m.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="block px-4 py-3 border-b border-white/10 last:border-b-0 text-white hover:bg-white hover:text-brand-500 transition-colors"
                onClick={() => setOpen(false)}
              >
                {m.label}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}