const express = require('express');
const jwtValidate = require('express-jwt');

/**
 * Creates an Express router instance for
 * the admin clients.
 *
 * @param {Object} config              Pieces to configure router.
 * @param {String} config.secret       JWT secret.
 * @param {Object} config.contentTypes Registered content types.
 * @param {Object} config.optionGroups Registered option groups.
 * @return {Object} Express.Router() instance.
 */
function configRouter(config) {
  const router = express.Router();
  const { secret, contentTypes, optionGroups } = config;

  // Protect all /config API endpoints.
  router.use('/', jwtValidate({ secret }));

  router.get('/', function(req, res) {
    return res.status(200).send({ contentTypes, optionGroups });
  });

  router.get('/content-types', function(req, res) {
    return res.status(200).send(contentTypes);
  });

  router.get('/content-types/:type', function(req, res) {
    const find = contentTypes.find(type => type.slug === req.params.type);
    if (!find) return res.status(404).send({ message: 'Content type not found.' });
    return res.status(200).send(find);
  });

  // router.get('/option-groups', function(req, res) {}); // @TODO
  // router.get('/option-groups/:group', function(req, res) {}); // @TODO

  return router;
}

/**
 * Export factory function.
 */
module.exports = configRouter;
