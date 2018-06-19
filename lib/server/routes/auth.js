const express = require('express');
const jwt = require('jsonwebtoken');

/**
 * Creates an Express router instance for
 * the admin client.
 *
 * @param {Object} options
 * @return {Object} Express.Router() instance.
 */
function authRouter(options, schemas) {
  const router = express.Router();
  const { secret } = options;
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

      if (!user) {
        res
          .status(401)
          .send({ success: false, message: 'User with the provided username was not found' });
      } else {
        user.checkPassword(req.body.password, (err, match) => {
          if (err) throw err;

          if (!match) {
            res.status(401).send({ success: false, message: 'Incorrect password' });
          }

          const token = jwt.sign(user.toObject(), secret, { expiresIn: '24h' });

          res.send({
            token: token,
            user: user.withoutPassword(),
            success: true,
            message: "Here's your token!"
          });
        });
      }
    });
  });

  return router;
}

/**
 * Export factory function.
 */
module.exports = authRouter;
