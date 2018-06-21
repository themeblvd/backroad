const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugHero = require('mongoose-slug-hero');

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
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    author: {
      type: String,
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

  const schema = new Schema(skeleton, options);

  schema.plugin(slugHero, { doc: config.endpoint, field: 'title' });

  return mongoose.model(config.name, schema);
}

/**
 * Export factory function.
 */
module.exports = createContentTypeSchema;
