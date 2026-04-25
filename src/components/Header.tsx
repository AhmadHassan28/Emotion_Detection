import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, onThemeToggle }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full py-6 px-4 mb-12"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="gradient-text text-4xl md:text-5xl font-bold">
            Emotion<span className="text-cyan-400">Sense</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base mt-2">
            Detect emotions from your text with AI
          </p>
        </motion.div>

        <motion.button
          onClick={onThemeToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="glass-morphism p-3 rounded-full backdrop-blur-lg transition-all"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-indigo-300" />
          )}
        </motion.button>
      </div>
    </motion.header>
  );
};
