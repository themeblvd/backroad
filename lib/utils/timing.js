module.exports = {
  /**
   * Timeout promise.
   *
   * This allows us to change timeouts together
   * with a promise.
   *
   * @param {Number} delay      Time delay in milliseconds.
   * @param {Mixed}  dataToPass Data to pass along the chain.
   */
  timeoutPromise: function(delay, dataToPass) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(dataToPass);
      }, delay);
    });
  }
};
