const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  user: String,
  score: Number,
  totalQuestions: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", ResultSchema);
