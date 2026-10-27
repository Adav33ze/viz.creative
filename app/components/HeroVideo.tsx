'use client'

import { useEffect, useRef, useState } from 'react'
import { imageAttributes } from '../../lib/media'

export default function HeroVideo({src,poster,alt}: {src:string;poster:string;alt:string}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing,setPlaying] = useState(false)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const connection = (navigator as Navigator & {connection?:{saveData?:boolean}}).connection
    if (reducedMotion || connection?.saveData) return
    const timer = window.setTimeout(() => {
      video.src = src
      void video.play().catch(() => { /* Keep the poster visible when autoplay is unavailable. */ })
    },1500)
    return () => { window.clearTimeout(timer); video.pause(); video.removeAttribute('src'); video.load() }
  },[src])
  return <>
    <img {...imageAttributes(poster)} alt={alt} className="zoom-hero-media" sizes="100vw" loading="eager" fetchPriority="high" decoding="async" />
    <video ref={ref} muted loop playsInline preload="none" aria-hidden="true" className="zoom-hero-media" style={{visibility:playing?'visible':'hidden'}} onPlaying={() => setPlaying(true)} onError={() => setPlaying(false)} />
  </>
}
