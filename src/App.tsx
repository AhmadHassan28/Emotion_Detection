import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Header,
  InputBox,
  EmotionResult,
  Loader,
  EmotionHistory,
  EmotionChart,
} from './components';
import type { EmotionResult as EmotionResultType, EmotionHistoryItem } from './types';
import { detectEmotion } from './utils/emotionDetector';
import './index.css';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<EmotionResultType | null>(null);
  const [history, setHistory] = useState<EmotionHistoryItem[]>(() => {
    const savedHistory = localStorage.getItem('emotionHistory');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        return parsed.map((item: EmotionHistoryItem) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    }
    return [];
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse spotlight effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top } = containerRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('emotionHistory', JSON.stringify(history));
  }, [history]);

  const handleEmotionDetection = async (text: string) => {
    setIsLoading(true);

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = detectEmotion(text);
    setCurrentResult(result);

    const historyItem: EmotionHistoryItem = {
      id: Date.now().toString(),
      emotion: result.emotion,
      confidence: result.confidence,
      text: result.text,
      timestamp: result.timestamp,
    };

    setHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
    setIsLoading(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
    setCurrentResult(null);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const testSentences = [
    { text: "I am absolutely thrilled about the new project!", label: "Excitement" },
    { text: "This is so unfair, I'm really frustrated right now.", label: "Anger" },
    { text: "I'm so sorry for your loss, my heart goes out to you.", label: "Grief" },
    { text: "Wow, I never expected that to happen, it's amazing!", label: "Surprise" },
    { text: "I feel quite uneasy about the upcoming exam.", label: "Nervousness" },
  ];

  return (
    <div
      ref={containerRef}
      className={`min-h-screen relative transition-colors duration-500 overflow-x-hidden ${
        isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Dynamic Mouse Spotlight */}
      <div className="fixed inset-0 pointer-events-none spotlight" />

      {/* Aurora Mesh Background */}
      <div className="aurora-bg" />

      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-5xl">
        <Header isDark={isDark} onThemeToggle={toggleTheme} />

        <main className="flex flex-col gap-12 mt-12">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tighter"
            >
              Understand Your <span className="gradient-text">Emotions</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              Analyze text using advanced AI across 28 distinct emotional states. 
              Experience the future of sentiment analysis.
            </motion.p>
          </section>

          {/* Input & Result Area */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div className="space-y-8">
              <InputBox onSubmit={handleEmotionDetection} isLoading={isLoading} />
              
              {/* Predefined Test Buttons */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-3"
              >
                <span className="text-sm text-slate-500 w-full mb-1">Quick Tests:</span>
                {testSentences.map((test, i) => (
                  <button
                    key={i}
                    onClick={() => handleEmotionDetection(test.text)}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-full glass-morphism text-xs hover:bg-white/10 transition-colors border border-white/5"
                  >
                    {test.label}
                  </button>
                ))}
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-12"
                >
                  <Loader />
                </motion.div>
              ) : currentResult && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <EmotionResult result={currentResult} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Analytics & History */}
          {history.length > 0 && (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                <EmotionChart history={history} />
                <EmotionHistory history={history} onClear={handleClearHistory} />
              </div>
            </motion.div>
          )}
        </main>

        <footer className="mt-24 pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
          <p>© 2026 EmotionSense AI. Crafted for visual excellence.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
