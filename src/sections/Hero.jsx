import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import content from '../data/content';
import { Section } from '../components';

/**
 * Hero — Landing section.
 * - Asymmetric layout: 55% text on left, 45% visual on right.
 * - Left: Glass hero card containing info and distinct glass CTAs.
 * - Right: Rotating glass card stack (animated visual element).
 * - GSAP-driven scroll indicator at the bottom.
 */
export default function Hero() {
  const { name, role, education, pitch, cta, cardStack } = content.hero;
  const scrollRef = useRef(null);

  // GSAP Scroll Indicator Fade-out
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (scrollRef.current) {
            const scrollY = window.scrollY;
            const opacity = Math.max(0, 1 - scrollY / 250);
            gsap.to(scrollRef.current, { opacity, duration: 0.1, ease: 'none' });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section id="hero" wide={true} className="relative min-h-[95svh] flex items-center pt-24 pb-16">
      <div className="grid md:grid-cols-[55%_1fr] gap-10 md:gap-16 w-full items-center">
        
        {/* ── Left — Hero Card (Enters from left) ── */}
        <motion.div 
          className="glass-hero p-8 md:p-12 relative z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Inner content staggered entrance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>
              {name}
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-1" style={{ color: 'var(--color-accent)', letterSpacing: '-0.02em' }}>
              {role}
            </p>
            <p className="text-sm md:text-base mb-6 pb-6" style={{ color: 'var(--color-text-tertiary)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              {education}
            </p>
            
            <p className="text-lg md:text-xl mb-8" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', maxWidth: '40ch' }}>
              {pitch}
            </p>
            
            {/* CTA Buttons — distinct lighter glass, filled on hover */}
            <div className="flex gap-4 flex-wrap mt-8">
              <a 
                href={cta.primary.href} 
                className="btn-glass-primary"
              >
                {cta.primary.label}
                <ArrowRight size={18} />
              </a>
              <a 
                href={cta.secondary.href} 
                className="btn-glass-secondary"
              >
                {cta.secondary.label}
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Right — Rotating Glass Card Stack (Enters from right) ── */}
        <div className="relative h-[350px] hidden md:flex items-center justify-center perspective-[1200px]">
          {cardStack.map((card, index) => {
            // Fan arrangement: bottom cards rotated more, top card straight
            const reverseIndex = cardStack.length - 1 - index;
            const rotationOffset = reverseIndex * -12; // e.g. -24, -12, 0
            const yOffset = reverseIndex * 24; // e.g. 48, 24, 0
            const scale = 1 - (reverseIndex * 0.06); // e.g. 0.88, 0.94, 1.0
            
            return (
              <motion.div
                key={card.title}
                className="absolute w-[280px] p-6 glass-card shadow-xl"
                style={{
                  zIndex: index,
                  transformOrigin: 'bottom right',
                }}
                initial={{ opacity: 0, x: 80, rotate: rotationOffset + 20 }}
                animate={{ opacity: 1, x: 0, rotate: rotationOffset, y: yOffset, scale }}
                transition={{ duration: 0.9, delay: 0.3 + index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ 
                  scale: scale + 0.03, 
                  rotate: rotationOffset + (index === cardStack.length - 1 ? 3 : -3),
                  y: yOffset - 8
                }}
              >
                <span className="tag mb-2 block" style={{ color: 'var(--color-accent)' }}>
                  {card.label}
                </span>
                <h4 style={{ fontFamily: 'var(--font-heading)' }} className="mb-2 text-lg">
                  {card.title}
                </h4>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                  {card.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Scroll Indicator (Fades out via GSAP) ── */}
      <div 
        ref={scrollRef}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
        style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}
      >
        <span className="text-xs uppercase tracking-widest mb-2 opacity-80">Scroll</span>
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="opacity-80" />
        </motion.div>
      </div>
    </Section>
  );
}
