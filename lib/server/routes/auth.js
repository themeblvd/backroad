const express = require('express');
const jwtValidate = require('express-jwt');
const jwt = require('jsonwebtoken');

/**
 * Creates an Express router instance for
 * the admin client.
 *
 * @param {Object} config
 * @param {Array} schemas
 * @return {Object} Express.Router() instance.
 */
function authRouter(config, schemas) {
  const router = express.Router();
  const { secret } = config;
  const { User } = schemas;

  /**
   * Handle registering a new user.
   */
  router.post('/register', function(req, res) {
    User.findOne({ username: req.body.username }, function(err, existingUser) {
      if (err) {
        return res.status(500).send({ success: false, err });
      }

      if (existingUser !== null) {
        return res.status(400).send({ success: false, err: 'That username already exists!' });
      }

      const newUser = new User(req.body);

      newUser.save((err, user) => {
        if (err) {
          return res.status(500).send({ success: false, err });
        }
        const token = jwt.sign(user.toObject(), secret);
        return res.status(201).send({ success: true, user: user.withoutPassword(), token });
      });
    });
  });

  /**
   * Handle logging in a user.
   */
  router.post('/login', function(req, res) {
    User.findOne({ username: req.body.username.toLowerCase() }, function(err, user) {
      if (err) {
        return res.status(500).send(err);
      }

      const message = 'Username or password was not correct.';

      if (!user) {
        res.status(401).send({ success: false, message });
      } else {
        user.checkPassword(req.body.password, (err, match) => {
          if (err) throw err;

          if (!match) {
            res.status(401).send({ success: false, message });
          }

          const token = jwt.sign(user.toObject(), secret, { expiresIn: '24h' });

          res.send({ token, success: true });
        });
      }
    });
  });

  /**
   * Handle verifying a user that's already
   * logged in.
   *
   * This is just a quick check to help the the
   * admin client in displaying itself.
   *
   * This endpoint does not provide any actual
   * authorization for receiving data.
   */
  router.get('/verify', jwtValidate({ secret }), function(req, res) {
    console.log(req.user);
    User.findById(req.user._id, function(err, user) {
      if (err) {
        return res.status(500).send({ success: false, err });
      }
      if (!user) {
        return res.status(400).send({ success: false, message: 'User no longer exists.' });
      }
      return res
        .status(200)
        .send({ success: true, message: 'User identity verified.', user: user.private() });
    });
  });

  return router;
}

/**
 * Export factory function.
 */
module.exports = authRouter;
