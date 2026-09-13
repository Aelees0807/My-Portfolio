import { motion } from 'framer-motion';
import { useInView } from '../hooks';

/**
 * Section — Reusable page section wrapper.
 * Handles the container, spacing, and entrance animation.
 * All sections use this for consistent layout.
 *
 * @param {string} id — Section anchor id
 * @param {string} className — Additional classes
 * @param {boolean} wide — Use wide container (default true)
 * @param {React.ReactNode} children
 */
export default function Section({ id, className = '', wide = true, children }) {
  const [ref, inView] = useInView({ threshold: 0.05 }, true);

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`${wide ? 'container-wide' : ''} mb-20 md:mb-28 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
