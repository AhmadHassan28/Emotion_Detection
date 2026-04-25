import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

interface InputBoxProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export const InputBox: React.FC<InputBoxProps> = ({ onSubmit, isLoading }) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSubmit(text);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto mb-8"
    >
      <div className="relative group">
        {/* Animated Glow Border */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-rose-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isFocused ? 'opacity-75' : ''}`}></div>
        
        <div className="relative glass-card !p-0 overflow-hidden bg-slate-900/90 border-white/10">
          <div className="p-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="What's weighing on your heart today?"
              rows={4}
              disabled={isLoading}
              className="w-full bg-transparent border-none focus:ring-0 text-lg p-6 text-white placeholder-slate-500 resize-none min-h-[160px]"
            />
          </div>
          
          <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-t border-white/5">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Analysis Ready</span>
            </div>

            <div className="flex items-center gap-4">
              <span className={`text-xs ${text.length > 500 ? 'text-rose-400' : 'text-slate-500'}`}>
                {text.length} chars
              </span>
              <motion.button
                type="submit"
                disabled={!text.trim() || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-premium px-8 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:grayscale transition-all"
              >
                <span>Analyze</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.form>
  );
};
