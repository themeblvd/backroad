const express = require('express');
const jwtValidate = require('express-jwt');

/**
 * Creates an Express router instance for
 * the admin clients.
 *
 * @param {Object} config              Pieces to configure router.
 * @param {String} config.secret       JWT secret.
 * @param {Object} config.contentTypes Content Type API. Holds all registered content types.
 * @param {Object} config.options      Options API. Holds all registered options.
 * @return {Object} Express.Router() instance.
 */
function configRouter(config) {
  const router = express.Router();
  const { secret, contentTypes, options } = config;

  // Protect all /config API endpoints.
  router.use('/', jwtValidate({ secret }));

  router.get('/', function(req, res) {
    return res.status(200).send({
      contentTypes: contentTypes.get(),
      options: options // @TODO options: options.get() ... or something like that.
    });
  });

  router.get('/content-types', function(req, res) {
    return res.status(200).send(contentTypes.get());
  });

  router.get('/content-types/:id', function(req, res) {
    const type = contentTypes.get(req.params.id);
    if (type) return res.status(404).send({ message: 'Content type not found.' });
    return res.status(200).send(type);
  });

  // router.get('/option-groups', function(req, res) {}); // @TODO
  // router.get('/option-groups/:group', function(req, res) {}); // @TODO

  return router;
}

/**
 * Export factory function.
 */
module.exports = configRouter;
