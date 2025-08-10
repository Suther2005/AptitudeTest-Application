import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  difficulty: String,
  score: Number,
  total: Number,
});

export default mongoose.model("Score", ScoreSchema);
