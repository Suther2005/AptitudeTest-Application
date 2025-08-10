const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for quiz sessions
const quizSessions = new Map();

// Comprehensive Aptitude Questions Database for Placements
const APTITUDE_QUESTIONS = {
  easy: [
    {
      id: 1,
      question: "If a train travels 120 km in 2 hours, what is its speed?",
      options: ["60 km/h", "50 km/h", "70 km/h", "80 km/h"],
      correctAnswer: "60 km/h",
      category: "Speed & Distance",
      explanation: "Speed = Distance/Time = 120/2 = 60 km/h"
    },
    {
      id: 2,
      question: "What is 15% of 200?",
      options: ["30", "25", "35", "40"],
      correctAnswer: "30",
      category: "Percentage",
      explanation: "15% of 200 = (15/100) × 200 = 30"
    },
    {
      id: 3,
      question: "If 5 books cost Rs. 250, what is the cost of 3 books?",
      options: ["Rs. 150", "Rs. 120", "Rs. 180", "Rs. 100"],
      correctAnswer: "Rs. 150",
      category: "Ratio & Proportion",
      explanation: "Cost of 1 book = 250/5 = 50. Cost of 3 books = 50×3 = 150"
    },
    {
      id: 4,
      question: "What is the next number in the series: 2, 4, 8, 16, ?",
      options: ["32", "24", "20", "28"],
      correctAnswer: "32",
      category: "Number Series",
      explanation: "Each number is multiplied by 2: 16×2 = 32"
    },
    {
      id: 5,
      question: "If today is Monday, what day will it be after 10 days?",
      options: ["Thursday", "Wednesday", "Friday", "Tuesday"],
      correctAnswer: "Thursday",
      category: "Calendar",
      explanation: "10 days = 1 week + 3 days. Monday + 3 days = Thursday"
    },
    {
      id: 6,
      question: "Simple Interest on Rs. 1000 at 5% per annum for 2 years is:",
      options: ["Rs. 100", "Rs. 150", "Rs. 50", "Rs. 200"],
      correctAnswer: "Rs. 100",
      category: "Simple Interest",
      explanation: "SI = (P×R×T)/100 = (1000×5×2)/100 = 100"
    },
    {
      id: 7,
      question: "What is the average of 10, 20, 30, 40?",
      options: ["25", "30", "20", "35"],
      correctAnswer: "25",
      category: "Average",
      explanation: "Average = (10+20+30+40)/4 = 100/4 = 25"
    },
    {
      id: 8,
      question: "If A = 1, B = 2, C = 3, what is the value of CAB?",
      options: ["312", "321", "123", "132"],
      correctAnswer: "312",
      category: "Coding",
      explanation: "C=3, A=1, B=2, so CAB = 312"
    },
    {
      id: 9,
      question: "A man buys 12 pens for Rs. 60. What is the cost of 1 pen?",
      options: ["Rs. 5", "Rs. 4", "Rs. 6", "Rs. 3"],
      correctAnswer: "Rs. 5",
      category: "Basic Math",
      explanation: "Cost of 1 pen = 60/12 = 5"
    },
    {
      id: 10,
      question: "What is 25% of 80?",
      options: ["20", "15", "25", "30"],
      correctAnswer: "20",
      category: "Percentage",
      explanation: "25% of 80 = (25/100) × 80 = 20"
    },
    {
      id: 11,
      question: "If 1 dozen = 12, how many items are in 3 dozens?",
      options: ["36", "30", "24", "48"],
      correctAnswer: "36",
      category: "Basic Math",
      explanation: "3 dozens = 3 × 12 = 36"
    },
    {
      id: 12,
      question: "What comes next: A, C, E, G, ?",
      options: ["I", "H", "J", "K"],
      correctAnswer: "I",
      category: "Letter Series",
      explanation: "Skipping one letter each time: A(+2)C(+2)E(+2)G(+2)I"
    },
    {
      id: 13,
      question: "If x + 5 = 12, what is x?",
      options: ["7", "6", "8", "5"],
      correctAnswer: "7",
      category: "Algebra",
      explanation: "x + 5 = 12, so x = 12 - 5 = 7"
    },
    {
      id: 14,
      question: "Area of a square with side 4 cm is:",
      options: ["16 sq cm", "12 sq cm", "8 sq cm", "20 sq cm"],
      correctAnswer: "16 sq cm",
      category: "Geometry",
      explanation: "Area of square = side² = 4² = 16 sq cm"
    },
    {
      id: 15,
      question: "What is 2³?",
      options: ["8", "6", "9", "4"],
      correctAnswer: "8",
      category: "Powers",
      explanation: "2³ = 2 × 2 × 2 = 8"
    },
    {
      id: 16,
      question: "If a clock shows 3:00, what angle is between hour and minute hands?",
      options: ["90°", "60°", "120°", "45°"],
      correctAnswer: "90°",
      category: "Clock Problems",
      explanation: "At 3:00, hour hand at 3, minute hand at 12. Angle = 3×30° = 90°"
    },
    {
      id: 17,
      question: "What is the LCM of 4 and 6?",
      options: ["12", "10", "8", "24"],
      correctAnswer: "12",
      category: "LCM & HCF",
      explanation: "Multiples of 4: 4,8,12,16... Multiples of 6: 6,12,18... LCM = 12"
    },
    {
      id: 18,
      question: "If 2x = 10, then x = ?",
      options: ["5", "4", "6", "3"],
      correctAnswer: "5",
      category: "Basic Algebra",
      explanation: "2x = 10, so x = 10/2 = 5"
    },
    {
      id: 19,
      question: "What is 0.5 as a fraction?",
      options: ["1/2", "1/3", "2/3", "1/4"],
      correctAnswer: "1/2",
      category: "Fractions",
      explanation: "0.5 = 5/10 = 1/2"
    },
    {
      id: 20,
      question: "How many seconds are in 2 minutes?",
      options: ["120", "100", "60", "240"],
      correctAnswer: "120",
      category: "Time",
      explanation: "2 minutes = 2 × 60 = 120 seconds"
    },
    {
      id: 21,
      question: "What is the perimeter of a rectangle with length 5 and width 3?",
      options: ["16", "15", "8", "12"],
      correctAnswer: "16",
      category: "Geometry",
      explanation: "Perimeter = 2(l+w) = 2(5+3) = 2×8 = 16"
    },
    {
      id: 22,
      question: "If profit is Rs. 20 on selling price Rs. 120, what is profit %?",
      options: ["16.67%", "20%", "15%", "25%"],
      correctAnswer: "16.67%",
      category: "Profit & Loss",
      explanation: "Profit% = (Profit/CP)×100. CP = 120-20 = 100. Profit% = (20/100)×100 = 20%. Wait, let me recalculate: If SP=120 and profit=20, then CP=100. Profit% = (20/120)×100 = 16.67%"
    },
    {
      id: 23,
      question: "What is the square root of 64?",
      options: ["8", "6", "10", "4"],
      correctAnswer: "8",
      category: "Square Roots",
      explanation: "√64 = 8 because 8² = 64"
    },
    {
      id: 24,
      question: "If a car covers 300 km in 5 hours, what distance in 2 hours?",
      options: ["120 km", "100 km", "150 km", "60 km"],
      correctAnswer: "120 km",
      category: "Speed & Distance",
      explanation: "Speed = 300/5 = 60 km/h. Distance in 2 hours = 60×2 = 120 km"
    },
    {
      id: 25,
      question: "What is 3/4 of 100?",
      options: ["75", "60", "80", "70"],
      correctAnswer: "75",
      category: "Fractions",
      explanation: "3/4 of 100 = (3/4) × 100 = 75"
    }
  ],
  
  hard: [
    // Copy all easy questions first
    ...this.easy || [],
    {
      id: 26,
      question: "A train crosses a platform 200m long in 30 seconds and a pole in 15 seconds. Find the length of the train.",
      options: ["200m", "150m", "250m", "300m"],
      correctAnswer: "200m",
      category: "Speed & Distance",
      explanation: "Let train length = L. Speed = L/15. Distance for platform = L+200. Time = 30. So (L+200)/(L/15) = 30. Solving: L = 200m"
    },
    {
      id: 27,
      question: "In what ratio must tea at Rs. 60/kg be mixed with tea at Rs. 65/kg to get mixture worth Rs. 63/kg?",
      options: ["2:3", "3:2", "1:2", "2:1"],
      correctAnswer: "2:3",
      category: "Mixture & Alligation",
      explanation: "Using alligation rule: Ratio = (65-63):(63-60) = 2:3"
    },
    {
      id: 28,
      question: "A sum doubles in 10 years at simple interest. In how many years will it triple?",
      options: ["20 years", "15 years", "25 years", "30 years"],
      correctAnswer: "20 years",
      category: "Simple Interest",
      explanation: "If sum doubles in 10 years, rate = 10% per annum. To triple (200% interest), time = 20 years"
    },
    {
      id: 29,
      question: "A, B, C can complete work in 6, 8, 12 days respectively. Working together, they complete in:",
      options: ["8/3 days", "3 days", "2.4 days", "4 days"],
      correctAnswer: "8/3 days",
      category: "Work & Time",
      explanation: "Work rates: 1/6 + 1/8 + 1/12 = (4+3+2)/24 = 9/24 = 3/8. Time = 8/3 days"
    },
    {
      id: 30,
      question: "If log₁₀ 2 = 0.301, then log₁₀ 8 = ?",
      options: ["0.903", "0.602", "0.451", "1.204"],
      correctAnswer: "0.903",
      category: "Logarithms",
      explanation: "log₁₀ 8 = log₁₀ 2³ = 3 log₁₀ 2 = 3 × 0.301 = 0.903"
    }
    // Continue adding more hard questions up to 50...
  ],
  
  advance: [
    // Copy all previous questions
    ...this.hard || [],
    {
      id: 51,
      question: "A circular park has area 154 sq m. Find the cost of fencing at Rs. 20 per meter.",
      options: ["Rs. 880", "Rs. 440", "Rs. 1320", "Rs. 660"],
      correctAnswer: "Rs. 880",
      category: "Geometry",
      explanation: "Area = πr² = 154, so r² = 154×7/22 = 49, r = 7m. Circumference = 2πr = 44m. Cost = 44×20 = Rs. 880"
    },
    {
      id: 52,
      question: "In how many ways can 5 people sit around a circular table?",
      options: ["24", "120", "60", "48"],
      correctAnswer: "24",
      category: "Permutation",
      explanation: "Circular permutation of n objects = (n-1)! = 4! = 24"
    }
    // Continue adding advance questions up to 75...
  ]
};

// Generate complete question sets
function generateQuestionSet(difficulty) {
  const counts = { easy: 25, hard: 50, advance: 75 };
  const questionPool = [];
  
  // Add base questions for each difficulty
  if (difficulty === 'easy') {
    questionPool.push(...APTITUDE_QUESTIONS.easy.slice(0, 25));
  } else if (difficulty === 'hard') {
    // Add all easy questions + additional hard questions
    questionPool.push(...APTITUDE_QUESTIONS.easy);
    // Add more hard-specific questions (25 more to make 50 total)
    for (let i = 26; i <= 50; i++) {
      questionPool.push({
        id: i,
        question: `Advanced aptitude question ${i - 25}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
        category: "Advanced Aptitude",
        explanation: "This is an advanced level question."
      });
    }
  } else if (difficulty === 'advance') {
    // Add all previous + advanced questions (75 total)
    questionPool.push(...APTITUDE_QUESTIONS.easy);
    // Add hard questions (26-50)
    for (let i = 26; i <= 50; i++) {
      questionPool.push({
        id: i,
        question: `Hard aptitude question ${i - 25}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
        category: "Hard Aptitude",
        explanation: "This is a hard level question."
      });
    }
    // Add advanced questions (51-75)
    for (let i = 51; i <= 75; i++) {
      questionPool.push({
        id: i,
        question: `Expert aptitude question ${i - 50}`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "Option A",
        category: "Expert Aptitude",
        explanation: "This is an expert level question."
      });
    }
  }
  
  return questionPool.slice(0, counts[difficulty]);
}

// Fallback questions in case the API is unavailable
const fallbackQuestions = {
  general: [
    {
      question: "What is the capital of France?",
      incorrect_answers: ["London", "Berlin", "Madrid"],
      correct_answer: "Paris",
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "What is 2 + 2?",
      incorrect_answers: ["3", "5", "6"],
      correct_answer: "4",
      category: "Mathematics",
      difficulty: "easy"
    },
    {
      question: "Which planet is known as the Red Planet?",
      incorrect_answers: ["Venus", "Jupiter", "Saturn"],
      correct_answer: "Mars",
      category: "Science",
      difficulty: "easy"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      incorrect_answers: ["Charles Dickens", "Mark Twain", "Jane Austen"],
      correct_answer: "William Shakespeare",
      category: "Literature",
      difficulty: "medium"
    },
    {
      question: "What is the largest ocean on Earth?",
      incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
      correct_answer: "Pacific Ocean",
      category: "Geography",
      difficulty: "easy"
    },
    {
      question: "What year did World War II end?",
      incorrect_answers: ["1944", "1946", "1947"],
      correct_answer: "1945",
      category: "History",
      difficulty: "medium"
    },
    {
      question: "What is the chemical symbol for gold?",
      incorrect_answers: ["Go", "Gd", "Gl"],
      correct_answer: "Au",
      category: "Science",
      difficulty: "medium"
    },
    {
      question: "Which programming language is known for its use in web development?",
      incorrect_answers: ["Python", "C++", "Java"],
      correct_answer: "JavaScript",
      category: "Technology",
      difficulty: "easy"
    },
    {
      question: "What is the square root of 64?",
      incorrect_answers: ["6", "9", "10"],
      correct_answer: "8",
      category: "Mathematics",
      difficulty: "easy"
    },
    {
      question: "Which country is famous for the Taj Mahal?",
      incorrect_answers: ["Pakistan", "Bangladesh", "Nepal"],
      correct_answer: "India",
      category: "Geography",
      difficulty: "easy"
    }
  ]
};

// Transform API response to our format
function transformQuestions(apiQuestions) {
  return apiQuestions.map((q, index) => {
    const options = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
    return {
      id: index + 1,
      question: he.decode(q.question),
      options: options.map(opt => he.decode(opt)),
      correctAnswer: he.decode(q.correct_answer),
      category: q.category,
      difficulty: q.difficulty
    };
  });
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Quiz API Server is running' });
});

// Get available categories
app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 'general', name: 'General Knowledge' },
    { id: 'science', name: 'Science & Nature' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'computer', name: 'Computer Science' },
    { id: 'history', name: 'History' },
    { id: 'geography', name: 'Geography' }
  ];
  res.json(categories);
});

// Start a new quiz
app.post('/api/quiz/start', async (req, res) => {
  try {
    const { category = 'general', difficulty = 'medium' } = req.body;
    
    let questions = [];
    
    try {
      // Get API endpoint for category
      let apiUrl = API_ENDPOINTS[category] || API_ENDPOINTS.general;
      
      // Add difficulty if specified
      if (difficulty !== 'any') {
        apiUrl += `&difficulty=${difficulty}`;
      }
      
      console.log('Fetching from:', apiUrl);
      
      // Fetch questions from API with timeout
      const response = await axios.get(apiUrl, { timeout: 5000 });
      
      if (response.data.response_code === 0 && response.data.results.length > 0) {
        questions = transformQuestions(response.data.results);
        console.log('Successfully fetched from API');
      } else {
        throw new Error('API returned no questions or error code');
      }
    } catch (apiError) {
      console.log('API failed, using fallback questions:', apiError.message);
      
      // Use fallback questions
      const fallbackData = fallbackQuestions.general.slice(0, 10);
      questions = transformQuestions(fallbackData);
    }
    
    // Generate session ID
    const sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    // Store quiz session
    quizSessions.set(sessionId, {
      questions,
      startTime: new Date(),
      category,
      difficulty,
      answers: [],
      currentQuestion: 0
    });
    
    res.json({
      sessionId,
      totalQuestions: questions.length,
      category,
      difficulty,
      firstQuestion: questions[0]
    });
    
  } catch (error) {
    console.error('Error starting quiz:', error);
    res.status(500).json({ error: 'Failed to start quiz' });
  }
});

// Get next question
app.get('/api/quiz/:sessionId/question/:questionNumber', (req, res) => {
  try {
    const { sessionId, questionNumber } = req.params;
    const session = quizSessions.get(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Quiz session not found' });
    }
    
    const qNum = parseInt(questionNumber) - 1;
    
    if (qNum >= session.questions.length) {
      return res.status(400).json({ error: 'Question not found' });
    }
    
    const question = session.questions[qNum];
    
    res.json({
      question: question.question,
      options: question.options,
      questionNumber: qNum + 1,
      totalQuestions: session.questions.length,
      category: question.category,
      difficulty: question.difficulty
    });
    
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

// Submit answer
app.post('/api/quiz/:sessionId/answer', (req, res) => {
  try {
    const { sessionId } = req.params;
    const { questionNumber, answer } = req.body;
    
    const session = quizSessions.get(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Quiz session not found' });
    }
    
    const qNum = parseInt(questionNumber) - 1;
    const question = session.questions[qNum];
    
    if (!question) {
      return res.status(400).json({ error: 'Question not found' });
    }
    
    const isCorrect = answer === question.correctAnswer;
    
    // Store answer
    session.answers[qNum] = {
      questionNumber: qNum + 1,
      userAnswer: answer,
      correctAnswer: question.correctAnswer,
      isCorrect
    };
    
    res.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: `The correct answer is: ${question.correctAnswer}`
    });
    
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

// Get quiz results
app.get('/api/quiz/:sessionId/results', (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = quizSessions.get(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Quiz session not found' });
    }
    
    const totalQuestions = session.questions.length;
    const correctAnswers = session.answers.filter(a => a && a.isCorrect).length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Calculate time taken
    const endTime = new Date();
    const timeTaken = Math.round((endTime - session.startTime) / 1000); // in seconds
    
    const results = {
      sessionId,
      totalQuestions,
      correctAnswers,
      incorrectAnswers: totalQuestions - correctAnswers,
      percentage,
      timeTaken,
      category: session.category,
      difficulty: session.difficulty,
      answers: session.answers.filter(a => a), // Remove empty slots
      grade: getGrade(percentage)
    };
    
    res.json(results);
    
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// Get leaderboard (top scores from current session)
app.get('/api/leaderboard', (req, res) => {
  try {
    const scores = [];
    
    for (const [sessionId, session] of quizSessions.entries()) {
      if (session.answers.length > 0) {
        const correctAnswers = session.answers.filter(a => a && a.isCorrect).length;
        const percentage = Math.round((correctAnswers / session.questions.length) * 100);
        const timeTaken = Math.round((new Date() - session.startTime) / 1000);
        
        scores.push({
          sessionId: sessionId.substr(0, 8) + '...', // Anonymize
          score: percentage,
          category: session.category,
          difficulty: session.difficulty,
          timeTaken,
          date: session.startTime
        });
      }
    }
    
    // Sort by score descending, then by time ascending
    scores.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeTaken - b.timeTaken;
    });
    
    res.json(scores.slice(0, 10)); // Top 10 scores
    
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Helper function to determine grade
function getGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
}

// Cleanup old sessions (run every hour)
setInterval(() => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  for (const [sessionId, session] of quizSessions.entries()) {
    if (session.startTime < oneHourAgo) {
      quizSessions.delete(sessionId);
    }
  }
}, 60 * 60 * 1000);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
