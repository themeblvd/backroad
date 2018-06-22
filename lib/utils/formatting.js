module.exports = {
  /**
   * Format a unified configuration object.
   *
   * @param {Object} config              Mash of config pieces to wrangle.
   * @param {Object} config.app          Application instance configuration.
   * @param {Object} config.contentTypes Content types API instance.
   * @param {Object} config.options      Options API instance.
   */
  toPublicConfig: function(config) {
    const { app, contentTypes, options } = config;

    const publicConfig = {
      adminTitle: app.adminTitle,
      contentTypes: contentTypes.get()
      // options: options.get() // @TODO
    };

    return publicConfig;
  },
  /**
   * Format a string into a slug.
   *
   * For example:
   * `Foo` => `foo`
   * `Foo Bar` => `foo-bar`
   *
   * @param {String} str String to format.
   * @return {String} Formatted string.
   */
  toSlug: function(str) {
    return str
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }
};
