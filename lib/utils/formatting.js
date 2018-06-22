module.exports = {
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
