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
      <h2
        style={{ fontFamily: 'var(--font-heading)' }}
        className="mb-2"
      >
        Selected projects.
      </h2>
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

      {/* ── Other Projects (Asymmetric Grid) ── */}
      {others.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {others.map((project, i) => {
            // Asymmetric Masonry Layout
            // E.g. card 0: col-span-5, card 1: col-span-7, card 2: col-span-6, etc.
            const colSpans = [
              'md:col-span-5 md:mt-12', // Offset first card down
              'md:col-span-7',
              'md:col-span-7 md:-mt-8', // Pull third card up
              'md:col-span-5 md:mt-12', // Push fourth card down
            ];
            
            const spanClass = colSpans[i % 4];

            return (
              <div key={project.id} className={spanClass}>
                <ProjectCard
                  project={project}
                  index={i}
                />
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}
