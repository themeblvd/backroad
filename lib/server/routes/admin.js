const path = require('path');
const express = require('express');
const User = require('../models/user');

/**
 * Creates an Express router for the
 * admin client.
 *
 * @param {Object} options
 * @return {Object} Express.Router() instance.
 */
function adminRouter(options) {
  const router = express.Router();
  const { installEndpoint } = options;

  /**
   * Check for an admin user.
   *
   * If no admin user exists yet, redirect
   * to the installation page.
   */
  router.use('/', function(req, res, next) {
    User.find({ role: 'admin' }, function(err, users) {
      if (err) return res.status(500).send(err);
      if (!users.length) return res.redirect(`/${installEndpoint}`);
      next();
    });
  });

  /**
   * Handle admin request.
   */
  const staticPath = process.argv.includes('backroadDev')
    ? '../../../admin/public'
    : '../../../dist/admin'; // prettier-ignore

  router.use('/', express.static(path.join(__dirname, staticPath)));

  return router;
}

/**
 * Export factory function.
 */
module.exports = adminRouter;
