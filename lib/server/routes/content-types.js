const express = require('express');
const jwtValidate = require('express-jwt');

/**
 * Creates an Express router instance for a
 * dynamically added content type.
 *
 * @param {Object} config  Configuration of the current content type.
 * @param {Array}  schemas All currently created schemas.
 * @return {Object} Express.Router() instance.
 */
function contentTypeRouter(config, schemas) {
  const router = express.Router();
  const { id } = config;
  const { Article } = schemas;

  /**
   * Handle request to get all documents
   * for custom content type.
   */
  router.get('/', function(req, res) {
    const orderBy = req.query.order_by ? req.query.order_by : 'created_at';
    const order = req.query.order ? req.query.order : 'desc';
    const per_page = req.query.per_page ? Number(req.query.per_page) : 0;
    const page = req.query.page ? Number(req.query.page) : 1;

    const query = {
      content_type: id
    };

    if (req.query.created_by) {
      query.created_by = req.query.created_by;
    }

    // Query by one of the registered content type's custom
    // fields, i.e. `.../?field_name=<field>&field_value=<value>`
    if (req.query.field_name && req.query.field_value) {
      query[`fields.${req.query.field_name}`] = req.query.field_value;
    }

    Article.find(query)
      .sort({ [orderBy]: order })
      .exec(function(err, articles) {
        if (err) {
          return res.status(500).send(err);
        }

        if (per_page) {
          const start = per_page * page - per_page;
          const end = per_page * page;
          return res.status(200).send(articles.slice(start, end));
        }

        return res.status(200).send(articles);
      });
  });

  /**
   * Handle request to get single article
   * for custom content type.
   *
   * NOTE: These GET requests use the slug like
   * `my-page` and not the actual _id field.
   */
  router.get('/:slug', function(req, res) {
    Article.findOne({ content_type: id, slug: req.params.slug }, (err, item) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(item);
    });
  });

  return router;
}

/**
 * Export factory function.
 */
module.exports = contentTypeRouter;
