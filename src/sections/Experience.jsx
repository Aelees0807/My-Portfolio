import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import content from '../data/content';
import { Section } from '../components';

gsap.registerPlugin(ScrollTrigger);

/**
 * Experience — Internship timeline.
 * Renders a horizontal timeline of tasks/deliverables with GSAP scrub animation.
 */
export default function Experience() {
  const { eyebrow, headline, list } = content.experience;
  const exp = list[0]; // Currently tailored for the single internship

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const nodes = containerRef.current.querySelectorAll('.timeline-node');
    const dots = containerRef.current.querySelectorAll('.timeline-dot');

    // Create a GSAP timeline tied to scroll scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: 1, // Smooth scrub linked to scroll position
      },
    });

    // 1. Animate the horizontal progress bar filling up
    if (progressRef.current) {
      tl.to(progressRef.current, { width: '100%', ease: 'none', duration: 1 }, 0);
    }

    // 2. Animate the timeline nodes appearing in sequence (opacity, y-shift)
    if (nodes.length) {
      tl.fromTo(
        nodes,
        { opacity: 0.2, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 1 / nodes.length,
          ease: 'power2.out',
        },
        0 // Start at the same time as the progress bar
      );
    }

    // 3. Scale up the dots sequentially to match the progress bar passing them
    if (dots.length) {
      tl.fromTo(
        dots,
        { scale: 0.5, backgroundColor: 'var(--color-base)' },
        {
          scale: 1.2,
          backgroundColor: 'var(--color-accent)',
          duration: 0.3,
          stagger: 1 / dots.length,
          ease: 'back.out(2)',
        },
        0
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <Section id="experience" wide={true}>
      <p className="section-label">{eyebrow}</p>
      <h2
        style={{ fontFamily: 'var(--font-heading)' }}
        className="mb-10"
      >
        {headline}
      </h2>

      <div ref={containerRef} className="glass-hero p-8 md:p-12 relative overflow-hidden">
        {/* Header Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl mb-1">
              {exp.role}
            </h3>
            <p className="text-lg font-medium" style={{ color: 'var(--color-accent)' }}>
              {exp.company}
            </p>
            <p className="text-sm mt-3 tag-accent tag inline-block px-3 py-1 rounded-md" style={{ backgroundColor: 'var(--color-accent-soft)' }}>
              {exp.period}
            </p>
          </div>

          {exp.dashboardLink && (
            <a
              href={exp.dashboardLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Live Streamlit Dashboard <ExternalLink size={16} />
            </a>
          )}
        </div>

        {/* Horizontal Timeline Container */}
        <div className="relative pt-4 pb-4">
          {/* Background Track (Empty line) */}
          <div
            ref={trackRef}
            className="absolute top-8 left-0 w-full h-[2px] rounded-full hidden md:block"
            style={{ background: 'rgba(0,0,0,0.06)' }}
          />
          
          {/* Active Progress Line (Fills on scroll) */}
          <div
            ref={progressRef}
            className="absolute top-8 left-0 h-[2px] rounded-full w-0 hidden md:block"
            style={{ background: 'var(--color-accent)' }}
          />

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-4 relative z-10">
            {exp.tasks.map((task, i) => (
              <div key={i} className="timeline-node flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-0">
                {/* Visual Dot */}
                <div
                  className="timeline-dot w-4 h-4 rounded-full md:mb-5 shadow-sm shrink-0"
                  style={{
                    border: '3px solid var(--color-base)',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.08)',
                  }}
                />
                
                {/* Task Label */}
                <p
                  className="text-sm font-medium"
                  style={{
                    color: 'var(--color-text-secondary)',
                    lineHeight: '1.4',
                  }}
                >
                  {task}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
