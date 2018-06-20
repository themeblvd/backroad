const md5 = require('md5');

module.exports = {
  /**
   * Get gravatar image URL.
   *
   * @param  {String} email Email address.
   * @return {String}       Gravatar image URL.
   */
  gravatar: function(email) {
    email = email.replace(/\s/g, ''); // Remove whitespace.
    email = email.toLowerCase();
    return `https://www.gravatar.com/avatar/${md5(email)}.jpg?default=mp`;
  }
};
