const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const adminRouter = require('./routes/admin');
const installRouter = require('./routes/install');

/**
 * Initialize Express server instance.
 */
function serverInit(options) {
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
  server.use(`/${options.adminEndpoint}`, adminRouter);
  server.use('/install', installRouter);
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
      if (err) {
        throw err;
      }
      console.log('🔗 Connected to the database.');
    }
  );
}

module.exports = serverInit;
