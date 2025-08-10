import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Ensure this is installed

const InstructionsPage = () => {
  const { difficulty } = useParams();
  const navigate = useNavigate();

  // If difficulty is undefined or incorrect, redirect to home
  if (!["easy", "hard", "advance"].includes(difficulty)) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📝 Instructions for {difficulty.toUpperCase()} Mode
      </motion.h1>

      {/* Instructions List */}
      <motion.ul
        className="text-lg space-y-4 bg-white text-gray-800 p-6 rounded-xl shadow-lg max-w-lg w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <li className="flex items-center">
          <span className="text-blue-500 text-xl mr-3">⏳</span>
          You have <strong>1 minute</strong> per question.
        </li>
        <li className="flex items-center">
          <span className="text-green-500 text-xl mr-3">✅</span>
          Each correct answer earns you <strong> points</strong>.
        </li>
        <li className="flex items-center">
          <span className="text-red-500 text-xl mr-3">❌</span>
          No negative marking for wrong answers.
        </li>
        <li className="flex items-center">
          <span className="text-yellow-500 text-xl mr-3">💡</span>
          Stay focused and manage your time wisely!
        </li>
      </motion.ul>

      {/* Start Test Button */}
      <motion.button
        className="mt-6 px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
        onClick={() => navigate(`/test/${difficulty}`)}
        whileHover={{ scale: 1.1 }}
      >
        🚀 Start Test
      </motion.button>
    </div>
  );
};

export default InstructionsPage;
