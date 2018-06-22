const path = require('path');
const express = require('express');

/**
 * Creates an Express router instance for
 * the admin client.
 *
 * @param {Object} config              Function-specific configuration object.
 * @param {String} config.appConfig    Formatted configuration object to send.
 * @param {String} config.publicConfig Formatted configuration object to send.
 * @param {String} config.secret       JWT secret for application instance.
 * @param {Object} config.schemas      All currently created schemas.
 * @return {Object} Express.Router() instance.
 */
function adminRouter(config) {
  const router = express.Router();
  const { appConfig, publicConfig, schemas } = config;
  const { adminTitle } = appConfig;
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
   * Serve static admin assets.
   */
  const staticPath = process.argv.includes('backroadDev')
     ? '../../../admin/public'
     : '../../../dist/admin'; // prettier-ignore

  router.use('/assets', express.static(path.join(__dirname, staticPath + '/assets')));

  /**
   * Render admin panel view.
   */
  router.get('*', function(req, res) {
    const adminData = {
      endpoint: 'admin',
      ...publicConfig
    };

    return res.status(200).render('admin', {
      endpoint: 'admin',
      title: adminTitle,
      data: JSON.stringify(adminData)
    });
  });

  return router;
}

/**
 * Export factory function.
 */
module.exports = adminRouter;
