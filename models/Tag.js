const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    required: [true, 'Please enter a name'],
  },
  tagColor: {
    type: String,
    required: [true, 'Please select a color']
  },
});

module.exports = mongoose.model('Tag', TagSchema);
