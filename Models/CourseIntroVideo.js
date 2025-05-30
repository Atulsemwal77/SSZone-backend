const mongoose = require('mongoose');

const courseIntroVideo = mongoose.Schema({ 
  videoUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('CourseIntroVideo', courseIntroVideo);
