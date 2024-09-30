const mongoose = require('mongoose');

const ProgramsSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
 
});

module.exports = mongoose.model('Program', ProgramsSchema);
