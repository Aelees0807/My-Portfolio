import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import content from '../data/content';
import { Section, TechSphere } from '../components';

gsap.registerPlugin(ScrollTrigger);

/**
 * Skills — Categorized technical expertise.
 *
 * Layout: Two-column on desktop.
 *   Left:  3D spinning tech sphere with all technologies orbiting.
 *   Right: Glass category cards with staggered tag animations.
 */
export default function Skills() {
  const { eyebrow, headline, categories } = content.skills;
  const containerRef = useRef(null);

  // Combine all tech items from every category for the sphere
  const allTechItems = useMemo(() => {
    return categories.flatMap((cat) => cat.items);
  }, [categories]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.skill-card');

    cards.forEach((card) => {
      const tags = card.querySelectorAll('.skill-tag');

      gsap.fromTo(
        tags,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <Section id="skills">
      <p className="section-label">{eyebrow}</p>
      <h2
        style={{ fontFamily: 'var(--font-heading)' }}
        className="mb-10"
      >
        {headline}
      </h2>

      <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-center">
        {/* Left — 3D Tech Sphere */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <TechSphere items={allTechItems} radius={180} autoSpeed={0.35} />
        </motion.div>

        {/* Right — Category cards */}
        <div ref={containerRef} className="flex flex-col gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="glass-card p-8 skill-card flex flex-col h-full"
            >
              <h3
                style={{ fontFamily: 'var(--font-heading)' }}
                className="mb-8 text-xl"
              >
                {cat.name}
              </h3>

              <div className="flex flex-wrap gap-3 mt-auto">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag px-3 py-1.5 font-medium text-sm transition-transform hover:scale-105"
                    style={{
                      backgroundColor: cat.bgColor,
                      color: cat.color,
                      borderRadius: 'var(--radius-tag)',
                      fontFamily: 'var(--font-mono)',
                      border: `1px solid ${cat.color.replace(')', ', 0.2)').replace('var', 'color-mix(in srgb, var')}` 
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
