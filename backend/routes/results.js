const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

// Submit result
router.post("/", async (req, res) => {
  try {
    const { user, score, totalQuestions } = req.body;
    const newResult = new Result({ user, score, totalQuestions });
    await newResult.save();
    res.json({ message: "Result saved!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
