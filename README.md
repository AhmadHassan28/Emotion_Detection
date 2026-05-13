<!-- EmotionSense Application Repository -->
# 🧠 EmotionSense - AI-Powered Emotion Detection App

A beautiful, modern React web application that detects emotions from text using advanced AI. Built with cutting-edge technologies including Framer Motion animations, glassmorphism design, and a stunning UI.

## ✨ Features

### Core Functionality
- 🎯 **Text-Based Emotion Detection** - Analyze emotions from any text input
- 😊 **6 Emotion Categories** - Happy, Sad, Angry, Fear, Surprise, Neutral
- 📊 **Confidence Score** - See how confident the AI is about the detected emotion
- 💾 **Emotion History** - Keep track of all your past emotion detections
- 📈 **Emotion Distribution Chart** - Visualize your emotional trends

### UI/UX Enhancements
- 🎨 **Glassmorphism Design** - Modern frosted glass aesthetic
- ✨ **Smooth Animations** - Powered by Framer Motion
- 🌙 **Dark/Light Mode** - Toggle between themes
- 📱 **Fully Responsive** - Works on all devices
- 🎭 **Animated Emojis** - Floating and rotating emotion reactions
- 💫 **Loading Animation** - Beautiful AI thinking animation
- 🌈 **Gradient Effects** - Eye-catching gradient text and backgrounds

### Bonus Features
- 🔄 **Floating Background Animation** - Dynamic gradient background
- 📝 **Floating Label Input** - Material Design inspired input field
- 🎪 **Particle Effects** - Decorative animated particles
- 📊 **Interactive Charts** - Recharts visualization of emotion distribution
- 💾 **LocalStorage Persistence** - Your history is saved automatically

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
```bash
cd emotion_detection
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open in browser:**
Visit `http://localhost:5173` (or the URL shown in terminal)

## 🛠️ Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 📦 Technologies Used

### Frontend Framework & Build Tools
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Lightning fast build tool
- **Tailwind CSS** - Utility-first CSS framework

### Animations & Visualization
- **Framer Motion** - Smooth, production-ready animations
- **Recharts** - Beautiful chart library
- **Lucide React** - Icon library

### Styling
- **Tailwind CSS** - Responsive design
- **Glassmorphism CSS** - Modern frosted glass effect
- **Gradient Animations** - Dynamic background effects

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation & theme toggle
│   ├── InputBox.tsx     # Text input with animations
│   ├── EmotionResult.tsx # Emotion display & results
│   ├── Loader.tsx       # Loading animation
│   ├── EmotionHistory.tsx # Past emotion records
│   ├── EmotionChart.tsx  # Emotion distribution chart
│   └── index.ts         # Component exports
├── utils/
│   └── emotionDetector.ts # Emotion detection logic
├── types/
│   └── index.ts         # TypeScript interfaces
├── App.tsx              # Main app component
├── index.css            # Global styles
└── main.tsx             # Entry point
```

## 🧠 Emotion Detection Logic

The app uses a keyword-based emotion detection algorithm that:
1. Analyzes text for emotion-related keywords
2. Calculates confidence scores based on keyword density
3. Returns the most likely emotion with a confidence percentage

### Supported Emotions
- 😊 **Happy** - Joyful, excited, positive
- 😢 **Sad** - Unhappy, melancholic, sorrowful
- 😡 **Angry** - Frustrated, furious, irritated
- 😨 **Fear** - Anxious, worried, scared
- 😲 **Surprise** - Amazed, shocked, startled
- 😐 **Neutral** - Calm, regular, ordinary

## 🎨 Design System

### Colors
- Primary: Cyan (#00BCD4)
- Accent: Purple (#6366F1)
- Background: Dark Slate (#0F172A)
- Glass: Transparent White (rgba(255, 255, 255, 0.1))

### Typography
- Font: System UI / Segoe UI
- Size Scale: Responsive (mobile-first)

### Components
- Glass Cards - Frosted glass effect with backdrop blur
- Gradient Text - Animated color transitions
- Glow Buttons - Neon-style hover effects
- Floating Animations - Smooth upward movements

## 💡 Usage Examples

### Basic Usage
1. Type your feeling or thought in the input box
2. Click the send button or press Enter
3. Wait for the AI to analyze (1.5 seconds)
4. See your emotion result with confidence score

### Tracking Emotions
- View your entire emotion history below the results
- See emotion distribution in the interactive chart
- Clear history with one click
- All data is saved to your browser's local storage

## 🔧 Configuration

### Tailwind CSS
Customize colors, animations, and more in `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255, 255, 255, 0.1)',
      },
      // Add more customizations here
    },
  },
}
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Module Not Found
```bash
npm install
```

### Styling Issues
Clear cache and rebuild:
```bash
rm -rf node_modules
npm install
npm run dev
```

## 📊 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: All modern versions

## 🚀 Performance

- ⚡ **Vite HMR** - Instant hot module replacement
- 📦 **Optimized Bundle** - Tree-shaking & code splitting
- 🎬 **GPU Acceleration** - Hardware-accelerated animations
- 📱 **Mobile Optimized** - Responsive and fast

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Improve documentation
- Submit pull requests

## 🎯 Future Enhancements

- [ ] Sound effects for emotions
- [ ] Multi-language support
- [ ] Advanced NLP API integration
- [ ] Export history as PDF
- [ ] Share emotions on social media
- [ ] Emotion predictions
- [ ] Real-time typing analysis
- [ ] Emotion intensity scale

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Made with ❤️ using React, Framer Motion, and Tailwind CSS**
