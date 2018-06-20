const fs = require('fs');
const path = require('path');
const findRoot = require('find-root');
const createServer = require('./server');
const chalk = require('chalk');
const jwtValidate = require('express-jwt');
const createContentTypeSchema = require('./server/models/content-type');
const contentTypeRouter = require('./server/routes/content-types');

/**
 * Backroad Headless CMS
 *
 * This is the main factory function for starting
 * a Backroad application instance.
 */
function backroad(config) {
  const configDefaults = {
    secret: process.env.SECRET || 'replace_me_with_better_secret',
    port: process.env.PORT || 5050,
    mongoURL:
      process.env.MONGO_URL ||
      `mongodb://localhost:27017/${path.basename(path.dirname(process.argv[1]))}`,
    adminEndpoint: 'admin',
    installEndpoint: 'install'
  };

  const backroadConfig = { ...configDefaults, ...config };

  const projectRoot = findRoot(path.dirname(require.main.filename));

  const server = createServer(backroadConfig);

  const contentTypes = [];

  /**
   * Add a content type.
   *
   * Each dynamically added content type gets its
   * own collection in the database.
   *
   * @public
   *
   * @param {Object} contentType            Configuration.
   * @param {String} contentType.name       Singluar human-readable document name, like `Page` or `Blog Post`.
   * @param {String} contentType.pluralName Plural human-readable document name, like `Pages` or `Blog Posts`.
   * @param {String} contentType.endpoint   Plural slug, like `pages` or `blog-posts`.
   * @param {Array}  contentType.fields     Data fields configured for each document.
   */
  function addContentType(contentType) {
    if (
      !contentType.name ||
      !contentType.pluralName ||
      !contentType.fields ||
      !contentType.fields.length
    ) {
      return;
    }

    if (!contentType.endpoint) {
      contentType.endpoint = contentType.pluralName.toLowerCase.replace(/ /g, '-');
    }

    contentTypes.push(contentType); // Allow us to keep track of all registered content types.

    contentType.secret = backroadConfig.secret; // So we can pass the secret to router.

    server.use(
      `/api/v1/${contentType.endpoint}`,
      contentTypeRouter(contentType, createContentTypeSchema(contentType))
    );
  }

  /**
   * Start the server instance.
   *
   * @public
   */
  function start() {
    const { secret, port, adminEndpoint } = backroadConfig;

    // Create protected endpoints, for retrieving info
    // about registered content types.
    server.use('/api/v1/content-types', jwtValidate({ secret }));

    server.get('/api/v1/content-types', function(req, res) {
      res.status(200).send(this.contentTypes);
    });

    contentTypes.forEach(function(type) {
      server.get('/api/v1/content-types/:endpoint', function(req, res) {
        res.status(200).send(contentTypes.find(type => type.endpoint === req.params.endpoint));
      });
    });

    // Start the Express server.
    server.listen(port, function() {
      console.log(chalk.green('Server started!'));
      console.log(
        chalk`🚦 Take the backroad via {cyan ${`http://localhost:${port}/${adminEndpoint}`}} ...`
      );
    });
  }

  /**
   * Public API.
   */
  return {
    addContentType,
    start
  };
}

module.exports = backroad;
