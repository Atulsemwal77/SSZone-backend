const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  lessonTitle: {
    type: String,
    required: true,
    trim: true
  },
  lessonContent: {
    type: String,
    required: true
  },
  lessonImage: {
    type: String
  },
  lessonVideoSource: {
    type: String
  },
  lessonHour: {
    type: Number,
    default: 0
  },
  lessonMinute: {
    type: Number,
    default: 0
  },
  lessonSecond: {
    type: Number,
    default: 0
  },
  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);