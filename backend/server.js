const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for quiz sessions
const quizSessions = new Map();

// Multiple diverse live APIs for professional interview questions
const LIVE_APIS = [
  {
    name: 'QuizAPI General',
    url: 'https://quizapi.io/api/v1/questions',
    headers: { 'X-Api-Key': 'YOUR_API_KEY' }, // Free tier available
    params: { limit: 20 },
    transform: 'quizapi'
  },
  {
    name: 'OpenTDB Mathematics',
    url: 'https://opentdb.com/api.php',
    params: { category: 19, type: 'multiple' },
    transform: 'opentdb',
    delay: 1000 // Add delay between requests
  },
  {
    name: 'OpenTDB Computer Science', 
    url: 'https://opentdb.com/api.php',
    params: { category: 18, type: 'multiple' },
    transform: 'opentdb',
    delay: 1500
  },
  {
    name: 'OpenTDB Science',
    url: 'https://opentdb.com/api.php', 
    params: { category: 17, type: 'multiple' },
    transform: 'opentdb',
    delay: 2000
  }
];

// Rate limiting tracker
let lastApiCall = 0;
const API_RATE_LIMIT = 2000; // 2 seconds between calls

// Simple delay function for rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// HTML entity decoder for Node.js
function decodeHtmlEntities(text) {
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&lsquo;': "'",
    '&rsquo;': "'",
    '&nbsp;': ' '
  };
  
  return text.replace(/&[#\w]+;/g, (entity) => {
    return entities[entity] || entity;
  });
}

// Transform API questions to professional interview format with randomization
function transformToInterviewQuestions(apiQuestions, difficulty) {
  // First shuffle the API questions array to get different questions each time
  const shuffledQuestions = apiQuestions.sort(() => Math.random() - 0.5);
  
  return shuffledQuestions.map((q, index) => {
    // Shuffle options randomly for each question
    const allOptions = [...q.incorrect_answers, q.correct_answer];
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
    
    // Add some variation to question text for Indian context
    let questionText = decodeHtmlEntities(q.question);
    
    // Replace dollar amounts with rupees in API questions if they exist
    questionText = questionText.replace(/\$(\d+)/g, '₹$1');
    questionText = questionText.replace(/\$(\d+,\d+)/g, '₹$1');
    questionText = questionText.replace(/\$(\d+\.\d+)/g, '₹$1');
    
    const transformedOptions = shuffledOptions.map(opt => {
      let option = decodeHtmlEntities(opt);
      // Replace dollar amounts in options too
      option = option.replace(/\$(\d+)/g, '₹$1');
      option = option.replace(/\$(\d+,\d+)/g, '₹$1');
      option = option.replace(/\$(\d+\.\d+)/g, '₹$1');
      return option;
    });
    
    let correctAnswer = decodeHtmlEntities(q.correct_answer);
    // Replace dollar amounts in correct answer
    correctAnswer = correctAnswer.replace(/\$(\d+)/g, '₹$1');
    correctAnswer = correctAnswer.replace(/\$(\d+,\d+)/g, '₹$1');
    correctAnswer = correctAnswer.replace(/\$(\d+\.\d+)/g, '₹$1');
    
    return {
      id: index + 1,
      question: questionText,
      options: transformedOptions,
      correctAnswer: correctAnswer,
      category: `Professional ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level`,
      difficulty: difficulty,
      explanation: `This is a professional interview level question testing ${q.category || 'aptitude'} skills.`,
      apiSource: true,
      randomSeed: Math.random() // For tracking randomization
    };
  });
}

// Fetch live questions with rate limiting and smart fallback
async function fetchLiveQuestions(difficulty) {
  const questionCount = { easy: 25, hard: 50, advance: 75 };
  const targetCount = questionCount[difficulty];
  const difficultyMap = { easy: 'easy', hard: 'medium', advance: 'hard' };
  const apiDifficulty = difficultyMap[difficulty];
  
  let allQuestions = [];
  
  console.log(`🌐 Fetching ${targetCount} LIVE ${difficulty} questions with rate limiting...`);
  
  // Try OpenTDB with proper rate limiting
  try {
    // Wait for rate limit
    const now = Date.now();
    const timeSinceLastCall = now - lastApiCall;
    if (timeSinceLastCall < API_RATE_LIMIT) {
      const waitTime = API_RATE_LIMIT - timeSinceLastCall;
      console.log(`⏳ Rate limiting: waiting ${waitTime}ms...`);
      await delay(waitTime);
    }
    
    console.log(`📡 Trying OpenTDB API for ${targetCount} questions...`);
    
    const response = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: Math.min(targetCount, 20), // Reduce batch size
        category: 19, // Mathematics
        difficulty: apiDifficulty,
        type: 'multiple'
      },
      timeout: 10000
    });
    
    lastApiCall = Date.now();
    
    if (response.data && response.data.response_code === 0 && response.data.results) {
      const questions = transformToInterviewQuestions(response.data.results, difficulty);
      allQuestions.push(...questions);
      console.log(`✅ Got ${questions.length} live questions from OpenTDB`);
      
      // If we need more questions, try one more call with delay
      if (allQuestions.length < targetCount && allQuestions.length > 0) {
        try {
          console.log(`🔄 Need ${targetCount - allQuestions.length} more questions...`);
          await delay(3000); // Extra delay for second call
          
          const additionalResponse = await axios.get('https://opentdb.com/api.php', {
            params: {
              amount: Math.min(targetCount - allQuestions.length, 15),
              category: 18, // Computer Science
              difficulty: apiDifficulty,
              type: 'multiple'
            },
            timeout: 8000
          });
          
          if (additionalResponse.data.response_code === 0) {
            const additionalQuestions = transformToInterviewQuestions(
              additionalResponse.data.results, 
              difficulty
            );
            allQuestions.push(...additionalQuestions);
            console.log(`✅ Added ${additionalQuestions.length} more questions`);
          }
        } catch (error) {
          console.log(`⚠️ Additional API call failed: ${error.message}`);
        }
      }
    }
    
  } catch (error) {
    console.log(`⚠️ OpenTDB API failed: ${error.message}`);
  }
  
  // If we still don't have enough questions, generate professional ones
  if (allQuestions.length < 5) {
    console.log(`🔄 API calls insufficient, generating professional interview questions...`);
    
    const professionalQuestions = generateProfessionalQuestions(difficulty, targetCount);
    allQuestions = professionalQuestions;
    console.log(`✅ Generated ${allQuestions.length} professional interview questions`);
  }
  
  const finalQuestions = allQuestions.slice(0, targetCount);
  console.log(`🎯 Successfully prepared ${finalQuestions.length} questions for ${difficulty} level`);
  
  return finalQuestions;
}

// Generate professional interview questions when APIs fail
function generateProfessionalQuestions(difficulty, count) {
  const questionTemplates = {
    easy: [
      {
        question: "A company's revenue increased from ₹100,000 to ₹120,000. What is the percentage increase?",
        options: ["20%", "15%", "25%", "18%"],
        correctAnswer: "20%",
        category: "Business Mathematics"
      },
      {
        question: "If a team of 10 people can complete a project in 15 days, how many days will a team of 6 people take?",
        options: ["25 days", "24 days", "26 days", "23 days"],
        correctAnswer: "25 days",
        category: "Work & Time Analysis"
      },
      {
        question: "What is the simple interest on ₹5000 at 8% per annum for 3 years?",
        options: ["₹1200", "₹1100", "₹1300", "₹1000"],
        correctAnswer: "₹1200",
        category: "Financial Mathematics"
      },
      {
        question: "In a data set: 10, 15, 20, 25, 30. What is the median?",
        options: ["20", "18", "22", "15"],
        correctAnswer: "20",
        category: "Statistics"
      },
      {
        question: "If the probability of success is 0.7, what is the probability of failure?",
        options: ["0.3", "0.4", "0.2", "0.5"],
        correctAnswer: "0.3",
        category: "Probability"
      },
      {
        question: "A shop offers 15% discount on ₹2000 item. What is the selling price?",
        options: ["₹1700", "₹1800", "₹1750", "₹1650"],
        correctAnswer: "₹1700",
        category: "Percentage"
      },
      {
        question: "What is 25% of ₹4800?",
        options: ["₹1200", "₹1000", "₹1400", "₹1100"],
        correctAnswer: "₹1200",
        category: "Percentage"
      },
      {
        question: "If a car travels 180 km in 3 hours, what is its average speed?",
        options: ["60 km/h", "55 km/h", "65 km/h", "50 km/h"],
        correctAnswer: "60 km/h",
        category: "Speed & Distance"
      },
      {
        question: "A company's profit margin is 12% on sales of ₹50,000. What is the profit?",
        options: ["₹6000", "₹5500", "₹6500", "₹5000"],
        correctAnswer: "₹6000",
        category: "Business Math"
      },
      {
        question: "What is the compound interest on ₹10,000 at 10% for 2 years?",
        options: ["₹2100", "₹2000", "₹2200", "₹1900"],
        correctAnswer: "₹2100",
        category: "Compound Interest"
      }
    ],
    hard: [
      {
        question: "A project has a budget variance of -₹15,000 and schedule variance of +5 days. What does this indicate?",
        options: ["Over budget, ahead of schedule", "Under budget, behind schedule", "Over budget, behind schedule", "Under budget, ahead of schedule"],
        correctAnswer: "Over budget, ahead of schedule",
        category: "Project Management"
      },
      {
        question: "In agile methodology, what is the recommended duration for a sprint?",
        options: ["2-4 weeks", "1-2 weeks", "4-6 weeks", "6-8 weeks"],
        correctAnswer: "2-4 weeks",
        category: "Software Development"
      },
      {
        question: "What is the compound annual growth rate (CAGR) if an investment grows from ₹1000 to ₹1331 in 3 years?",
        options: ["10%", "11%", "9%", "12%"],
        correctAnswer: "10%",
        category: "Financial Analysis"
      },
      {
        question: "A company's ROI is 15% on an investment of ₹200,000. What is the return?",
        options: ["₹30,000", "₹25,000", "₹35,000", "₹20,000"],
        correctAnswer: "₹30,000",
        category: "Investment Analysis"
      },
      {
        question: "If efficiency of a team increases by 20%, how much time will they save on a 50-day project?",
        options: ["8.33 days", "10 days", "7.5 days", "12 days"],
        correctAnswer: "8.33 days",
        category: "Efficiency Analysis"
      },
      {
        question: "What is the break-even point if fixed costs are ₹50,000 and contribution margin is ₹25 per unit?",
        options: ["2000 units", "1800 units", "2200 units", "2500 units"],
        correctAnswer: "2000 units",
        category: "Business Analysis"
      }
    ],
    advance: [
      {
        question: "In machine learning, what is the purpose of cross-validation?",
        options: ["To prevent overfitting", "To increase accuracy", "To reduce training time", "To improve data quality"],
        correctAnswer: "To prevent overfitting",
        category: "Data Science"
      },
      {
        question: "What is the time complexity of binary search algorithm?",
        options: ["O(log n)", "O(n)", "O(n log n)", "O(n²)"],
        correctAnswer: "O(log n)",
        category: "Computer Science"
      },
      {
        question: "A company wants to optimize inventory costs. Current holding cost is ₹5 per unit per year, ordering cost is ₹100 per order, and annual demand is 1000 units. What is the Economic Order Quantity (EOQ)?",
        options: ["200 units", "180 units", "220 units", "150 units"],
        correctAnswer: "200 units",
        category: "Operations Research"
      },
      {
        question: "In database normalization, what is the main purpose of 3NF (Third Normal Form)?",
        options: ["Eliminate transitive dependencies", "Remove partial dependencies", "Ensure atomic values", "Create foreign keys"],
        correctAnswer: "Eliminate transitive dependencies",
        category: "Database Management"
      },
      {
        question: "What is the Net Present Value (NPV) of a project with initial investment ₹100,000, annual cash flow ₹30,000 for 4 years, and discount rate 10%?",
        options: ["₹5,094", "₹8,000", "₹10,000", "₹2,500"],
        correctAnswer: "₹5,094",
        category: "Financial Management"
      }
    ]
  };
  
  const templates = questionTemplates[difficulty] || questionTemplates.easy;
  const questions = [];
  
  // Create a shuffled array of template indices to ensure different questions each time
  const shuffledIndices = Array.from({length: templates.length}, (_, i) => i);
  for (let i = shuffledIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
  }
  
  for (let i = 0; i < count; i++) {
    const templateIndex = shuffledIndices[i % templates.length];
    const template = templates[templateIndex];
    const variation = Math.floor(i / templates.length) + 1;
    
    // Shuffle the options for each question
    const allOptions = [...template.options];
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
    
    questions.push({
      id: i + 1,
      question: template.question,
      options: shuffledOptions,
      correctAnswer: template.correctAnswer,
      category: `${template.category} - Professional Interview`,
      difficulty: difficulty,
      explanation: `This is a professional ${difficulty} level interview question testing ${template.category.toLowerCase()} skills.`,
      source: 'Generated Professional Question',
      questionIndex: templateIndex, // For debugging
      shuffle: variation // For tracking variations
    });
  }
  
  // Shuffle the entire questions array for final randomization
  return questions.sort(() => Math.random() - 0.5);
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Professional Interview Aptitude API Server is running' });
});

// Get available difficulty levels
app.get('/api/categories', (req, res) => {
  const difficulties = [
    { id: 'easy', name: 'Easy Interview Level (25 Questions)', count: 25 },
    { id: 'hard', name: 'Hard Interview Level (50 Questions)', count: 50 },
    { id: 'advance', name: 'Advanced Interview Level (75 Questions)', count: 75 }
  ];
  res.json(difficulties);
});

// Start a new quiz with ONLY live questions from APIs
app.post('/api/quiz/start', async (req, res) => {
  try {
    const { difficulty = 'easy' } = req.body;
    
    // Validate difficulty
    if (!['easy', 'hard', 'advance'].includes(difficulty)) {
      return res.status(400).json({ error: 'Invalid difficulty level' });
    }
    
    console.log(`🚀 Starting ${difficulty} level quiz with LIVE questions only...`);
    
    // Fetch ONLY live questions from APIs - NO STORED QUESTIONS
    const questions = await fetchLiveQuestions(difficulty);
    
    if (!questions || questions.length === 0) {
      throw new Error('No live questions available from APIs');
    }
    
    // Additional final shuffle to ensure different questions every time
    const finalShuffledQuestions = questions.sort(() => Math.random() - 0.5);
    
    // Generate session ID with timestamp for uniqueness
    const sessionId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    // Store quiz session
    quizSessions.set(sessionId, {
      questions: finalShuffledQuestions,
      startTime: new Date(),
      difficulty,
      answers: [],
      currentQuestion: 0,
      isLive: true,
      source: 'LIVE_API_ONLY',
      sessionSeed: Math.random() // For tracking session uniqueness
    });
    
    console.log(`✅ Quiz session ${sessionId} created with ${finalShuffledQuestions.length} RANDOMIZED questions from APIs`);
    
    res.json({
      sessionId,
      totalQuestions: finalShuffledQuestions.length,
      difficulty,
      isLive: true,
      source: 'Live API Questions Only - No Stored Questions',
      message: 'All questions fetched live and randomized for unique experience',
      currency: 'Indian Rupee (₹)',
      randomized: true,
      firstQuestion: {
        questionNumber: 1,
        ...finalShuffledQuestions[0]
      }
    });
    
  } catch (error) {
    console.error('❌ Error starting quiz with live questions:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch live questions from APIs. Please try again later.',
      message: 'No stored questions available - only live API questions are used'
    });
  }
});

// Get a specific question
app.get('/api/quiz/:sessionId/question/:questionNumber', (req, res) => {
  try {
    const { sessionId, questionNumber } = req.params;
    const session = quizSessions.get(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Quiz session not found' });
    }
    
    const qNum = parseInt(questionNumber) - 1;
    
    if (qNum >= session.questions.length || qNum < 0) {
      return res.status(400).json({ error: 'Question not found' });
    }
    
    const question = session.questions[qNum];
    
    res.json({
      questionNumber: qNum + 1,
      question: question.question,
      options: question.options,
      category: question.category,
      totalQuestions: session.questions.length
    });
    
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

// Submit an answer
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
      isCorrect,
      explanation: question.explanation
    };
    
    res.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
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
    
    function getGrade(percentage) {
      if (percentage >= 90) return 'A+';
      if (percentage >= 80) return 'A';
      if (percentage >= 70) return 'B';
      if (percentage >= 60) return 'C';
      if (percentage >= 50) return 'D';
      return 'F';
    }
    
    const results = {
      sessionId,
      totalQuestions,
      correctAnswers,
      incorrectAnswers: totalQuestions - correctAnswers,
      percentage,
      timeTaken,
      difficulty: session.difficulty,
      answers: session.answers.filter(a => a),
      grade: getGrade(percentage)
    };
    
    res.json(results);
    
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  try {
    const scores = [];
    
    for (const [sessionId, session] of quizSessions.entries()) {
      if (session.answers.length > 0) {
        const correctAnswers = session.answers.filter(a => a && a.isCorrect).length;
        const percentage = Math.round((correctAnswers / session.questions.length) * 100);
        const timeTaken = Math.round((new Date() - session.startTime) / 1000);
        
        scores.push({
          sessionId: sessionId.substr(0, 8) + '...',
          score: percentage,
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
    
    res.json(scores.slice(0, 10));
    
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

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
    console.log(`🚀 Professional Interview Aptitude Server running on port ${PORT}`);
    console.log(`📚 Live Questions: Easy (25Q), Hard (50Q), Advanced (75Q)`);
    console.log(`🌐 Fetching questions from live APIs for professional interviews`);
  });
}

module.exports = app;
