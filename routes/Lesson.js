const express = require('express');
const router = express.Router();

const Lesson = require('../Models/Lesson');

router.delete('/delete/:id', async (req, res) => {
  try {
    await Lesson.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});



// POST /api/lesson/add
router.post('/add', async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.json({ success: true, data: lesson });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/lesson/all
router.get('/all', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json({ success: true, data: lessons });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
