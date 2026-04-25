import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { EmotionHistoryItem, Emotion } from '../types';
interface EmotionChartProps {
  history: EmotionHistoryItem[];
}

export const EmotionChart: React.FC<EmotionChartProps> = ({ history }) => {
  const chartData = useMemo(() => {
    const allEmotions: Emotion[] = [
      'admiration', 'amusement', 'anger', 'annoyance', 'approval', 'caring',
      'confusion', 'curiosity', 'desire', 'disappointment', 'disapproval',
      'disgust', 'embarrassment', 'excitement', 'fear', 'gratitude', 'grief',
      'joy', 'love', 'nervousness', 'optimism', 'pride', 'realization', 'relief',
      'remorse', 'sadness', 'surprise', 'neutral'
    ];
    
    // Count emotions and filter out ones with 0 count to avoid clutter
    const data = allEmotions.map((emotion) => ({
      name: emotion.charAt(0).toUpperCase() + emotion.slice(1),
      count: history.filter((h) => h.emotion === emotion).length,
      emotion,
    })).filter(item => item.count > 0).sort((a, b) => b.count - a.count);

    return data;
  }, [history]);

  const totalEmotions = history.length;

  if (totalEmotions === 0) return null;

  // Extract a single hex color from tailwind gradient classes to use as a stop color
  // A simplistic mapping, mapping the 28 emotions to base hex colors for the SVG gradients
  const baseColors: Record<Emotion, string> = {
    admiration: '#f43f5e', amusement: '#fcd34d', anger: '#ef4444', annoyance: '#f97316', 
    approval: '#4ade80', caring: '#2dd4bf', confusion: '#9ca3af', curiosity: '#67e8f9', 
    desire: '#d946ef', disappointment: '#64748b', disapproval: '#f43f5e', disgust: '#84cc16', 
    embarrassment: '#fda4af', excitement: '#facc15', fear: '#9333ea', gratitude: '#34d399', 
    grief: '#52525b', joy: '#facc15', love: '#f87171', nervousness: '#a78bfa', 
    optimism: '#22d3ee', pride: '#fbbf24', realization: '#38bdf8', relief: '#5eead4',
    remorse: '#94a3b8', sadness: '#3b82f6', surprise: '#22d3ee', neutral: '#9ca3af'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto mt-12"
    >
      <div className="glass-card">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold gradient-text mb-6"
        >
          Emotion Distribution
        </motion.h3>

        <div className="bg-white/5 rounded-lg p-4 overflow-x-auto">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <defs>
                {chartData.map((entry) => (
                  <linearGradient
                    key={entry.emotion}
                    id={`gradient-${entry.emotion}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={baseColors[entry.emotion]} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={baseColors[entry.emotion]} stopOpacity={0.2} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                style={{ fontSize: '11px' }}
                tick={{fill: '#9ca3af'}}
                tickMargin={10}
                interval={0}
                angle={chartData.length > 6 ? -45 : 0}
                textAnchor={chartData.length > 6 ? "end" : "middle"}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} tick={{fill: '#9ca3af'}} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                  color: '#fff',
                }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              />
              <Bar
                dataKey="count"
                radius={[6, 6, 0, 0]}
                animationDuration={1500}
                maxBarSize={40}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.emotion}
                    fill={`url(#gradient-${entry.emotion})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4 mt-6"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Total Analyses</p>
            <p className="text-3xl font-bold text-white">{totalEmotions}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">Top Emotion</p>
            <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center">
              {chartData.length > 0 ? chartData[0].name : '-'}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

