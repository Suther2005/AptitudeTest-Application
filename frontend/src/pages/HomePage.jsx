import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // Difficulty levels
  const levels = [
    { name: "easy", label: "Easy Mode" },
    { name: "hard", label: "Hard Mode" },
    { name: "advance", label: "Advance Mode" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white p-6">
      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-4">🚀 Best Aptitude Test Application</h1>
      <p className="text-lg text-gray-200 max-w-2xl text-center">
        Sharpen your skills based aptitude test. Choose a difficulty level and challenge yourself!
      </p>

      {/* Difficulty Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-11/12 max-w-3xl mt-8">
        {levels.map((level, index) => (
          <button
            key={index}
            onClick={() => navigate(`/instructions/${level.name}`)}
            className="p-6 w-full rounded-lg shadow-lg text-xl font-semibold bg-white text-blue-600 
                       flex flex-col items-center gap-3 transition-all duration-300 transform 
                       hover:scale-105 hover:bg-blue-100 hover:shadow-2xl"
          >
            {level.label}
          </button>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center text-gray-300">
        <p className="text-xl font-semibold">📌 Features:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Aptitude question generation</li>
          <li>Timed tests for accuracy improvement</li>
          <li>Instant results and performance tracking</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
