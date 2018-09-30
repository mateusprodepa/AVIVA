const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const _id = require('shortid')

const user = new Schema({
  id: {
    type: String,
    required: true,
    index: { unique: true, dropDups: true }
  },

  img: {
    type: String,
    default: `https://robohash.org/${_id.generate()}?set=set4`
  },

  username: {
    type: String,
    required: [true, 'O nome de usuário não pode ficar em branco'],
    index: { unique: true, dropDups: true }
  },

  email: {
    type: String,
    required: [true, 'O e-mail não pode ficar em branco'],
    index: { unique: true, dropDups: true }
  },

  password: {
    type: String,
    required: [true, 'A senha não deve ficar em branco']
  },

  requests: {
    type: Array,
    default: []
  },

  city: {
    type: String,
    default: 'Belém'
  },

  bloodType: {
    type: String
  }

})


module.exports = mongoose.model('Users', user);
