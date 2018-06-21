const path = require('path');
const express = require('express');
const { gravatar } = require('../../utils/user');

/**
 * Creates an Express router instance for the
 * installation process.
 *
 * @param {Object} config
 * @param {Array} schemas
 * @return {Object} Express.Router() instance.
 */
function installRouter(config, schemas) {
  const router = express.Router();
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
   * Handle admin request.
   */
  const staticPath = process.argv.includes('backroadDev')
    ? '../../../install/public'
    : '../../../dist/install'; // prettier-ignore

  router.use('/', express.static(path.join(__dirname, staticPath)));

  /**
   * Handle installation.
   *
   * 1. Save project name to settings.
   * 2. Creeate first admin user.
   */
  router.post('/', function(req, res) {
    const projectName = {
      name: 'projectName',
      value: req.body.projectName
    };

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      avatar: gravatar(req.body.email),
      role: 'admin'
    });

    Setting.findOneAndUpdate({ name: 'projectName' }, projectName, { upsert: true })
      .then(setting => {
        return newUser.save();
      })
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
