import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizAPI } from "../services/api";

const TestPage = () => {
  const { difficulty } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (!difficulty) {
      setError("Invalid difficulty level");
      setLoading(false);
      return;
    }

    const startQuiz = async () => {
      try {
        // Use the difficulty parameter directly (easy, hard, advance)
        console.log('Starting quiz with difficulty:', difficulty);
        const quizData = await quizAPI.startQuiz(difficulty);
        console.log('Quiz started:', quizData);
        
        setSessionId(quizData.sessionId);
        
        // Load all questions
        const allQuestions = [];
        for(let i = 1; i <= quizData.totalQuestions; i++) {
          try {
            const questionData = await quizAPI.getQuestion(quizData.sessionId, i);
            allQuestions.push({
              id: i,
              question: questionData.question,
              options: questionData.options,
              category: questionData.category,
              difficulty: questionData.difficulty
              // Note: correctAnswer is not needed on frontend - backend handles scoring
            });
          } catch (err) {
            console.error(`Error loading question ${i}:`, err);
          }
        }
        
        console.log('All questions loaded:', allQuestions);
        setQuestions(allQuestions);
      } catch (err) {
        console.error('Quiz start error:', err);
        setError(err.response?.data?.error || err.message || "Error starting quiz");
      } finally {
        setLoading(false);
      }
    };

    startQuiz();
  }, [difficulty]);

  // Timer resets on question change
  useEffect(() => {
    setTimeLeft(60);
  }, [currentQuestionIndex]);

  useEffect(() => {
    const handleNextQuestion = () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setTimeLeft(0);
      }
    };

    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, currentQuestionIndex, questions.length]);

  // Move to next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Move to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Handle answer selection
  const handleSelectAnswer = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Submit quiz
  const submitQuiz = async () => {
    try {
      if (sessionId) {
        // First submit all answers to backend
        console.log('Submitting answers:', selectedAnswers);
        
        for (let i = 0; i < questions.length; i++) {
          const question = questions[i];
          const userAnswer = selectedAnswers[question.id];
          
          if (userAnswer) {
            try {
              await quizAPI.submitAnswer(sessionId, question.id, userAnswer);
              console.log(`Submitted answer for question ${question.id}:`, userAnswer);
            } catch (error) {
              console.error(`Error submitting answer for question ${question.id}:`, error);
            }
          }
        }
        
        // Then get results from backend
        const results = await quizAPI.getResults(sessionId);
        console.log('Quiz results:', results);
        
        navigate("/results", { 
          state: { 
            score: results.correctAnswers, 
            total: results.totalQuestions,
            percentage: results.percentage,
            grade: results.grade,
            timeTaken: results.timeTaken,
            sessionId: sessionId
          } 
        });
      } else {
        // Fallback: basic scoring (without correct answers from backend)
        const answeredQuestions = Object.keys(selectedAnswers).length;
        navigate("/results", { 
          state: { 
            score: Math.floor(answeredQuestions * 0.7), // Assume 70% correct as fallback
            total: questions.length,
            percentage: Math.floor((answeredQuestions * 0.7 / questions.length) * 100),
            fallback: true
          } 
        });
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Fallback to basic scoring
      const answeredQuestions = Object.keys(selectedAnswers).length;
      navigate("/results", { 
        state: { 
          score: Math.floor(answeredQuestions * 0.7), // Assume 70% correct as fallback
          total: questions.length,
          percentage: Math.floor((answeredQuestions * 0.7 / questions.length) * 100),
          fallback: true
        } 
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <h1 className="text-2xl font-bold mt-4">Loading Questions...</h1>
          <p className="text-gray-600">Please wait while we prepare your quiz</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">No Questions Available</h1>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {difficulty?.toUpperCase()} Level Quiz
            </h1>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-500">
                Time: {timeLeft}s
              </div>
              <div className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {currentQuestion.question}
            </h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${
                    selectedAnswers[currentQuestion.id] === option 
                      ? "border-blue-500 bg-blue-50 text-blue-700" 
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => handleSelectAnswer(currentQuestion.id, option)}
                >
                  <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>

            <div className="flex space-x-4">
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={submitQuiz}
                  className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
