const express = require('express');
const router = express.Router();
const Module = require('../Models/Module');
const Lesson = require('../Models/Lesson');

// Create a new module
router.post('/module', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const newModule = await Module.create({ title });
    return res.status(201).json({ success: true, module: newModule });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating module", error: error.message });
  }
});

// Get all modules with their lessons
router.get('/modules', async (req, res) => {
  try {
    const modules = await Module.find().populate('lessons');
    return res.status(200).json({ success: true, modules });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching modules", error: error.message });
  }
});

// Delete a module
router.delete('/module/:id', async (req, res) => {
  try {
    const moduleId = req.params.id;
    await Lesson.deleteMany({ module: moduleId });
    await Module.findByIdAndDelete(moduleId);
    return res.status(200).json({ success: true, message: "Module deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting module", error: error.message });
  }
});

// Create a new lesson
router.post('/lesson', async (req, res) => {
  try {
    const { lessonTitle, lessonContent, lessonImage, lessonVideoSource, lessonHour, lessonMinute, lessonSecond, moduleId } = req.body;
    
    if (!lessonTitle || !lessonContent || !moduleId) {
      return res.status(400).json({ success: false, message: "Lesson title, content, and module ID are required" });
    }

    const lesson = await Lesson.create({
      lessonTitle,
      lessonContent,
      lessonImage,
      lessonVideoSource,
      lessonHour: lessonHour || 0,
      lessonMinute: lessonMinute || 0,
      lessonSecond: lessonSecond || 0,
      module: moduleId
    });

    await Module.findByIdAndUpdate(moduleId, {
      $push: { lessons: lesson._id }
    });

    return res.status(201).json({ success: true, lesson });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating lesson", error: error.message });
  }
});

// Delete a lesson
router.delete('/lesson/:id', async (req, res) => {
  try {
    const lessonId = req.params.id;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    await Module.findByIdAndUpdate(lesson.module, {
      $pull: { lessons: lessonId }
    });

    await Lesson.findByIdAndDelete(lessonId);
    return res.status(200).json({ success: true, message: "Lesson deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting lesson", error: error.message });
  }
});

module.exports = router;