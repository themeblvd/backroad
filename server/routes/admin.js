const express = require('express');
const adminRouter = express.Router();
const User = require('../models/user');

/**
 * Redirect to installation, when no users
 * exist.
 */
adminRouter.use('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).send(err);
    }

    /* @TODO Uncomment after we have installation in place, to create a first user.
    if (!users.length) {
      res.redirect('/install');
    }
    */

    next();
  });
});

/**
 * Handle admin request.
 */
adminRouter.get('/', function(req, res) {
  // ...
  res.status(201).send('Admin route...');
});

module.exports = adminRouter;
