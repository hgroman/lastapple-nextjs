'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      {/* Primary crimson glow */}
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(350 70% 50% / 0.06) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
      {/* Secondary teal glow - offset */}
      <motion.div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(180 55% 45% / 0.04) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          x: mousePosition.x + 100,
          y: mousePosition.y + 50,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 0.2,
        }}
      />
    </motion.div>
  );
}
