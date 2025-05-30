const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true,
  },
  courseSlug: {
    type: String,
    required: true,
    unique: true,        // Ensure slug uniqueness
  },
  aboutCourse: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  courseCategories: {
    type: [String],   // Array of categories
    required: true,
  },
  courseThumbnail: {   // Fixed typo
    type: String,
    required: true,
  }
}, {
  timestamps: true,  // Add createdAt and updatedAt automatically
});

module.exports = mongoose.model('Course', courseSchema);
