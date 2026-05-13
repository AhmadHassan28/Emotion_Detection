// Enhanced input box with typing detection and magnetic hover effects.
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
  const [isTyping, setIsTyping] = useState(false);

  React.useEffect(() => {
    if (text) {
      setIsTyping(true);
      const timeout = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSubmit(text);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto mb-8"
    >
      <div className="relative group">
        {/* Animated Glow Border */}
        <motion.div 
          animate={{
            opacity: isTyping ? 0.9 : (isFocused ? 0.6 : 0.25),
            scale: isTyping ? 1.02 : (isFocused ? 1.01 : 1),
            filter: isTyping ? "hue-rotate(45deg)" : "hue-rotate(0deg)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute -inset-1 bg-gradient-to-r from-aurora-cyan via-aurora-purple to-aurora-fuchsia rounded-2xl blur-xl"
        />
        
        <div className="relative glass-card !p-0 overflow-hidden bg-slate-900/80 border-white/10 backdrop-blur-xl">
          <div className="p-1 relative z-10">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="What's weighing on your heart today?"
              rows={4}
              disabled={isLoading}
              className="w-full bg-transparent border-none focus:ring-0 text-xl p-6 text-white placeholder-slate-400 resize-none min-h-[160px] outline-none"
            />
          </div>
          
          <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-t border-white/5 relative z-10">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-widest">
              <motion.div
                animate={{ rotate: isTyping ? 360 : 0 }}
                transition={{ duration: 2, repeat: isTyping ? Infinity : 0, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-aurora-cyan" />
              </motion.div>
              <span>AI Analysis Ready</span>
            </div>

            <div className="flex items-center gap-4">
              <span className={`text-xs font-medium ${text.length > 500 ? 'text-aurora-fuchsia' : 'text-slate-400'}`}>
                {text.length} chars
              </span>
              <motion.button
                type="submit"
                disabled={!text.trim() || isLoading}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="btn-premium px-8 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:grayscale transition-all shadow-[0_0_20px_rgba(102,126,234,0.4)] hover:shadow-[0_0_30px_rgba(0,242,254,0.6)]"
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
