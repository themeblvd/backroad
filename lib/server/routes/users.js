const express = require('express');
const jwtValidate = require('express-jwt');

/**
 * Creates an Express router instance for
 * the admin client.
 *
 * @param {Object} config
 * @param {Array} schemas
 * @return {Object} Express.Router() instance.
 */
function usersRouter(config, schemas) {
  const router = express.Router();
  const { secret } = config;
  const { User } = schemas;

  /**
   * Quietly verify token.
   *
   * If token is verified a req.user will get
   * added to the current request.
   */
  router.use(jwtValidate({ secret, credentialsRequired: false }));

  /**
   * Get data for all users.
   *
   * Rules:
   * 1. Logged-in admin can get a list of all users
   *    and data.
   * 2. Logged-in non-admin users and non-logged in
   *    can get a list of all public user info.
   *
   * Note: If a logged-in non-admin user wants their
   * own private info, they need to hit the /users/:username
   * endpoint for themselves.
   */
  router.get('/', function(req, res) {
    User.find()
      .then(users => {
        const userToSend = users.map(user => {
          if (req.user && req.user.role === 'admin') {
            return user.private();
          } else {
            return user.public();
          }
        });
        res.status(200).send(userToSend);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  /**
   * Get data for a user.
   *
   * There are two sets of user data, one for
   * public view and an extended one for private
   * view.
   *
   * Rules:
   * 1. Anyone can view public user data for
   *    any user.
   * 2. Logged-in non-admin users can view their
   *    own private info.
   * 3. Logged-in admin user can view private info
   *    for any user.
   */
  router.get('/:username', function(req, res) {
    User.findOne({ username: req.params.username })
      .then(user => {
        // If: (1) Not logged-in or (2) Non-admin not
        // viewing self, show public user info only.
        if (!req.user || (req.user.role !== 'admin' && req.user.username !== user.username)) {
          res.status(200).send(user.public());
        }
        res.status(200).send(user.private());
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  /**
   * Add a new user.
   *
   * Currently, only an administrator can add
   * a new user.
   */
  router.post('/', function(req, res) {
    if (!req.user) {
      return res.sendStatus(401);
    }

    if (req.user.role !== 'admin') {
      return res.sendStatus(403);
    }

    const user = new User(req.body);

    user.save((err, newUser) => {
      if (err) return res.status(500).send(err);
      return res.status(201).send(newUser);
    });
  });

  /**
   * Update a user.
   *
   * Rules:
   * 1. Admins can edit any user.
   * 2. Non-admins can only edit their user data.
   * 3. Non-admins cannot change their role.
   * 4. A username can NEVER be changed by anyone.
   */
  router.put('/:username', function(req, res) {
    if (!req.user) {
      return res.sendStatus(401);
    }

    if (req.user.role !== 'admin' && req.user.username !== req.params.username) {
      return res.sendStatus(403);
    }

    const data = req.body;

    if (data.username) {
      delete data.username; // A username can never be changed.
    }

    if (data.role && req.user.role !== 'admin') {
      delete data.role; // A non-admin user cannot change their role.
    }

    User.findOneAndUpdate(
      { username: req.params.username },
      data,
      { new: true },
      (err, updatedUser) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send(updatedUser.private());
      }
    );
  });

  /**
   * Delete a user.
   *
   * Rules:
   * 1. Only admins can delete users.
   * 2. A user cannot delete themselves.
   */
  router.delete('/:username', function(req, res) {
    if (!req.user) {
      return res.sendStatus(401);
    }

    if (req.user.role !== 'admin') {
      return res.sendStatus(403);
    }

    User.findOneAndRemove({ username: req.params.username }, err => {
      if (err) return res.status(500).send(err);
      return res.sendStatus(204);
    });
  });

  return router;
}

/**
 * Export factory function.
 */
module.exports = usersRouter;
