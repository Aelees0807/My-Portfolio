import { motion } from 'framer-motion';
import { GitBranch, ExternalLink } from 'lucide-react';

/**
 * FlagshipCard — Specialized larger glass card for the flagship project.
 * Features a distinct layout and a custom "Grad-CAM" hover reveal interaction.
 */
export default function FlagshipCard({ project }) {
  return (
    <motion.article
      className="glass-hero relative overflow-hidden flex flex-col md:flex-row group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Content Side ── */}
      <div className="p-8 md:p-12 md:w-[60%] flex flex-col z-10 relative">
        <p className="section-label mb-2 text-xs uppercase tracking-widest" style={{ color: 'var(--color-coral)' }}>Flagship Project</p>
        <h3
          className="mb-2 text-2xl md:text-3xl"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {project.title}
        </h3>

        <p
          className="text-lg font-medium mb-4"
          style={{ color: 'var(--color-accent)', letterSpacing: '-0.01em' }}
        >
          {project.subtitle}
        </p>

        <p
          className="text-base mb-8"
          style={{ color: 'var(--color-text-secondary)', lineHeight: '1.7' }}
        >
          {project.description}
        </p>

        <div className="flex gap-2 flex-wrap mb-10">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="tag px-3 py-1.5"
              style={{
                background: 'var(--color-base)',
                borderRadius: 'var(--radius-tag)',
                color: 'var(--color-text-primary)',
                border: '1px solid rgba(0,0,0,0.04)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-auto">
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Live Demo <ExternalLink size={16} />
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Source <GitBranch size={16} />
            </a>
          )}
        </div>
      </div>

      {/* ── Visual Side (Grad-CAM effect) ── */}
      <div className="md:w-[40%] relative min-h-[250px] md:min-h-full overflow-hidden border-t md:border-t-0 md:border-l border-white/40 bg-white/10">
        
        {/* Base X-Ray style background */}
        <div 
          className="absolute inset-0 bg-[#0a0f16]" 
          style={{
            backgroundImage: 'radial-gradient(ellipse at center, #1a2533 0%, #0a0f16 100%)',
            opacity: 0.9
          }} 
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-white/40 font-mono text-sm tracking-widest z-20 transition-opacity duration-500 group-hover:opacity-0">HOVER TO EXAMINE</span>
        </div>

        {/* Grad-CAM Heatmap overlay (revealed on hover) */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 mix-blend-screen transition-opacity duration-700 ease-out"
          style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(255,0,0,0.8) 0%, rgba(255,255,0,0.6) 20%, rgba(0,255,0,0.4) 40%, rgba(0,0,255,0.2) 60%, transparent 80%)',
            filter: 'blur(10px)'
          }}
        />
        
        {/* Synthetic X-ray rib patterns */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
          <div className="absolute top-1/4 left-1/4 w-32 h-8 rounded-full border-t-4 border-white/50 rotate-[-15deg]" />
          <div className="absolute top-1/3 left-1/4 w-40 h-8 rounded-full border-t-4 border-white/50 rotate-[-10deg]" />
          <div className="absolute top-[45%] left-1/4 w-48 h-8 rounded-full border-t-4 border-white/50 rotate-[-5deg]" />
          
          <div className="absolute top-1/4 right-1/4 w-32 h-8 rounded-full border-t-4 border-white/50 rotate-[15deg]" />
          <div className="absolute top-1/3 right-1/4 w-40 h-8 rounded-full border-t-4 border-white/50 rotate-[10deg]" />
          <div className="absolute top-[45%] right-1/4 w-48 h-8 rounded-full border-t-4 border-white/50 rotate-[5deg]" />
        </div>
      </div>
    </motion.article>
  );
}
