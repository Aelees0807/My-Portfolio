import { useEffect, useRef } from 'react';

/**
 * AmbientMesh — Fixed background layer rendering two soft gradient
 * blobs (muted blue + soft coral) at very low opacity (4-8%).
 *
 * Positioned off-center so glass panels above them pick up a faint
 * color tint. The blobs drift on a slow 20s CSS animation loop,
 * and this component adds a scroll-linked parallax shift so the
 * tint subtly changes as the user scrolls.
 */
export default function AmbientMesh() {
  const meshRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (meshRef.current) {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

            // Subtle parallax shift on the pseudo-element blobs via CSS var
            meshRef.current.style.setProperty('--scroll-progress', progress.toFixed(3));

            // Shift the secondary coral blob slightly based on scroll
            const secondaryBlob = meshRef.current.querySelector('.ambient-mesh-secondary');
            if (secondaryBlob) {
              const xShift = progress * 8;  // vw
              const yShift = progress * -12; // vh
              secondaryBlob.style.transform = `translate(${xShift}vw, ${yShift}vh) scale(${1 + progress * 0.06})`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="ambient-mesh" ref={meshRef} aria-hidden="true">
      {/* Additional coral blob for scroll-linked parallax (supplements ::after) */}
      <div
        className="ambient-mesh-secondary"
        style={{
          position: 'absolute',
          width: '40vw',
          height: '40vh',
          top: '30%',
          right: '5%',
          background: 'radial-gradient(circle, var(--color-mesh-coral), transparent 70%)',
          opacity: 0.04,
          borderRadius: '50%',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
