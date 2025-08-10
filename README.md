# 🚀 Professional Aptitude Test Application

A modern, interactive aptitude test application built with React and Node.js, featuring live question generation and professional interview-focused content.

## ✨ Features

- **🎯 Multiple Difficulty Levels**: Easy (25Q), Hard (50Q), Advanced (75Q)
- **🌐 Live Question Generation**: Fetches questions from external APIs with intelligent fallback
- **💰 Indian Currency Support**: All financial questions use Indian Rupees (₹)
- **🔄 Dynamic Randomization**: Different questions and options every time
- **📊 Detailed Scoring**: Real-time scoring with percentage, grade, and time tracking
- **🏆 Leaderboard**: Track performance across all users
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **⚡ Fast & Modern**: Built with Vite + React for optimal performance

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast development and build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **Axios** - HTTP client for API calls
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aptitude-test-app.git
   cd aptitude-test-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
aptitude-test-app/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   └── assets/         # Static assets
│   ├── public/             # Public static files
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js backend API
│   ├── controllers/        # Route controllers
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── api/                    # Vercel serverless functions
└── vercel.json            # Vercel deployment config
```

## 🎮 How to Use

1. **Choose Difficulty**: Select Easy, Hard, or Advanced mode
2. **Read Instructions**: Review the test guidelines
3. **Start Test**: Begin answering randomized questions
4. **Submit Answers**: Complete the quiz and get instant results
5. **View Results**: See your score, percentage, grade, and time taken
6. **Check Leaderboard**: Compare your performance with others

## 🌐 Live Demo

Visit the live application: [https://your-app-name.vercel.app](https://your-app-name.vercel.app)

## 🔧 Configuration

### Environment Variables

**Frontend (.env.production)**
```bash
VITE_API_URL=/api
```

**Backend**
```bash
NODE_ENV=production
PORT=5000
```

## 📊 Question Sources

- **Primary**: OpenTDB (Open Trivia Database) API
- **Fallback**: Professional interview questions with Indian context
- **Categories**: Mathematics, Computer Science, Business, Statistics
- **Currency**: All financial questions use Indian Rupees (₹)

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

3. **Environment Setup**
   - No additional environment variables needed
   - Vercel handles the build process automatically

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenTDB](https://opentdb.com/) for providing free trivia questions
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for seamless deployment platform

## 📞 Support

If you have any questions or issues, please [open an issue](https://github.com/your-username/aptitude-test-app/issues) on GitHub.

---

**Made with ❤️ for professional interview preparation**
