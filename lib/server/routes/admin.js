const path = require('path');
const express = require('express');

/**
 * Creates an Express router instance for
 * the admin client.
 *
 * @param {Object} config
 * @param {Array} schemas
 * @return {Object} Express.Router() instance.
 */
function adminRouter(config, schemas) {
  const router = express.Router();
  const { User } = schemas;

  /**
   * Check for an admin user.
   *
   * If no admin user exists yet, redirect
   * to the installation page.
   */
  router.use('/', function(req, res, next) {
    User.find({ role: 'admin' }, function(err, users) {
      if (err) return res.status(500).send(err);
      if (!users.length) return res.redirect('/install');
      next();
    });
  });

  /**
   * Handle admin request.
   */
  const staticPath = process.argv.includes('backroadDev')
    ? '../../../admin/public'
    : '../../../dist/admin'; // prettier-ignore

  router.use('/assets', express.static(path.join(__dirname, staticPath + '/assets')));

  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, staticPath + '/index.html'));
  });

  return router;
}

/**
 * Export factory function.
 */
module.exports = adminRouter;
