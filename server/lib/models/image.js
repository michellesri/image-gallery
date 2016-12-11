const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  link: {
    type: String
  }
});

module.exports = mongoose.model('Image', schema);
