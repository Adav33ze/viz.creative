'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollMotion() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      const heroes = gsap.utils.toArray<HTMLElement>('[data-motion-hero]')
      heroes.forEach((hero) => {
        gsap.fromTo(
          hero.querySelectorAll('[data-hero-content]'),
          { y: 36, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.58, stagger: 0.07, ease: 'power3.out', delay: 0.05 }
        )

        gsap.fromTo(hero.querySelectorAll('img, video'), {
          yPercent: -3,
        }, {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.25,
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-motion-section]').forEach((section) => {
        const heading = section.querySelector<HTMLElement>('h1, h2')
        const cards = section.querySelectorAll<HTMLElement>('[data-motion-card]')
        const images = section.querySelectorAll<HTMLImageElement>('[data-motion-image]')

        if (heading) {
          gsap.fromTo(
            heading,
            { y: 30, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.58,
              ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 76%' },
            }
          )
        }

        if (cards.length) {
          gsap.fromTo(
            cards,
            { y: 48, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.55,
              stagger: 0.07,
              ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 70%' },
            }
          )

          cards.forEach((card, index) => {
            gsap.to(card, {
              yPercent: index % 2 === 0 ? -6 : 6,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.25,
              },
            })
          })
        }

        images.forEach((image) => {
          const zoomAmount = image.dataset.motionZoom === 'strong' ? 1.26 : 1.12

          gsap.fromTo(
            image,
            { yPercent: -7, scale: zoomAmount },
            {
              yPercent: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: image.parentElement ?? section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.25,
              },
            }
          )
        })
      })
    })

    return () => context.revert()
  }, [pathname])

  return null
}