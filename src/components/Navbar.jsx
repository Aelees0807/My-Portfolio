import { motion } from 'framer-motion';
import content from '../data/content';
import { useNavScrolled } from '../hooks';

/**
 * Navbar — Fixed glass navigation bar.
 * Reads links from content.js. Adds .scrolled class on scroll
 * to increase glass opacity (Apple's sticky nav behavior).
 */
export default function Navbar() {
  const scrolled = useNavScrolled(20);

  return (
    <motion.nav
      className={`glass-nav fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-3.5 flex items-center justify-between ${
        scrolled ? 'scrolled' : ''
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <a
        href="#"
        className="text-base font-semibold"
        style={{
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
        }}
      >
        {content.nav.brand}
      </a>

      <div className="flex items-center gap-8">
        {content.nav.links.map(link => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium transition-colors"
            style={{
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => (e.target.style.color = 'var(--color-text-primary)')}
            onMouseLeave={e => (e.target.style.color = 'var(--color-text-secondary)')}
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
