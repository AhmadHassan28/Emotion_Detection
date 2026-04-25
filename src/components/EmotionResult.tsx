import React from 'react';
import { motion } from 'framer-motion';
import type { EmotionResult as EmotionResultType } from '../types';
import { getEmotionEmoji, getEmotionColor, getEmotionDescription } from '../utils/emotionDetector';

interface EmotionResultProps {
  result: EmotionResultType | null;
//   isLoading: boolean;
}

export const EmotionResult: React.FC<EmotionResultProps> = ({ result }) => {
  if (!result) return null;

  const emoji = getEmotionEmoji(result.emotion);
  const colorClass = getEmotionColor(result.emotion);
  const description = getEmotionDescription(result.emotion);
  const confidencePercentage = Math.round(result.confidence * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="glass-card backdrop-blur-xl border-2 border-cyan-400/30">
        {/* Animated Emoji */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-7xl mb-6"
        >
          {emoji}
        </motion.div>

        {/* Emotion Label */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent mb-3`}
        >
          {result.emotion.charAt(0).toUpperCase() + result.emotion.slice(1)}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 text-lg mb-6"
        >
          {description}
        </motion.p>

        {/* Confidence Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Confidence Level</span>
            <span className="text-sm font-semibold text-cyan-400">{confidencePercentage}%</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${confidencePercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${colorClass}`}
            />
          </div>
        </motion.div>

        {/* Input Text Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 rounded-lg p-4 border border-white/10"
        >
          <p className="text-xs text-gray-400 mb-2">Your input:</p>
          <p className="text-gray-200 text-sm italic">&quot;{result.text}&quot;</p>
        </motion.div>

        {/* Timestamp */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-gray-500 mt-4 text-center"
        >
          {result.timestamp.toLocaleTimeString()}
        </motion.p>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 400 - 200,
              y: 0,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * 400 - 200,
              y: 50,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
            }}
            className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${colorClass}`}
          />
        ))}
      </div>
    </motion.div>
  );
};
