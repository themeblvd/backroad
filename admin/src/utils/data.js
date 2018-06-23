/**
 * Get Backroad configuration.
 *
 * @param {String} part Optional. Specific part of config.
 * @return {Object}
 */
export function getConfig(part) {
  const backroad = JSON.parse(window.backroad);
  if (part) return backroad[part];
  return backroad;
}

/**
 * Get a specific content type's configuration
 * object.
 *
 * @param {String} endpoint Content type endpoings like `pages`.
 * @return {Object} Found content type.
 */
export function getContentType(endpoint) {
  const types = getConfig('contentTypes');
  return types.find(type => type.endpoint === endpoint);
}

/**
 * Check to see if a content type ID is
 * valid or not.
 *
 * @param {String} endpoint Content type endpoings like `pages`.
 * @return {Boolean} Whether valid.
 */
export function isValidContentType(endpoint) {
  return getContentType(endpoint) ? true : false;
}

/**
 * Get the singular title for a content type.
 *
 * @param {String} endpoint Content type endpoings like `pages`.
 * @return {String} Singular title.
 */
export function getSingularTitle(endpoint) {
  const type = getContentType(endpoint);
  if (type && type.name) return type.name;
  return '';
}

/**
 * Get the singular title for a content type.
 *
 * @param {String} endpoint Content type endpoings like `pages`.
 * @return {String} Plural title.
 */
export function getPluralTitle(endpoint) {
  const type = getContentType(endpoint);
  if (type && type.pluralName) return type.pluralName;
  return '';
}

/**
 * Get initial inputs for editing
 * a user.
 *
 * @return {Object}
 */
export function getUserInputs() {
  return {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    bio: '',
    password: '',
    password_confirm: ''
  };
}

/**
 * Sanitize user to save.
 *
 * @param {Object} data Data to be sanitized.
 * @return {Object} Sanitized data.
 */
export function cleanUserData(data) {
  const { first_name, last_name, email, password, password_confirm, bio } = data;

  if (!email) {
    return 'You must have an email address.';
  }

  if (password && password !== password_confirm) {
    return 'Both password fields must match when creating a new password.';
  }

  const clean = { first_name, last_name, email, bio }; // @TODO validate email

  if (password) {
    clean.password = password;
  }

  return clean;
}
