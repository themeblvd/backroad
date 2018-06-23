/**
 * Get Backroad configuration.
 */
export function getConfig(part) {
  const backroad = window.backroad;
  if (part) return backroad[part];
  return backroad;
}

/**
 * Get initial inputs for editing
 * a user.
 */
export function getUserInputs() {
  return {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirm: ''
  };
}

/**
 * Sanitize user to save.
 */
export function cleanUserData(data) {
  const { first_name, last_name, email, password, password_confirm } = data;

  if (!email) {
    return 'You must have an email address.';
  }

  if (password && password !== password_confirm) {
    return 'Both password fields must match when creating a new password.';
  }

  const clean = { first_name, last_name, email }; // @TODO validate email

  if (password) {
    clean.password = password;
  }

  return clean;
}
