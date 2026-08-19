'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationWrapperProps {
  children: React.ReactNode;
  animationType?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in';
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function AnimationWrapper({
  children,
  animationType = 'fade-up',
  delay = 0,
  duration = 0.6,
  stagger = 0
}: AnimationWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && elementRef.current) {
      const element = elementRef.current;
      
      // Set initial state based on animation type
      let animationConfig: gsap.TweenVars = {};
      
      switch (animationType) {
        case 'fade-up':
          animationConfig = {
            y: 50,
            opacity: 0,
            ease: 'power2.out'
          };
          break;
        case 'fade-left':
          animationConfig = {
            x: -50,
            opacity: 0,
            ease: 'power2.out'
          };
          break;
        case 'fade-right':
          animationConfig = {
            x: 50,
            opacity: 0,
            ease: 'power2.out'
          };
          break;
        case 'scale-in':
          animationConfig = {
            scale: 0.8,
            opacity: 0,
            ease: 'power2.out'
          };
          break;
        default:
          animationConfig = {
            opacity: 0,
            ease: 'power2.out'
          };
      }

      // Create the animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      if (stagger > 0) {
        tl.from(element.children, {
          ...animationConfig,
          duration,
          delay,
          stagger,
          ease: 'power2.out'
        });
      } else {
        tl.from(element, {
          ...animationConfig,
          duration,
          delay
        });
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationType, delay, duration, stagger]);

  return <div ref={elementRef}>{children}</div>;
}