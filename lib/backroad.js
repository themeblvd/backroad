const fs = require('fs');
const path = require('path');
const findRoot = require('find-root');
const createServer = require('./server');
const chalk = require('chalk');
const jwtValidate = require('express-jwt');
const createContentTypeSchema = require('./server/models/content-type');
const contentTypeRouter = require('./server/routes/content-types');

/**
 * Backroad.
 *
 * This is the main constructor for starting
 * a Backroad application.
 */
class Backroad {
  /**
   * Class constructor.
   *
   * @public
   *
   * @param {Object} options Application options.
   */
  constructor(options) {
    const defaults = {
      secret: process.env.SECRET || 'replace_me_with_better_secret',
      port: process.env.PORT || 5050,
      mongoURL:
        process.env.MONGO_URL ||
        `mongodb://localhost:27017/${path.basename(path.dirname(process.argv[1]))}`,
      adminEndpoint: 'admin',
      installEndpoint: 'install'
    };

    this.options = { ...defaults, ...options };
    this.projectRoot = findRoot(path.dirname(require.main.filename));
    this.server = createServer(this.options);
    this.contentTypes = [];
  }

  /**
   * Add a content type.
   *
   * Each dynamically added content type gets its
   * own collection in the database.
   *
   * @public
   *
   * @param {Object} config            Configuration.
   * @param {String} config.name       Singluar human-readable document name, like `Page` or `Blog Post`.
   * @param {String} config.pluralName Plural human-readable document name, like `Pages` or `Blog Posts`.
   * @param {String} config.endpoint   Plural slug, like `pages` or `blog-posts`.
   * @param {Array}  config.fields     Data fields configured for each document.
   */
  addContentType(config) {
    if (!config.name || !config.pluralName || !config.fields || !config.fields.length) {
      return;
    }

    if (!config.endpoint) {
      config.endpoint = config.pluralName.toLowerCase.replace(/ /g, '-');
    }

    this.contentTypes.push(config);

    config.secret = this.options.secret;

    this.server.use(
      `/api/${config.endpoint}`,
      contentTypeRouter(config, createContentTypeSchema(config))
    );
  }

  /**
   * Start the server instance.
   *
   * @public
   */
  start() {
    const { secret, port, adminEndpoint } = this.options;

    // Create protected endpoints, for retrieving info
    // about registered content types.
    this.server.use('/api/content-types', jwtValidate({ secret }));

    this.server.get('/api/content-types', (req, res) => {
      res.status(200).send(this.contentTypes);
    });

    this.contentTypes.forEach(type => {
      this.server.get('/api/content-types/:endpoint', (req, res) => {
        res.status(200).send(this.contentTypes.find(type => type.endpoint === req.params.endpoint));
      });
    });

    // Start the Express server.
    this.server.listen(port, function() {
      console.log(chalk.green('Server started!'));
      console.log(
        chalk`🚦 Take the backroad via {cyan ${`http://localhost:${port}/${adminEndpoint}`}} ...`
      );
    });
  }
}

module.exports = Backroad;
