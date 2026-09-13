import { motion } from 'framer-motion';
import content from '../data/content';
import { Section } from '../components';

/**
 * About — Bio section with portrait placeholder and stats.
 * Uses 40/60 grid (image left, text right) for asymmetry.
 */
export default function About() {
  const { eyebrow, headline, bio, stats } = content.about;

  return (
    <Section id="about">
      <p className="section-label">{eyebrow}</p>
      <div className="grid-40-60 items-start">
        {/* Left — Portrait / visual (40%) */}
        <motion.div
          className="glass-hero aspect-[3/4] w-full overflow-hidden flex items-center justify-center relative z-10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.about.image ? (
            <img 
              src={content.about.image} 
              alt="Portrait" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="tag"
              style={{ color: 'var(--color-text-quaternary)' }}
            >
              Your portrait here
            </span>
          )}
        </motion.div>

        {/* Right — Text (60%) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }}
        >
          <motion.h2
            style={{ fontFamily: 'var(--font-heading)' }}
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {headline}
          </motion.h2>

          {bio.map((paragraph, i) => (
            <motion.p
              key={i}
              className="text-base mb-4"
              style={{
                color: 'var(--color-text-secondary)',
                lineHeight: '1.7',
                maxWidth: '55ch',
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Stats row */}
          {stats && stats.length > 0 && (
            <div
              className="grid grid-cols-3 gap-4 mt-8 pt-6"
              style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
            >
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                >
                  <p
                    className="text-2xl font-semibold mb-1"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-text-primary)',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="tag"
                    style={{ textTransform: 'none', fontSize: '0.75rem' }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
