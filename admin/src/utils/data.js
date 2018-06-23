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
export function singularTitle(endpoint) {
  if (endpoint === 'users') return 'User';
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
export function pluralTitle(endpoint) {
  if (endpoint === 'users') return 'Users';
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
 * @param {Object} data    Data to be sanitized.
 * @param {String} context Context of data clean, `edit` or `new`.
 * @return {Object} Sanitized data.
 */
export function cleanUserData(data, context = 'edit') {
  const { username, first_name, last_name, email, password, password_confirm, bio } = data;

  if (context === 'new' && username === 'new') {
    return 'The word "new" is reserved and can\'t be used for a username.';
  }

  if (context === 'new' && !username) {
    return 'You must enter a username.';
  }

  if (!email) {
    return 'You must enter a valid email address.';
  }

  if (context === 'new' && !username) {
    return 'You must enter a username.';
  }

  if (context === 'new' && !password) {
    return 'You must enter a password.';
  }

  if (password && password.length < 8) {
    return 'Your password must be at least 8 characters.';
  }

  if (password && password !== password_confirm) {
    return 'Both password fields must match when creating a new password.';
  }

  const clean = { first_name, last_name, email, bio }; // @TODO validate email

  if (context === 'new') {
    clean.username = username;
  }

  if (password) {
    clean.password = password;
  }

  return clean;
}

/**
 * Get the base path of a pathname.
 *
 * @param {String} path Pathname, like `/foo/bar/`.
 * @return {String} Base path, like `foo`.
 */
export function getPathBase(path) {
  path = path.replace(/^\//, '');
  path = path.replace(/\/$/, '');
  path = path.split('/');
  return path[0];
}

/**
 * Get the item being editing in a pathname.
 *
 * @param {String} path Pathname, like `/foo/bar/`.
 * @return {String} Item path, like `bar`.
 */
export function getPathItem(path) {
  path = path.replace(/^\//, '');
  path = path.replace(/\/$/, '');
  path = path.split('/');
  return path.length > 1 ? path[1] : '';
}
