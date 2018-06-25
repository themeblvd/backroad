const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugHero = require('mongoose-slug-hero');

/**
 * Creates a Mongoose schema for an article
 * in the database.
 */
function createArticleSchema(config) {
  const options = {
    minimize: false,
    collection: 'articles',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  };

  const model = {
    content_type: {
      type: 'String',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    created_by: {
      type: String,
      required: true
    },
    fields: {
      type: Object,
      default: {}
    }
  };

  const schema = new Schema(model, options);

  schema.plugin(slugHero, { doc: 'Article', field: 'title' });

  return mongoose.model('Article', schema);
}

/**
 * Export factory function.
 */
module.exports = createArticleSchema;
