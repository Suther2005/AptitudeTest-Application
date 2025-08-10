const Question = require('../models/Question');

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addQuestion = async (req, res) => {
  const newQuestion = new Question(req.body);
  try {
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getQuestions, addQuestion };