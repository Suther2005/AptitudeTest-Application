import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    score = 0, 
    total = 0, 
    percentage = 0, 
    grade = 'N/A', 
    timeTaken = 0, 
    sessionId = null,
    fallback = false 
  } = location.state || {};

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': case 'A': return 'text-green-600';
      case 'B': return 'text-blue-600';
      case 'C': return 'text-yellow-600';
      case 'D': return 'text-orange-600';
      case 'F': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
          <p className="text-gray-600">Congratulations on finishing the test</p>
        </div>

        <div className="space-y-4 mb-8">
          {/* Score */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-1">Your Score</h2>
            <div className="text-3xl font-bold text-blue-600">
              {score} / {total}
            </div>
          </div>

          {/* Percentage */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Percentage</h3>
            <div className="text-2xl font-bold text-green-600">
              {percentage}%
            </div>
          </div>

          {/* Grade */}
          {grade !== 'N/A' && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Grade</h3>
              <div className={`text-2xl font-bold ${getGradeColor(grade)}`}>
                {grade}
              </div>
            </div>
          )}

          {/* Time Taken */}
          {timeTaken > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-1">Time Taken</h3>
              <div className="text-xl font-semibold text-purple-600">
                {formatTime(timeTaken)}
              </div>
            </div>
          )}

          {/* Session Info */}
          {sessionId && (
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-600">
                Session: {sessionId.substring(0, 8)}...
              </p>
            </div>
          )}

          {/* Fallback Notice */}
          {fallback && (
            <div className="bg-yellow-50 rounded-lg p-3">
              <p className="text-sm text-yellow-600">
                ⚠️ Offline scoring used
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => navigate("/")}
            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            🏠 Back to Home
          </button>
          
          <button 
            onClick={() => navigate("/scoreboard")}
            className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            🏆 View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
