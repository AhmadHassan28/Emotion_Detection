export interface EmotionResult {
  emotion: Emotion;
  confidence: number;
  timestamp: Date;
  text: string;
}

export type Emotion = 
  | 'admiration' | 'amusement' | 'anger' | 'annoyance' | 'approval' | 'caring'
  | 'confusion' | 'curiosity' | 'desire' | 'disappointment' | 'disapproval'
  | 'disgust' | 'embarrassment' | 'excitement' | 'fear' | 'gratitude' | 'grief'
  | 'joy' | 'love' | 'nervousness' | 'optimism' | 'pride' | 'realization' | 'relief'
  | 'remorse' | 'sadness' | 'surprise' | 'neutral';
export interface EmotionHistoryItem {
  id: string;
  emotion: Emotion;
  confidence: number;
  text: string;
  timestamp: Date;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
