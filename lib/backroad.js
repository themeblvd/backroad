const fs = require('fs');
const path = require('path');
const findRoot = require('find-root');
const chalk = require('chalk');
const jwtValidate = require('express-jwt');
const createServer = require('./server');
const createContentTypes = require('./content-types');
// const createOptions = require('./options'); // @TODO
const configRouter = require('./server/routes/config');
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

  console.log(appConfig);

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

    // Add secured configuration endpoints, for admin client.
    const publicConfig = toPublicConfig({ app: appConfig, contentTypes, options });
    server.use('/api/v1/config', configRouter({ publicConfig, secret }));

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
