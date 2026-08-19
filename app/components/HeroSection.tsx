'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import AnimationWrapper from './AnimationWrapper';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && heroRef.current) {
      // Animate headline
      gsap.from(headlineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power2.out'
      });

      // Animate subtitle
      gsap.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power2.out'
      });

      // Animate CTA button
      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.9,
        ease: 'power2.out'
      });
    }

    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        gsap.killTweensOf(heroRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/hero-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
      
      <AnimationWrapper animationType="fade-up">
        <div className="relative z-20 text-center max-w-4xl px-4">
          <h1 
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          >
            ARCHITECTURE
          </h1>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto"
          >
            Creating immersive experiences through innovative design and cutting-edge technology
          </p>
          <button 
            ref={ctaRef}
            className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Work
          </button>
        </div>
      </AnimationWrapper>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}