import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorTrail: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fast spring for the outer ring
  const springConfigRing = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpringRing = useSpring(cursorX, springConfigRing);
  const cursorYSpringRing = useSpring(cursorY, springConfigRing);

  // Slower, highly damped spring for the glowing trailing core
  const springConfigCore = { damping: 40, stiffness: 200, mass: 0.8 };
  const cursorXSpringCore = useSpring(cursorX, springConfigCore);
  const cursorYSpringCore = useSpring(cursorY, springConfigCore);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // Offset by half the width/height to center on the mouse
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile/touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer sharp ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] w-8 h-8 rounded-full border border-aurora-cyan/50"
        style={{
          x: cursorXSpringRing,
          y: cursorYSpringRing,
        }}
      />
      {/* Trailing glowing core */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] w-8 h-8 rounded-full bg-gradient-to-r from-aurora-fuchsia to-aurora-purple mix-blend-screen blur-[10px] opacity-70"
        style={{
          x: cursorXSpringCore,
          y: cursorYSpringCore,
        }}
      />
    </>
  );
};
