import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InstructionsPage from "./pages/InstructionsPage";
import TestPage from "./pages/TestPage";
import ResultsPage from "./pages/ResultsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/instructions/:difficulty" element={<InstructionsPage />} />  {/* ✅ Route Fixed */}
        <Route path="/test/:difficulty" element={<TestPage />} />  {/* ✅ Route Fixed */}
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
