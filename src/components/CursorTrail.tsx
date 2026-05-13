import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const PARTICLE_COUNT = 12;

export const CursorTrail: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Particle configurations
  const particles = useMemo(() => {
    return [...Array(PARTICLE_COUNT)].map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      // Unique spring physics for each particle to create organic movement
      stiffness: 150 + Math.random() * 200,
      damping: 15 + Math.random() * 20,
      mass: 0.5 + Math.random() * 1.5,
      offset: {
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
      },
      color: i % 3 === 0 ? 'bg-aurora-cyan' : i % 3 === 1 ? 'bg-aurora-purple' : 'bg-aurora-fuchsia',
    }));
  }, []);

  // Initialize springs for each particle
  const springParticles = particles.map(p => ({
    x: useSpring(mouseX, { stiffness: p.stiffness, damping: p.damping, mass: p.mass }),
    y: useSpring(mouseY, { stiffness: p.stiffness, damping: p.damping, mass: p.mass }),
    ...p
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      {springParticles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full blur-[2px] opacity-60 mix-blend-screen ${p.color}`}
          style={{
            x: p.x,
            y: p.y,
            width: p.size,
            height: p.size,
            left: p.offset.x,
            top: p.offset.y,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Central glow core that follows most closely */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-white blur-[8px] opacity-40 mix-blend-screen"
        style={{
          x: useSpring(mouseX, { stiffness: 1000, damping: 50 }),
          y: useSpring(mouseY, { stiffness: 1000, damping: 50 }),
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
};
