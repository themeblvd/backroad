const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'editor'],
    required: true,
    default: 'editor'
  },
  email: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String
});

module.exports = mongoose.model('User', userSchema);
