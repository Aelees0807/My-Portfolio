import { useRef, useEffect, useCallback, useMemo } from 'react';
import powerBiIcon from '../assets/powerbi.svg';

/**
 * Mapping of technology names → Simple Icons slug + brand color.
 * Used to render real brand logos in the sphere.
 */
const TECH_ICONS = {
  'React':                { slug: 'react',          color: '61DAFB' },
  'Node.js':              { slug: 'nodedotjs',      color: '5FA04E' },
  'Express':              { slug: 'express',         color: '000000' },
  'MongoDB':              { slug: 'mongodb',         color: '47A248' },
  'PostgreSQL/Supabase':  { slug: 'supabase',        color: '3FCF8E' },
  'Firebase':             { slug: 'firebase',        color: 'DD2C00' },
  'Vercel':               { slug: 'vercel',          color: '000000' },
  'Python':               { slug: 'python',          color: '3776AB' },
  'Pandas':               { slug: 'pandas',          color: '150458' },
  'Scikit-learn':         { slug: 'scikitlearn',     color: 'F7931E' },
  'PyTorch':              { slug: 'pytorch',         color: 'EE4C2C' },
  'Streamlit':            { slug: 'streamlit',       color: 'FF4B4B' },
  'Tailwind':             { slug: 'tailwindcss',     color: '06B6D4' },
  'Tailwind CSS':         { slug: 'tailwindcss',     color: '06B6D4' },
  'JavaScript':           { slug: 'javascript',      color: 'F7DF1E' },
  'TypeScript':           { slug: 'typescript',      color: '3178C6' },
  'HTML':                 { slug: 'html5',           color: 'E34F26' },
  'CSS':                  { slug: 'css3',            color: '1572B6' },
  'Git':                  { slug: 'git',             color: 'F05032' },
  'Docker':               { slug: 'docker',          color: '2496ED' },
  'TensorFlow':           { slug: 'tensorflow',      color: 'FF6F00' },
  'Power BI':             { localIcon: powerBiIcon,  color: 'F2C811' },
};

/**
 * Get the icon URL for a tech name, falling back to a colored circle with initials.
 */
function getIconUrl(name) {
  const entry = TECH_ICONS[name];
  if (entry) {
    if (entry.localIcon) return entry.localIcon;
    return `https://cdn.simpleicons.org/${entry.slug}/${entry.color}`;
  }
  return null;
}

/**
 * TechSphere — A 3D rotating sphere of technology icons.
 *
 * Uses CSS 3D transforms + requestAnimationFrame for smooth animation.
 * Icons are distributed on a sphere surface using Fibonacci spiral.
 * Mouse interaction rotates the sphere toward the cursor.
 *
 * @param {Object} props
 * @param {string[]} props.items — Array of technology names to display
 * @param {number} [props.radius=200] — Sphere radius in pixels
 * @param {number} [props.autoSpeed=0.3] — Auto-rotation speed (degrees/frame)
 */
export default function TechSphere({ items = [], radius = 200, autoSpeed = 0.3 }) {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const rotationRef = useRef({ x: -15, y: 0 });
  const targetRef = useRef({ x: -15, y: 0 });
  const isHovering = useRef(false);

  // Fibonacci sphere distribution
  const points = useMemo(() => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    return items.map((item, i) => {
      const y = 1 - (i / (items.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      return {
        label: item,
        x: Math.cos(theta) * radiusAtY,
        y: y,
        z: Math.sin(theta) * radiusAtY,
        iconUrl: getIconUrl(item),
        color: TECH_ICONS[item]?.color || '888888',
      };
    });
  }, [items]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    targetRef.current = { x: -dy * 30, y: dx * 30 };
  }, []);

  const handleMouseEnter = useCallback(() => { isHovering.current = true; }, []);
  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    targetRef.current = { x: -15, y: rotationRef.current.y };
  }, []);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now) => {
      const dt = Math.min((now - lastTime) / 16.67, 2);
      lastTime = now;

      if (isHovering.current) {
        rotationRef.current.x += (targetRef.current.x - rotationRef.current.x) * 0.06 * dt;
        rotationRef.current.y += (targetRef.current.y - rotationRef.current.y) * 0.06 * dt;
      } else {
        rotationRef.current.y += autoSpeed * dt;
        rotationRef.current.x += (-15 - rotationRef.current.x) * 0.03 * dt;
      }

      if (containerRef.current) {
        const { x: rotX, y: rotY } = rotationRef.current;
        const radX = (rotX * Math.PI) / 180;
        const radY = (rotY * Math.PI) / 180;
        const cosX = Math.cos(radX), sinX = Math.sin(radX);
        const cosY = Math.cos(radY), sinY = Math.sin(radY);

        const tags = containerRef.current.querySelectorAll('.sphere-tag');
        tags.forEach((tag, i) => {
          if (!points[i]) return;
          const { x, y, z } = points[i];

          const x1 = x * cosY - z * sinY;
          const z1 = x * sinY + z * cosY;
          const y1 = y * cosX - z1 * sinX;
          const z2 = y * sinX + z1 * cosX;

          const scale = (z2 + 2) / 3;
          const projX = x1 * radius;
          const projY = y1 * radius;
          const opacity = Math.max(0.1, (z2 + 1) / 2);

          tag.style.transform = `translate(-50%, -50%) translate(${projX}px, ${projY}px) scale(${0.5 + scale * 0.6})`;
          tag.style.opacity = opacity;
          tag.style.zIndex = Math.round(z2 * 100);
          tag.style.filter = z2 < -0.2 ? `blur(${Math.abs(z2 + 0.2) * 2.5}px)` : 'none';
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [points, radius, autoSpeed]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center select-none"
      style={{
        width: radius * 2 + 80,
        height: radius * 2 + 80,
        cursor: 'grab',
        perspective: '1000px',
      }}
    >
      {points.map((point) => (
        <span
          key={point.label}
          className="sphere-tag absolute flex flex-col items-center gap-1 pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            willChange: 'transform, opacity',
          }}
        >
          {point.iconUrl ? (
            <img
              src={point.iconUrl}
              alt={point.label}
              width={36}
              height={36}
              loading="lazy"
              style={{
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))',
              }}
            />
          ) : (
            /* Fallback: colored initials circle */
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: `#${point.color}20`,
                border: `2px solid #${point.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6875rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: `#${point.color}`,
              }}
            >
              {point.label.substring(0, 2).toUpperCase()}
            </span>
          )}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              fontWeight: 500,
              color: 'var(--color-text-tertiary)',
              letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            {point.label}
          </span>
        </span>
      ))}
    </div>
  );
}
