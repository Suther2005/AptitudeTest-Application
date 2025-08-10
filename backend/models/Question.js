import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  difficulty: { type: String, enum: ["easy", "hard", "advance"], required: true }
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
