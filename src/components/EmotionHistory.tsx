import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { EmotionHistoryItem } from '../types';
import { getEmotionEmoji, getEmotionColor } from '../utils/emotionDetector';

interface EmotionHistoryProps {
  history: EmotionHistoryItem[];
  onClear: () => void;
}

export const EmotionHistory: React.FC<EmotionHistoryProps> = ({ history, onClear }) => {
  if (history.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto mt-12"
    >
      <div className="glass-card">
        <div className="flex items-center justify-between mb-6">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold gradient-text"
          >
            Emotion History
          </motion.h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Clear</span>
          </motion.button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-morphism p-4 flex items-start gap-4 hover:bg-white/15 transition-all`}
              >
                <span className="text-3xl">
                  {getEmotionEmoji(item.emotion)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      className={`font-semibold bg-gradient-to-r ${getEmotionColor(
                        item.emotion
                      )} bg-clip-text text-transparent`}
                    >
                      {item.emotion.charAt(0).toUpperCase() + item.emotion.slice(1)}
                    </h4>
                    <span className="text-xs text-gray-400">
                      ({Math.round(item.confidence * 100)}%)
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    &quot;{item.text}&quot;
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
