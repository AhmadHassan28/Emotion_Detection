import React from 'react';
import { motion } from 'framer-motion';

export const Loader: React.FC = () => {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const dotVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex items-center justify-center gap-2"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          variants={dotVariants}
          className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
        />
      ))}
      <span className="ml-3 text-gray-300 text-sm">AI is analyzing...</span>
    </motion.div>
  );
};
