import md5 from 'md5';

/**
 * Get gravatar image URL.
 *
 * @param  {String} email Email address.
 * @return {String}       Gravatar image URL.
 */
export function gravatar(email) {
  email = email.replace(/\s/g, ''); // Remove whitespace.
  email = email.toLowerCase();
  return `https://www.gravatar.com/avatar/${md5(email)}.jpg?default=mp`;
}
