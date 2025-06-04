const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Setup multer for file uploads (in memory or disk)
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists or create it
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename with extension
  }
});

const upload = multer({ storage });

const Assignment = require('../models/Assignment'); // create this model (schema) below

// POST /api/assignment
router.post('/', upload.single('attachment'), async (req, res) => {
  try {
    const {
      title,
      description,
      timeLimitHours,
      totalPoints,
      minPassPoints,
      allowUploadFiles,
      maxFileSizeMB,
    } = req.body;

    const assignment = new Assignment({
      title,
      description,
      timeLimitHours,
      totalPoints,
      minPassPoints,
      allowUploadFiles,
      maxFileSizeMB,
      attachmentPath: req.file ? req.file.path : null,
    });

    await assignment.save();
    res.json({ success: true, assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/assignment
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.json({ success: true, assignments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

