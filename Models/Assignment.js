const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  timeLimitHours: { type: Number, default: 0 },
  totalPoints: { type: Number, default: 0 },
  minPassPoints: { type: Number, default: 0 },
  allowUploadFiles: { type: Number, default: 0 },
  maxFileSizeMB: { type: Number, default: 0 },
  attachmentPath: { type: String }, // file path if uploaded
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
