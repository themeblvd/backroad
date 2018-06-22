const contentTypeRouter = require('./server/routes/content-types');
const createContentTypeSchema = require('./server/models/content-type');

/**
 * Content Types API.
 *
 * @private
 *
 * @param {Object} config Backstreet configuration.
 * @param {Object} config.server Express server instance.
 * @param {Object} config.secret Current application JWT secret.
 */
function createContentTypes(config) {
  const { server, secret } = config;
  const types = [];

  /**
   * Add a content type.
   *
   * @public
   *
   * @param {Object} type            Configuration.
   * @param {String} type.id         Singluar ID (snake-case) like `page` or `blog_post`.
   * @param {String} type.name       Singluar human-readable document name, like `Page` or `Blog Post`.
   * @param {String} type.pluralName Plural human-readable document name, like `Pages` or `Blog Posts`.
   * @param {String} type.endpoint   Plural url slug, like `pages` or `blog-posts`.
   * @param {Array}  type.fields     Data fields configured for each document.
   */
  function add(type) {
    if (!type.id || !type.name || !type.pluralName || !type.fields) {
      return;
    }

    if (!type.endpoint) {
      type.endpoint = toSlug(contentType.pluralName);
    }

    types.push(type);

    server.use(
      `/api/v1/${type.endpoint}`,
      contentTypeRouter({ ...type, secret }, createContentTypeSchema(type))
    );
  }

  /**
   * Remove a content type.
   *
   * @public
   *
   * @param {String|Array} toRemove Content type ID or IDs to remove.
   */
  function remove(toRemove) {
    if (Array.isArray(toRemove)) {
      toRemove.forEach(id => {
        removeSingle(id);
      });
    } else if (typeof toRemove === 'string') {
      removeSingle(toRemove);
    }
  }

  /**
   * Remove a single content type.
   *
   * @private
   *
   * @param {String} id Content type ID to remove.
   */
  function removeSingle(id) {
    const toRemove = types.findIndex(type => {
      return type.id === id;
    });
    types.splice(toRemove, 1);
  }

  /**
   * Get configuration of content type(s).
   *
   * @public
   *
   * @param {String} id Content type id. Omit for all.
   * @return {Array|String} All content types or single content type.
   */
  function get(id = '') {
    if (id) {
      return types.find(type => type.id === id);
    } else {
      return types;
    }
  }

  /**
   * Public API.
   */
  return { add, remove, get };
}

module.exports = createContentTypes;
