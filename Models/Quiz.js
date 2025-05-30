const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: String,
  type: String,
  answer: String,
  charLimit: Number,
  feedbackMode: String,
  maxAttempts: Number,
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
