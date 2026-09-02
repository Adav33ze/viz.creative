'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollMotion() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const context = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('[data-motion-hero-mask]').forEach((hero) => {
        const frame = hero.querySelector<HTMLElement>('[data-hero-mask-frame]')
        const lines = hero.querySelectorAll<HTMLElement>('[data-hero-line]')
        const supporting = hero.querySelectorAll<HTMLElement>('.zoom-hero-topline, .zoom-hero-bottom, .zoom-hero-index')
        const content = hero.querySelector<HTMLElement>('.zoom-hero-content')

        gsap.fromTo(lines, { yPercent: 106 }, {
          yPercent: 0,
          duration: .86,
          stagger: .08,
          ease: 'power4.out',
          delay: .08,
        })
        gsap.fromTo(supporting, { y: 18, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: .7,
          stagger: .08,
          ease: 'power3.out',
          delay: .38,
        })

        if (frame) {
          gsap.fromTo(frame, {
            scale: window.innerWidth < 768 ? .9 : .78,
            borderRadius: window.innerWidth < 768 ? 10 : 14,
          }, {
            scale: 1,
            borderRadius: 0,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: .45 },
          })
        }
        if (content) {
          gsap.fromTo(content, { y: 0, opacity: 1 }, {
            y: -18,
            opacity: .58,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: .45 },
          })
        }
      })

      document.querySelectorAll<HTMLElement>('[data-motion-hero]').forEach((hero) => {
        gsap.fromTo(hero.querySelectorAll('[data-hero-content]'), { y: 36, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: .7, stagger: .08, ease: 'power3.out', delay: .08,
        })
        gsap.fromTo(hero.querySelectorAll('img, video'), { scale: 1.08 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .35 },
        })
      })

      document.querySelectorAll<HTMLElement>('[data-text-reveal]').forEach((text) => {
        const words = text.querySelectorAll<HTMLElement>('[data-reveal-word]')
        gsap.fromTo(words, { yPercent: 108, autoAlpha: .08 }, {
          yPercent: 0,
          autoAlpha: 1,
          duration: .86,
          stagger: .022,
          ease: 'power4.out',
          scrollTrigger: { trigger: text, start: 'top 82%', once: true },
        })
      })

      document.querySelectorAll<HTMLElement>('[data-story-root]').forEach((story) => {
        const steps = gsap.utils.toArray<HTMLElement>(story.querySelectorAll('[data-story-step]'))
        const images = gsap.utils.toArray<HTMLElement>(story.querySelectorAll('[data-story-media]'))
        const indexLabel = story.querySelector<HTMLElement>('[data-story-index]')

        const activate = (index: number) => {
          steps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === index))
          images.forEach((image, imageIndex) => image.classList.toggle('is-active', imageIndex === index))
          if (indexLabel) indexLabel.textContent = String(index + 1).padStart(2, '0')
        }

        steps.forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 52%',
            end: 'bottom 48%',
            onEnter: () => activate(index),
            onEnterBack: () => activate(index),
          })
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-motion-section]').forEach((section) => {
        const images = section.querySelectorAll<HTMLImageElement>('[data-motion-image]')
        images.forEach((image) => {
          const zoomAmount = image.dataset.motionZoom === 'strong' ? 1.12 : 1.06
          gsap.fromTo(image, { scale: zoomAmount }, {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: image.parentElement ?? section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: .35,
            },
          })
        })
      })

      gsap.utils.toArray<HTMLImageElement>('[data-portfolio-motion]').forEach((image) => {
        const frame = image.parentElement
        if (!frame) return

        gsap.fromTo(image, {
          scale: 1.015,
          xPercent: -1.2,
        }, {
          scale: 1.075,
          xPercent: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: frame,
            start: 'top 88%',
            end: 'bottom 12%',
            scrub: .8,
          },
        })

        const signal = frame.querySelector<HTMLElement>('[data-portfolio-signal]')
        if (signal) {
          gsap.fromTo(signal, { scaleX: .08 }, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: frame,
              start: 'top 80%',
              end: 'bottom 26%',
              scrub: .65,
            },
          })
        }
      })

      ScrollTrigger.refresh()
    })

    return () => context.revert()
  }, [pathname])

  return null
}
