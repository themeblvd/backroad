const env = require('dotenv').config();
const Backroad = require('../..'); // require('backroad')

const app = new Backroad({
  mongoURL: 'mongodb://localhost:27017/basic' // Would default to this, anyway.
});

app.start();
