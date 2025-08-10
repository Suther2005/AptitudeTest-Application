import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Quiz API functions
export const quizAPI = {
  // Get available categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Start a new quiz - only difficulty parameter needed
  startQuiz: async (difficulty = 'easy') => {
    const response = await api.post('/quiz/start', {
      difficulty
    });
    return response.data;
  },

  // Get a specific question
  getQuestion: async (sessionId, questionNumber) => {
    const response = await api.get(`/quiz/${sessionId}/question/${questionNumber}`);
    return response.data;
  },

  // Submit an answer
  submitAnswer: async (sessionId, questionNumber, answer) => {
    const response = await api.post(`/quiz/${sessionId}/answer`, {
      questionNumber,
      answer
    });
    return response.data;
  },

  // Get quiz results
  getResults: async (sessionId) => {
    const response = await api.get(`/quiz/${sessionId}/results`);
    return response.data;
  },

  // Get leaderboard
  getLeaderboard: async () => {
    const response = await api.get('/leaderboard');
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;
