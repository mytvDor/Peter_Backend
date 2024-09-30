// const mongoose = require('mongoose');

// const YouTubeUrlSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   url: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   }
// });

// module.exports = mongoose.model('YouTubeUrl', YouTubeUrlSchema);
const mongoose = require('mongoose');

const YouTubeUrlSchema = new mongoose.Schema({
 
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model('YouTubeUrl', YouTubeUrlSchema);
