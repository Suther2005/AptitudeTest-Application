import express from "express";
import Question from "../models/Question.js"; // ✅ Import Question model

const router = express.Router();

// ✅ Fetch questions by difficulty
router.get("/:difficulty", async (req, res) => {
  try {
    const { difficulty } = req.params;
    let limit = 30; // Default to easy

    if (difficulty === "hard") limit = 50;
    if (difficulty === "advance") limit = 100;

    const questions = await Question.find({ difficulty }).limit(limit);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
});

export default router;
