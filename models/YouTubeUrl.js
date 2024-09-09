const mongoose = require('mongoose');

const YouTubeUrlSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('YouTubeUrl', YouTubeUrlSchema);
