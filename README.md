# FitPro - React Fitness & Bodybuilding Platform

A modern, comprehensive fitness and bodybuilding web application built with React, featuring glassmorphism design, AI-powered meal tracking, and personalized training programs.

## 🚀 Features

### ✨ Core Features
- **Authentication System** - Login/Signup with localStorage persistence
- **Comprehensive Onboarding** - Multi-step form collecting user data
- **Personalization Engine** - AI-powered recommendations based on age, goals, and activity level
- **Smart Meal Planner** - Photo-based meal tracking with simulated AI analysis
- **Dynamic Training Library** - 25+ exercises across 5 training styles
- **Progress Tracking** - Monitor body measurements and transformation
- **Responsive Design** - Mobile-first, works on all devices

### 🎨 Design Features
- **Glassmorphism UI** - Frosted glass effects with backdrop blur
- **Smooth Animations** - Framer Motion & AOS animations
- **Modern Gradients** - Purple, blue, and teal color schemes
- **Responsive Layout** - Adapts to desktop, tablet, and mobile

## 🛠️ Tech Stack

- **React 18** - Latest React with Hooks
- **React Router v6** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Advanced animations
- **AOS** - Scroll animations
- **Context API** - Global state management
- **LocalStorage** - Data persistence

## 📦 Installation

```bash
# Navigate to the React app directory
cd fitpro-react

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🏗️ Project Structure

```
fitpro-react/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   └── AppContext.js
│   ├── pages/
│   │   ├── LandingPage.js
│   │   ├── AuthPage.js
│   │   ├── OnboardingPage.js
│   │   └── DashboardPage.js
│   ├── styles/
│   │   └── GlobalStyles.js
│   ├── utils/
│   │   └── PersonalizationEngine.js
│   ├── App.js
│   └── index.js
├── public/
└── package.json
```

## 🎯 Key Components

### AppContext
Global state management for:
- User authentication
- User data (profile, goals, measurements)
- Meals tracking
- Exercises logging
- Progress history

### PersonalizationEngine
Calculates personalized recommendations:
- **Calorie Targets** - Using Mifflin-St Jeor equation
- **Macro Distribution** - Based on fitness goals
- **Workout Plans** - Age and goal-adjusted
- **Meal Plans** - Customized nutrition schedules

### Pages

#### LandingPage
- Hero section with features
- Call-to-action buttons
- Animated feature cards

#### AuthPage
- Login/Signup forms
- Tab switching
- Form validation

#### OnboardingPage
- 4-step wizard:
  1. Gender selection
  2. Body stats (age, height, weight)
  3. Fitness goals
  4. Health & activity level

#### DashboardPage
- **Overview** - Daily stats and workout preview
- **Meal Planner** - Photo upload, AI analysis, meal history
- **Training** - Exercise library with filters
- **Progress** - Stats and goals tracking

## 🎨 Styling System

### Glassmorphism
```javascript
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.18);
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
```

### Color Palette
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#ec4899` (Pink)
- Success: `#10b981` (Green)
- Background: Gradient from `#667eea` to `#764ba2`

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🔐 Authentication Flow

1. User signs up with name, email, password
2. Redirected to onboarding
3. Completes 4-step onboarding
4. Data saved to localStorage
5. Redirected to dashboard
6. Protected routes check authentication

## 💾 Data Persistence

All data is stored in localStorage:
- `fitpro_user_{email}` - User profile data
- `fitpro_meals_{email}` - Meal history
- `fitpro_last_user` - Last logged-in user

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build for Production
```bash
npm run build
# Deploy the 'build' folder to any static hosting
```

## 🔮 Future Enhancements

- [ ] Real AI Vision API integration for meal analysis
- [ ] Backend API with database
- [ ] Social features (friends, challenges)
- [ ] Workout video library
- [ ] Progress charts with Chart.js
- [ ] Push notifications
- [ ] Dark/Light theme toggle
- [ ] Multi-language support

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 👨‍💻 Development

```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build

# Eject (not recommended)
npm run eject
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using React and modern web technologies
