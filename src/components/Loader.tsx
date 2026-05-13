import React from 'react';
import { motion } from 'framer-motion';

const bars = [
  { height: 24, dur: 0.8, delay: 0 },
  { height: 48, dur: 0.6, delay: 0.1 },
  { height: 32, dur: 0.9, delay: 0.2 },
  { height: 64, dur: 0.5, delay: 0.3 },
  { height: 56, dur: 0.7, delay: 0.1 },
  { height: 64, dur: 0.5, delay: 0.4 },
  { height: 32, dur: 0.8, delay: 0.2 },
  { height: 48, dur: 0.6, delay: 0.3 },
  { height: 24, dur: 0.9, delay: 0.1 },
];

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <div className="flex items-center gap-1.5 h-16">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-aurora-fuchsia via-aurora-purple to-aurora-cyan"
            initial={{ height: 10 }}
            animate={{ height: [10, bar.height, 10] }}
            transition={{
              duration: bar.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bar.delay,
            }}
          />
        ))}
      </div>
      <motion.span 
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="text-aurora-cyan text-[10px] uppercase tracking-[0.3em] font-bold"
      >
        Neural Analysis Active
      </motion.span>
    </div>
  );
};
