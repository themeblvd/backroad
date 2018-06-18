const path = require('path');
const serverInit = require('../server/server-init');
const chalk = require('chalk');

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
   * @param {Object} options Application options.
   */
  constructor(options = {}) {
    this.options = { ...optionDefaults, ...options };
    this.server = serverInit(this.options);
  }

  /**
   * Start the server instance.
   *
   * @public
   */
  start() {
    const { port, adminEndpoint } = this.options;

    this.server.listen(port, function() {
      console.log(chalk.green('Server started!'));
      console.log(
        chalk`🚦 Take the backroad via {cyan ${`http://localhost:${port}/${adminEndpoint}`}} ...`
      );
    });
  }
}

/**
 * Default options.
 *
 * Merged with any options passed through
 * the constructor.
 *
 * @private
 */
const optionDefaults = {
  port: process.env.PORT || 5050,
  mongoURL: process.env.MONGO_URL || `mongodb://localhost:27017/${path.basename(process.cwd())}`,
  adminEndpoint: 'admin'
};

module.exports = Backroad;
