const fs = require('fs');
const path = require('path');
const findRoot = require('find-root');
const chalk = require('chalk');
const jwtValidate = require('express-jwt');
const createServer = require('./server');
const createContentTypes = require('./content-types');
// const createOptions = require('./options'); // @TODO
const adminRouter = require('./server/routes/admin');
const installRouter = require('./server/routes/install');
const configRouter = require('./server/routes/config');
const articlesRouter = require('./server/routes/articles');
const contentTypeRouter = require('./server/routes/content-types');
const { toSlug, toPublicConfig } = require('./utils/formatting');

/**
 * Backroad Headless CMS
 *
 * This is the main factory function for starting
 * a Backroad application instance.
 */
function backroad(config) {
  const appDefaults = {
    adminTitle: 'Backroad Admin',
    secret: process.env.SECRET || 'replace_me_with_better_secret',
    port: process.env.PORT || 5050,
    mongoURL:
      process.env.MONGO_URL ||
      `mongodb://localhost:27017/${path.basename(path.dirname(process.argv[1]))}`
  };

  const appConfig = { ...appDefaults, ...config };

  const projectRoot = findRoot(path.dirname(require.main.filename));

  const server = createServer(appConfig);

  const contentTypes = createContentTypes({ server, secret: appConfig.secret });

  const options = []; // @TODO Options API. -- const options = createOptions()

  /**
   * Start the server instance.
   *
   * @public
   */
  function start() {
    const { secret, port } = appConfig;

    const publicConfig = toPublicConfig({ app: appConfig, contentTypes, options });

    // Add server-side rendered routes.
    server.use('/admin', adminRouter({ appConfig, publicConfig, secret, schemas: server.schemas }));
    server.use('/install', installRouter({ appConfig, publicConfig, secret, schemas: server.schemas })); // prettier-ignore

    // Add secured configuration endpoints, for admin client.
    server.use('/api/v1/config', configRouter({ publicConfig, secret }));

    // Add article endpoints, mainly intended admin client use.
    server.use(
      '/api/v1/articles',
      articlesRouter({ appConfig, types: contentTypes.get(), schemas: server.schemas })
    );

    // Public article API. Mask content types within their own endpoints. Read-only.
    contentTypes.get().forEach(function(type) {
      server.use(`/api/v1/${type.endpoint}`, contentTypeRouter({ type, schemas: server.schemas }));
    });

    // Start the Express server.
    server.listen(port, function() {
      console.log(chalk.green('Server started!'));
      console.log(chalk`🚦 Take the backroad via {cyan ${`http://localhost:${port}/admin`}} ...`);
    });
  }

  /**
   * Public API.
   */
  return {
    server,
    start,
    contentTypes
    // options // @TODO
  };
}

module.exports = backroad;
