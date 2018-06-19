const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const createAdminRouter = require('./routes/admin');
const createInstallRouter = require('./routes/install');

/**
 * Initialize Express server instance.
 */
function createServer(options) {
  const server = express();
  addMiddleware(server, options);
  addRoutes(server, options);
  addDatabase(server, options);
  return server;
}

/**
 * Add middleware.
 *
 * @private
 */
function addMiddleware(server, options) {
  server.use(bodyParser.json());
  server.use(cors());
}

/**
 * Add routes.
 *
 * @private
 */
function addRoutes(server, options) {
  server.use(`/${options.adminEndpoint}`, createAdminRouter(options));
  server.use(`/${options.installEndpoint}`, createInstallRouter(options));
}

/**
 * Connect MongoDB database.
 *
 * @private
 */
function addDatabase(server, options) {
  mongoose.connect(
    options.mongoURL,
    function(err) {
      if (err) throw err;
      console.log('🔗 Connected to the database.');
    }
  );
}

/**
 * Export server factory function.
 */
module.exports = createServer;
