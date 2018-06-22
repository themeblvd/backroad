const express = require('express');
const jwtValidate = require('express-jwt');

/**
 * Creates an Express router instance to get
 * configuration data about the application
 * instance.
 *
 * NOTE: None of this data is stored in the
 * database!
 *
 * @param {Object} config              Function-specific configuration object.
 * @param {String} config.publicConfig Formatted configuration object to send.
 * @param {String} config.secret       JWT secret for application instance.
 * @return {Object} Express.Router() instance.
 */
function configRouter(config) {
  const router = express.Router();
  const { publicConfig, secret } = config;
  const { contentTypes, options } = publicConfig;

  router.get('/', function(req, res) {
    return res.status(200).send(publicConfig);
  });

  router.get('/content-types', function(req, res) {
    return res.status(200).send(contentTypes);
  });

  router.get('/content-types/:id', function(req, res) {
    const find = contentTypes.find(type => type.id === req.params.id);
    if (!find) {
      return res.status(404).send({ message: `Content type "${req.params.id}" not found.` });
    }
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
