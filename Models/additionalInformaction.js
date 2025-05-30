const mongoose = require('mongoose');

const additionalInformactionSchema = mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  hour: {
    type: String,
    required: true
  },
  minute: {
    type: String,
    required: true
  },
  courseTag: {
    type: String,
    required: true
  },

})

module.exports = mongoose.model('AdditionalInformaction', additionalInformactionSchema);
