const env = require('dotenv').config();
const backroad = require('../..'); // require('backroad')
const { post, page, book } = require('./content-types');

/**
 * Create new application.
 */
const app = backroad();

/**
 * Add custom content types.
 */
app.contentTypes.add(post);
app.contentTypes.add(page);
app.contentTypes.add(book);

/**
 * Run the application!
 */
app.start();
