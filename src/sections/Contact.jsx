import { motion } from 'framer-motion';
import { Mail, GitBranch, Briefcase } from 'lucide-react';
import content from '../data/content';
import { Section, MagneticButton } from '../components';

const ICON_MAP = { Github: GitBranch, Linkedin: Briefcase, Mail };

/**
 * Contact — Call-to-action section.
 * Uses a unique blur-in entrance animation to differentiate from other sections.
 * Features a primary glass button for email, and Magnetic glass buttons for socials.
 */
export default function Contact() {
  const { eyebrow, headline, description, email, socials } = content.contact;

  const containerVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <Section id="contact">
      <motion.div 
        className="max-w-2xl mx-auto text-center flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.p className="section-label" variants={itemVariants}>{eyebrow}</motion.p>
        <motion.h2
          style={{ fontFamily: 'var(--font-heading)' }}
          className="mb-4 text-4xl md:text-5xl"
          variants={itemVariants}
        >
          {headline}
        </motion.h2>
        <motion.p
          className="text-lg mb-10"
          style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7', maxWidth: '45ch' }}
          variants={itemVariants}
        >
          {description}
        </motion.p>

        {/* Email CTA */}
        <motion.div variants={itemVariants} className="mb-12">
          <MagneticButton
            href={`mailto:${email}`}
            className="btn-glass-primary text-base px-8 py-4"
          >
            <Mail size={18} />
            {email}
          </MagneticButton>
        </motion.div>

        {/* Social links (Magnetic Glass Orbs) */}
        {socials && socials.length > 0 && (
          <motion.div className="flex gap-6 flex-wrap justify-center" variants={itemVariants}>
            {socials.map(social => {
              const IconComponent = ICON_MAP[social.icon] || Mail;

              return (
                <MagneticButton
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(12px)',
                    color: 'var(--color-text-secondary)',
                    boxShadow: 'var(--shadow-glass-card)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)';
                    e.currentTarget.style.color = 'var(--color-accent)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-glass-card-hover)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.4)';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-glass-card)';
                  }}
                >
                  <IconComponent size={20} />
                </MagneticButton>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </Section>
  );
}
