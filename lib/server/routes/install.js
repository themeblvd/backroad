const path = require('path');
const express = require('express');
const { gravatar } = require('../../utils/user');

/**
 * Creates an Express router instance for the
 * installation process.
 *
 * @param {Object} config              Function-specific configuration object.
 * @param {String} config.appConfig    Formatted configuration object to send.
 * @param {String} config.publicConfig Formatted configuration object to send.
 * @param {String} config.secret       JWT secret for application instance.
 * @param {Object} config.schemas      All currently created schemas.
 * @return {Object} Express.Router() instance.
 */
function installRouter(config) {
  const router = express.Router();
  const { schemas } = config;
  const { Setting, User } = schemas;

  /**
   * Never show the installation screen, if an
   * admin user exists.
   *
   * In the case that an admin role user exists,
   * it means the installation process has already
   * been done. The route needs to be shutdown,
   * or anyone can create a new admin account.
   */
  router.use('/', function(req, res, next) {
    User.find({ role: 'admin' }, function(err, users) {
      if (err) return res.status(500).send(err);
      if (users.length) return res.redirect('/admin');
      next();
    });
  });

  /**
   * Serve static install assets.
   */
  const staticPath = process.argv.includes('backroadDev')
     ? '../../../install/public'
     : '../../../dist/public'; // prettier-ignore

  router.use('/assets', express.static(path.join(__dirname, staticPath + '/assets')));

  /**
   * Render admin panel view.
   */
  router.get('*', function(req, res) {
    return res.status(200).render('install', {
      title: 'Backroad Installation',
      endpoint: 'install'
    });
  });

  /**
   * Handle installation.
   *
   * 1. Save project name to settings.
   * 2. Creeate first admin user.
   */
  router.post('/', function(req, res) {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      avatar: gravatar(req.body.email),
      role: 'admin'
    });

    newUser
      .save()
      .then(user => {
        return res.status(201).send({ redirect: '/admin' });
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  });

  return router;
}

/**
 * Export factory function.
 */
module.exports = installRouter;
