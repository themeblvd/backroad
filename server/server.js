const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRouter = require('./routes/admin');
const installRouter = require('./routes/install');

/**
 * Initialize Express server instance.
 */
function server(options) {
  const server = express();
  const { adminEndpoint, installEndpoint, mongoURL } = options;

  // Add middleware.
  server.use(morgan('dev'));
  server.use(bodyParser.json());
  server.use(cors());

  // Add routes.
  server.use(`/${adminEndpoint}`, adminRouter(options));
  server.use(`/${installEndpoint}`, installRouter(options));

  // Connect to database.
  mongoose.connect(
    mongoURL,
    function(err) {
      if (err) throw err;
      console.log('🔗 Connected to the database.');
    }
  );

  return server;
}

/**
 * Export server factory function.
 */
module.exports = server;
