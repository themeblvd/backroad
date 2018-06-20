const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Creates a Mongoose schema for a dynamically
 * added content type.
 */
function createContentTypeSchema(config) {
  const options = {
    timestamps: true,
    collection: config.endpoint
  };

  const skeleton = {
    author: {
      type: 'String',
      required: true
    }
  };

  config.fields.forEach(function(field) {
    const key = {};

    if (field.default) {
      key.default = field.default;
    } else {
      key.default = '';
    }

    switch (field.type) {
      case 'select':
      case 'checkbox-group':
        key.type = Array;
        break;
      case 'text':
      case 'textarea':
      case 'markdown':
      case 'checkbox':
      default:
        key.type = String;
    }

    skeleton[field.name] = key;
  });

  return mongoose.model(config.name, new Schema(skeleton, options));
}

/**
 * Export factory function.
 */
module.exports = createContentTypeSchema;
