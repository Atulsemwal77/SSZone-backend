const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  lessonTitle: { type: String, required: true },
  lessonContent: { type: String, required: true },
  lessonImage: { type: String }, // image URL after uploading to cloud or file system
  lessonVideoSource: { type: String },
  lessonHour: { type: Number },
  lessonMinute: { type: Number },
  lessonSecond: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Lesson", lessonSchema);
