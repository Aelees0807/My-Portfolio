import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import content from '../data/content';
import { Section } from '../components';

gsap.registerPlugin(ScrollTrigger);

/**
 * Skills — Categorized technical expertise.
 * Renders glass cards for each category. Skill tags inside each card
 * animate in with a staggered scale-in when scrolled into view.
 */
export default function Skills() {
  const { eyebrow, headline, categories } = content.skills;
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Select all category cards
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
      // Clean up scroll triggers when component unmounts
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

      <div ref={containerRef} className="grid md:grid-cols-2 gap-8">
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
                    border: `1px solid ${cat.color.replace(')', ', 0.2)').replace('var', 'color-mix(in srgb, var')}` // Optional simple border
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
