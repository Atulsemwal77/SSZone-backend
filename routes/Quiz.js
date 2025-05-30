const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz'); // create this model

// POST: Add new quiz
router.post('/', async (req, res) => {
  try {
    const { question, type, answer, charLimit, feedbackMode, maxAttempts } = req.body;

    const newQuiz = new Quiz({
      question,
      type,
      answer,
      charLimit,
      feedbackMode,
      maxAttempts
    });

    await newQuiz.save();
    res.status(201).json({ success: true, message: 'Quiz added', data: newQuiz });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add quiz', error: error.message });
  }
});

// GET: Fetch all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: quizzes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch quizzes', error: error.message });
  }
});

// DELETE: Delete a quiz by ID
router.delete('/:id', async (req, res) => {
  try {
    const quizId = req.params.id;

    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    res.status(200).json({ success: true, message: 'Quiz deleted successfully', data: deletedQuiz });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete quiz', error: error.message });
  }
});


module.exports = router;
