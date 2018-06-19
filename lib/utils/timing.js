module.exports = {
  /**
   * Timeout promise.
   *
   * This allows us to change timeouts together
   * with a promise.
   *
   * @param {Number}   delay    Time delay in milliseconds.
   * @param {Function} callback Callback function on timeout.
   */
  timeoutPromise: function(delay, callback) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, delay);
    });
  }
};
