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
 * @param {String} endpoint Content type endpoings like `pages`.
 * @return {Object}
 */
export function getContentTypeInputs(endpoint) {
  const type = getContentType(endpoint);
  const inputs = {};
  type.fields.forEach(function(field) {
    const { id, type, options } = field;
    inputs[field.id] = field.default ? field.default : fieldDefault(type, options);
  });
  return inputs;
}

/**
 * Get a default, blank starting value,
 * depending on the type of field.
 *
 * @param {String} type    Field type, like `text`, `textarea`, 'checkbox', etc.
 * @param {Array}  options Options when relevant, like with a <select> menu.
 * @return {String|Array}
 */
export function fieldDefault(type, options) {
  switch (type) {
    case 'select':
    case 'radio':
      return options[0];
    case 'checkbox':
      return false;
    case 'checkbox-group':
      return [];
    default:
      return '';
  }
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
 * @param {Object} data    A copy of caseomponent state to pull data from.
 * @param {String} context Context of data clean, `edit` or `new`.
 * @return {Object} Sanitized data.
 */
export function cleanUserData(data, context = 'edit') {
  const { username, first_name, last_name, email, password, password_confirm, bio } = data.inputs;

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
 * Sanitize article to save.
 *
 * @param {Object} data    A copy of caseomponent state to pull data from.
 * @param {String} context Context of data clean, `edit` or `new`.
 * @return {Object} Sanitized data.
 */
export function cleanArticleData(data, context) {
  const { title, inputs } = data;

  if (!title) {
    return 'You must enter a title.';
  }

  return {
    title,
    fields: inputs // @TODO Actual sanitization of fields.
  };
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

/**
 * Build API url for axios request.
 *
 * @param {String} method   Request method, `get`, `post`, `put`, or `delete`.
 * @param {String} resource The type of resource, like `users` or `pages`.
 * @param {String} item     Slug or ID of item. Should be slug only for get requests.
 * @return {String} URL, like `/api/v1/foo`.
 */
export function apiUrl(method = 'get', resource = '', item = '') {
  // Default
  if (!resource) return '/api/v1/articles';

  // Users
  if (resource === 'users' && item) return `/api/v1/users/${item}`;
  if (resource === 'users') return '/api/v1/users';

  // Single Articles
  if (item && method === 'get') return `/api/v1/articles?slug=${item}`; // GET - item should be slug.
  if (item) return `/api/v1/articles/${item}`; // PUT, DELETE - item should be _id.

  // GET of all articles of type, or POST new article of type.
  const contentType = getContentType(resource);
  return `/api/v1/articles?content_type=${contentType.id}`;
}
