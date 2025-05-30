const mongoose = require('mongoose');

const stetingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  displayNamePubliclyAs: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
},
  { timestamps: true }
);

module.exports = mongoose.model('Steting', stetingSchema);