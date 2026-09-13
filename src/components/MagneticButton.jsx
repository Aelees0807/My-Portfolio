import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton — A wrapper component that shifts its children
 * slightly toward the mouse cursor on hover (magnetic effect).
 * Used for social icons and interactive glass elements.
 */
export default function MagneticButton({ children, className = '', href, ...props }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for X and Y shifts
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to make the magnetic pull feel physical
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.25); // Strength of the magnetic pull
    y.set(middleY * 0.25);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const Element = href ? motion.a : motion.div;

  return (
    <Element
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x: springX, y: springY }}
      className={`relative flex items-center justify-center ${className}`}
      {...props}
    >
      {/* We can also optionally apply a subtle scale to the inner children */}
      <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        {children}
      </motion.div>
    </Element>
  );
}
