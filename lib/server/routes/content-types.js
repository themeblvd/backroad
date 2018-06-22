const express = require('express');
const jwtValidate = require('express-jwt');

/**
 * Creates an Express router instance for a
 * dynamically added content type.
 *
 * @param  {Object} config Content type configuration.
 * @param  {Object} schema Mongoose model schema.
 * @return {Object} Express.Router() instance.
 */
function contentTypeRouter(config, Schema) {
  const router = express.Router();
  const { secret } = config;

  /**
   * Handle request to get all documents
   * for custom content type.
   */
  router.get('/', function(req, res) {
    Schema.find((err, items) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(items);
    });
  });

  /**
   * Handle request to get single document
   * for custom content type.
   *
   * NOTE: These GET requests use the slug like
   * `my-page` and POST, PUT, and DELETE requests
   * (below) use the _id assigned by MongoDB.
   */
  router.get('/:slug', function(req, res) {
    Schema.findOne({ slug: req.params.slug }, (err, item) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(item);
    });
  });

  /**
   * Handle request to add a new custom content
   * type document.
   */
  router.post('/', jwtValidate({ secret }), function(req, res) {
    const item = new Schema({ ...req.body, author: req.user.username });
    item.save((err, newItem) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send(newItem);
    });
  });

  /**
   * Handle request to update an existing custom
   * content type document.
   */
  router.put('/:id', jwtValidate({ secret }), function(req, res) {
    Schema.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedItem) {
      if (err) return res.status(500).send(err);
      return res.status(201).send(updatedItem);
    });
  });

  /**
   * Handle request to delete an existing custom
   * content type document.
   */
  router.delete('/:id', jwtValidate({ secret }), function(req, res) {
    Schema.findByIdAndRemove(req.params.id, function(err, deletedItem) {
      if (err) return res.status(500).send(err);
      return res.sendStatus(204);
    });
  });

  return router;
}

/**
 * Export factory function.
 */
module.exports = contentTypeRouter;
