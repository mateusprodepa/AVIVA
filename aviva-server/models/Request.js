const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const request = new Schema({
  id: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true }
  },

  title: {
    type: String,
    required: [true, 'O título não pode ficar em branco'],
  },

  text: {
    type: String,
  },

  img: {
    type: String,
    default: ''
  },

  senderId: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model('Requests', request);
