import content from '../data/content';
import { Section, ProjectCard } from '../components';
import FlagshipCard from '../components/FlagshipCard';

/**
 * Projects — Featured work section.
 * Renders the flagship project first using FlagshipCard.
 * Remaining projects are rendered in an asymmetric masonry-style grid.
 */
export default function Projects() {
  const flagship = content.projects.find(p => p.featured);
  const others = content.projects.filter(p => !p.featured);

  return (
    <Section id="work" wide={true}>
      <p className="section-label">Work</p>
     
      <p
        className="mb-14"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        A collection of things I've designed and built.
      </p>

      {/* ── Flagship Project ── */}
      {flagship && (
        <div className="mb-12">
          <FlagshipCard project={flagship} />
        </div>
      )}

      {/* ── Other Projects (Standard Grid) ── */}
      {others.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {others.map((project, i) => (
            <div key={project.id}>
              <ProjectCard
                project={project}
                index={i}
              />
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
