const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Creates a Mongoose schema for a setting
 * in the database.
 */
function createSettingSchema(config) {
  const schema = new Schema(
    {
      name: {
        type: String,
        unique: true,
        required: true
      },
      value: {
        type: Schema.Types.Mixed
      }
    },
    { collection: 'settings' }
  );

  return mongoose.model('Setting', schema);
}

/**
 * Export factory function.
 */
module.exports = createSettingSchema;
