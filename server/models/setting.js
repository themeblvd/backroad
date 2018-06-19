const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  value: {
    type: Schema.Types.Mixed
  }
});

module.exports = mongoose.model('Setting', settingSchema);
