import content from '../data/content';

/**
 * Footer — Simple footer with copyright and built-with text.
 */
export default function Footer() {
  const { copyright, builtWith } = content.footer;

  return (
    <footer
      className="container-wide py-12"
      style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="tag" style={{ color: 'var(--color-text-quaternary)' }}>
          {copyright}
        </span>
        <span className="tag" style={{ color: 'var(--color-text-quaternary)' }}>
          {builtWith}
        </span>
      </div>
    </footer>
  );
}
