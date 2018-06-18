const express = require('express');
const installRouter = express.Router();

installRouter.get('/', function(req, res) {
  res.status(201).send('Install route...');
});

module.exports = installRouter;
