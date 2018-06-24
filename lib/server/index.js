const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cons = require('consolidate');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const createArticleSchema = require('./models/article');
const createSettingSchema = require('./models/setting');
const createUserSchema = require('./models/user');

/**
 * Initialize Express server instance.
 */
function createServer(appConfig) {
  const server = express();
  const { mongoURL } = appConfig;

  // Create schemas.
  server.schemas = {
    Article: createArticleSchema(),
    User: createUserSchema(),
    Setting: createSettingSchema()
  };

  // Configure templating.
  server.engine('hbs', cons.handlebars);
  server.set('view engine', 'hbs');
  server.set('views', __dirname + '/views');

  // Add middleware.
  server.use(morgan('dev'));
  server.use(bodyParser.json());
  server.use(cors());

  // Add non-dynamic, API-specific routes.
  server.use('/api/v1/auth', authRouter(appConfig, server.schemas));
  server.use('/api/v1/users', usersRouter(appConfig, server.schemas));

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
module.exports = createServer;
