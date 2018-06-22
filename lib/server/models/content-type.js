const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugHero = require('mongoose-slug-hero');

/**
 * Creates a Mongoose schema for a dynamically
 * added content type.
 *
 * @param {Object} contentType Data for content type.
 */
function createContentTypeSchema(contentType) {
  const options = {
    timestamps: true,
    collection: contentType.endpoint
  };

  const skeleton = {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  };

  contentType.fields.forEach(function(field) {
    const key = {};

    if (field.default) {
      key.default = field.default;
    } else {
      key.default = '';
    }

    if (field.type === 'select') {
      key.enum = field.options;
    }

    switch (field.type) {
      case 'checkbox-group':
        key.type = Array;
        break;
      case 'text':
      case 'textarea':
      case 'markdown':
      case 'select':
      case 'checkbox':
      default:
        key.type = String;
    }

    skeleton[field.name] = key;
  });

  const schema = new Schema(skeleton, options);

  schema.plugin(slugHero, { doc: contentType.endpoint, field: 'title' });

  return mongoose.model(contentType.name, schema);
}

/**
 * Export factory function.
 */
module.exports = createContentTypeSchema;
