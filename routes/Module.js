const express = require('express');
const router = express.Router();
const Module = require('../Models/Module');

// Create a new module
router.post('/module', async (req, res) => {
  console.log("Creating a new module", req.body);
  
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const newModule = await Module.create({ title });
    return res.status(200).json({ success: true, module: newModule });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error saving module", error });
  }
});

module.exports = router;
