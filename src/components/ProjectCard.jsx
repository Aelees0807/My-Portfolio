import { motion } from 'framer-motion';
import { GitBranch, ExternalLink } from 'lucide-react';

/**
 * ProjectCard — Glass card for a single non-flagship project.
 * Reads from the project data shape defined in content.js.
 * Uses .glass-card for the surface, and framer-motion for hover highlights.
 *
 * @param {Object} project — Project data object from content.projects[]
 * @param {number} index — Index for staggered animation delay and varying hover highlights
 */
export default function ProjectCard({ project, index = 0 }) {
  // Apple's glass responds with light and elevation.
  // We vary the inset shadow highlight corner based on the card's index
  // so the grid feels dynamic and physically illuminated from different angles.
  const hoverShadows = [
    '0 16px 50px rgba(0,0,0,0.06), inset 1px 1px 0 rgba(255,255,255,1), inset -1px -1px 0 rgba(255,255,255,0.2)', // Top-left highlight
    '0 16px 50px rgba(0,0,0,0.06), inset -1px 1px 0 rgba(255,255,255,1), inset 1px -1px 0 rgba(255,255,255,0.2)', // Top-right highlight
    '0 16px 50px rgba(0,0,0,0.06), inset 1px -1px 0 rgba(255,255,255,1), inset -1px 1px 0 rgba(255,255,255,0.2)', // Bottom-left highlight
    '0 16px 50px rgba(0,0,0,0.06), inset -1px -1px 0 rgba(255,255,255,1), inset 1px 1px 0 rgba(255,255,255,0.2)'  // Bottom-right highlight
  ];
  
  const dynamicHoverShadow = hoverShadows[index % 4];

  return (
    <motion.article
      className="glass-card flex flex-col h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ 
        y: -4,
        boxShadow: dynamicHoverShadow,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      }}
    >
      {/* Content */}
      <div className="p-8 flex flex-col h-full">
        
        <h3
          className="mb-2 text-xl"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {project.title}
        </h3>

        {project.subtitle && (
          <p
            className="text-sm font-medium mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            {project.subtitle}
          </p>
        )}

        {project.description && (
          <p
            className="text-sm mb-6"
            style={{ color: 'var(--color-text-secondary)', lineHeight: '1.65' }}
          >
            {project.description}
          </p>
        )}

        {/* Tags push to bottom */}
        <div className="flex gap-2 flex-wrap mt-auto mb-6">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="tag px-2.5 py-1"
              style={{
                background: 'rgba(0,0,0,0.03)',
                borderRadius: 'var(--radius-tag)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'var(--color-accent)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent-hover)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-accent)'}
            >
              Live Demo <ExternalLink size={14} />
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Source <GitBranch size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
