import { useState, useEffect } from "react";
import { quizAPI } from "../services/api";

const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const data = await quizAPI.getLeaderboard();
        setScores(data);
      } catch (err) {
        console.error("Error fetching scores:", err);
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto"></div>
          <h1 className="text-2xl font-bold mt-4">Loading Scoreboard...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">🏆 Leaderboard</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {scores.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-400">No scores yet.</p>
            <p className="text-gray-500 mt-2">Be the first to take a quiz!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-4 pb-4 border-b border-gray-600 font-bold">
              <div>Rank</div>
              <div>Score</div>
              <div>Category</div>
              <div>Difficulty</div>
              <div>Time</div>
              <div>Date</div>
            </div>
            {scores.map((score, index) => (
              <div key={index} className={`grid grid-cols-6 gap-4 p-3 rounded-lg ${
                index === 0 ? 'bg-yellow-800' : 
                index === 1 ? 'bg-gray-700' : 
                index === 2 ? 'bg-orange-800' : 'bg-gray-800'
              }`}>
                <div className="flex items-center">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && `#${index + 1}`}
                </div>
                <div className="font-bold text-green-400">{score.score}%</div>
                <div className="capitalize">{score.category}</div>
                <div className="capitalize">{score.difficulty}</div>
                <div>{Math.floor(score.timeTaken / 60)}:{(score.timeTaken % 60).toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-400">
                  {new Date(score.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Take Another Quiz
        </button>
      </div>
    </div>
  );
};

export default Scoreboard;
