import type { Emotion, EmotionResult } from '../types';
import keywordsData from './emotion_keywords.json';

const emotionKeywords: Record<Emotion, string[]> = keywordsData.topKeywords as Record<Emotion, string[]>;

// Words that appear in too many categories and dilute the signal.
// Expanded to cover very common filler/context words.
const SIGNAL_BLACKLIST = new Set([
  'name', 'his', 'her', 'were', 'was', 'been', 'being', 'having',
  'these', 'those', 'that', 'this', 'our', 'ive', 'hes', 'shes',
  'today', 'tomorrow', 'yesterday', 'feel', 'am', 'are', 'the',
  'got', 'back', 'off', 'over', 'down', 'into', 'same', 'still',
  'man', 'guy', 'dude', 'post', 'game', 'sub', 'comment', 'year', 'years',
  'going', 'getting', 'find', 'sure', 'just', 'also', 'even', 'now'
]);

// Direct high-confidence keyword → emotion map.
// These unambiguous words override keyword scoring if they appear in the text.
const DIRECT_KEYWORDS: Partial<Record<string, Emotion>> = {
  sad: 'sadness', unhappy: 'sadness', depressed: 'sadness', miserable: 'sadness',
  crying: 'sadness', heartbroken: 'sadness', hopeless: 'sadness', lonely: 'sadness',
  angry: 'anger', furious: 'anger', rage: 'anger', outraged: 'anger', hate: 'anger',
  happy: 'joy', joyful: 'joy', delighted: 'joy', elated: 'joy', cheerful: 'joy',
  excited: 'excitement', thrilled: 'excitement', ecstatic: 'excitement',
  scared: 'fear', afraid: 'fear', terrified: 'fear', anxious: 'nervousness',
  disgusted: 'disgust', gross: 'disgust', revolting: 'disgust',
  surprised: 'surprise', shocked: 'surprise', astonished: 'surprise',
  grateful: 'gratitude', thankful: 'gratitude', appreciate: 'gratitude',
  proud: 'pride', accomplished: 'pride',
  embarrassed: 'embarrassment', ashamed: 'embarrassment',
  confused: 'confusion', puzzled: 'confusion', baffled: 'confusion',
  curious: 'curiosity', intrigued: 'curiosity', wondering: 'curiosity',
  sorry: 'remorse', regret: 'remorse', guilty: 'remorse',
  love: 'love', adore: 'love', cherish: 'love',
  hopeful: 'optimism', optimistic: 'optimism',
  relieved: 'relief', relief: 'relief',
  grief: 'grief', mourning: 'grief', grieving: 'grief',
};

export const detectEmotion = (text: string): EmotionResult => {
  const lowerText = text.toLowerCase();
  const words = lowerText.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 0);

  const emotionScores: Record<Emotion, number> = {
    admiration: 0, amusement: 0, anger: 0, annoyance: 0, approval: 0, caring: 0,
    confusion: 0, curiosity: 0, desire: 0, disappointment: 0, disapproval: 0,
    disgust: 0, embarrassment: 0, excitement: 0, fear: 0, gratitude: 0, grief: 0,
    joy: 0, love: 0, nervousness: 0, optimism: 0, pride: 0, realization: 0, relief: 0,
    remorse: 0, sadness: 0, surprise: 0, neutral: 0
  };

  const intensityKeywords: Record<string, number> = {
    'very': 1.5, 'so': 1.5, 'really': 1.5, 'extremely': 2, 'absolutely': 2,
    'completely': 1.5, 'totally': 1.5, 'such': 1.5, 'almost': 1.2, 'quite': 1.2,
    'truly': 1.5, 'deeply': 1.5, 'hugely': 1.5, 'insanely': 2, 'incredibly': 2,
    'desperately': 2, 'terribly': 1.5, 'awfully': 1.5, 'severely': 1.5
  };

  const negationKeywords = ['not', 'no', 'never', 'neither', "don't", "doesn't", "didn't", "won't", "can't", "isnt", "arent", "wasnt", "werent"];

  let currentIntensity = 1;
  let lastNegationIndex = -1;

  words.forEach((word, index) => {
    // 1. Check for Negation
    if (negationKeywords.includes(word)) {
      lastNegationIndex = index;
      return;
    }

    // 2. Check for Intensity
    if (intensityKeywords[word]) {
      currentIntensity = intensityKeywords[word];
      return;
    }

    // 3. Skip Blacklisted "Noise" Words
    if (SIGNAL_BLACKLIST.has(word)) {
      return;
    }

    // 4. Check Direct High-Confidence Keywords FIRST (strong +3 boost)
    const directEmotion = DIRECT_KEYWORDS[word];
    if (directEmotion) {
      const isNegated = lastNegationIndex !== -1 && (index - lastNegationIndex <= 3);
      if (isNegated) {
        emotionScores[directEmotion] -= currentIntensity * 3;
      } else {
        emotionScores[directEmotion] += currentIntensity * 3;
      }
      currentIntensity = 1;
      return; // Skip the general keyword loop for this word
    }

    // 5. General Keyword Scoring (from JSON file)
    let foundMatch = false;
    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      if (!keywords) continue;
      
      // Stemming check
      const isMatch = keywords.includes(word) || 
                      keywords.includes(word + 's') || 
                      keywords.includes(word.replace(/ing$/, 'e')) || 
                      keywords.includes(word.replace(/ing$/, ''));

      if (isMatch) {
        // Apply Negation (window of 3 words)
        const isNegated = lastNegationIndex !== -1 && (index - lastNegationIndex <= 3);
        
        if (isNegated) {
          emotionScores[emotion as Emotion] -= currentIntensity * 1.5;
        } else {
          emotionScores[emotion as Emotion] += currentIntensity;
        }
        foundMatch = true;
      }
    }

    if (foundMatch) {
      currentIntensity = 1;
    }
  });

  const totalScore = Object.values(emotionScores).reduce((a, b) => a + b, 0);

  if (totalScore <= 0) {
    emotionScores.neutral += 1;
  }

  // Find emotion with highest score
  const topEmotion = Object.entries(emotionScores).reduce((prev, current) =>
    current[1] > prev[1] ? current : prev
  )[0] as Emotion;

  const maxScore = Math.max(...Object.values(emotionScores));
  const confidence = Math.min(0.4 + (maxScore / (words.length + 1)) * 0.6, 1.0);

  return {
    emotion: topEmotion,
    confidence: parseFloat(confidence.toFixed(2)),
    timestamp: new Date(),
    text
  };
};

export const getEmotionEmoji = (emotion: Emotion): string => {
  const emojis: Record<Emotion, string> = {
    admiration: '🤩', amusement: '😂', anger: '😡', annoyance: '😒', approval: '👍', caring: '🤗',
    confusion: '😕', curiosity: '🤔', desire: '😏', disappointment: '😞', disapproval: '👎',
    disgust: '🤢', embarrassment: '😳', excitement: '🎉', fear: '😨', gratitude: '🙏', grief: '😭',
    joy: '😊', love: '❤️', nervousness: '😬', optimism: '🌟', pride: '🦚', realization: '💡', relief: '😌',
    remorse: '😔', sadness: '😢', surprise: '😲', neutral: '😐'
  };
  return emojis[emotion] || '😐';
};

export const getEmotionColor = (emotion: Emotion): string => {
  const colors: Record<Emotion, string> = {
    admiration: 'from-pink-400 to-rose-600', amusement: 'from-yellow-300 to-orange-400', 
    anger: 'from-red-500 to-pink-600', annoyance: 'from-orange-500 to-red-600', 
    approval: 'from-green-400 to-emerald-600', caring: 'from-teal-400 to-cyan-600',
    confusion: 'from-gray-400 to-slate-600', curiosity: 'from-blue-300 to-cyan-500', 
    desire: 'from-fuchsia-400 to-pink-600', disappointment: 'from-slate-500 to-gray-700', 
    disapproval: 'from-rose-500 to-red-700', disgust: 'from-lime-500 to-green-700', 
    embarrassment: 'from-rose-300 to-pink-500', excitement: 'from-yellow-400 to-orange-500', 
    fear: 'from-purple-600 to-indigo-800', gratitude: 'from-emerald-400 to-teal-600', 
    grief: 'from-zinc-600 to-neutral-800', joy: 'from-yellow-400 to-orange-500', 
    love: 'from-red-400 to-rose-600', nervousness: 'from-violet-400 to-purple-600', 
    optimism: 'from-cyan-400 to-blue-500', pride: 'from-amber-400 to-orange-600', 
    realization: 'from-sky-400 to-indigo-500', relief: 'from-teal-300 to-emerald-500',
    remorse: 'from-slate-400 to-zinc-600', sadness: 'from-blue-500 to-indigo-700', 
    surprise: 'from-cyan-400 to-blue-500', neutral: 'from-gray-400 to-gray-600'
  };
  return colors[emotion] || 'from-gray-400 to-gray-600';
};

export const getEmotionDescription = (emotion: Emotion): string => {
  const descriptions: Record<Emotion, string> = {
    admiration: 'You feel a strong sense of respect or warm approval.',
    amusement: 'Something is bringing you a sense of humor or entertainment.',
    anger: 'You are experiencing strong displeasure or hostility.',
    annoyance: 'Something is irritating or bothering you.',
    approval: 'You are expressing agreement or a positive opinion.',
    caring: 'You feel concern or kindness for others.',
    confusion: 'You are uncertain or unclear about something.',
    curiosity: 'You have a strong desire to know or learn something.',
    desire: 'You have a strong feeling of wanting to have something.',
    disappointment: 'You feel let down because expectations were not met.',
    disapproval: 'You are expressing an unfavorable opinion.',
    disgust: 'You are feeling strong revulsion or profound disapproval.',
    embarrassment: 'You are feeling self-conscious, shame, or awkwardness.',
    excitement: 'You feel thrilled, eager, or enthusiastic.',
    fear: 'You are feeling afraid, worried, or anxious.',
    gratitude: 'You are feeling thankful and appreciative.',
    grief: 'You are experiencing deep sorrow or intense sadness.',
    joy: 'You feel great pleasure, happiness, and delight.',
    love: 'You are feeling deep affection and fondness.',
    nervousness: 'You are feeling anxious, unsettled, or apprehensive.',
    optimism: 'You feel hopeful and confident about the future.',
    pride: 'You feel deep satisfaction from an achievement or quality.',
    realization: 'You just became fully aware of something as a fact.',
    relief: 'You are feeling reassurance and relaxation following anxiety.',
    remorse: 'You are feeling deep regret or guilt for a wrong committed.',
    sadness: 'You are feeling sorrowful, unhappy, or down.',
    surprise: 'Something unexpected just occurred!',
    neutral: 'You are in a calm, balanced, and objective state.'
  };
  return descriptions[emotion] || 'An intriguing emotional state.';
};
