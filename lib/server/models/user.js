const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

/**
 * Creates a Mongoose schema for a
 * user in the database.
 */
function createUserSchema(config) {
  const schema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
      password: {
        type: String,
        required: true
      },
      role: {
        type: String,
        enum: ['admin', 'editor'],
        required: true,
        default: 'editor'
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      first_name: {
        type: String,
        default: ''
      },
      last_name: {
        type: String,
        default: ''
      },
      bio: {
        type: String,
        default: ''
      }
    },
    { collection: 'users' }
  );

  /**
   * Provide internal method for checking
   * the password.
   */
  schema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  };

  /**
   * Provide private user data, when
   * authorized.
   */
  schema.methods.private = function() {
    const user = this.toObject();
    delete user.password;
    return user;
  };

  /**
   * Provide limited user data, for
   * public view.
   */
  schema.methods.public = function() {
    const { username, firstName, lastName, avatar } = this.toObject();
    return { username, firstName, lastName, avatar };
  };

  return mongoose.model('User', schema);
}

/**
 * Export factory function.
 */
module.exports = createUserSchema;
