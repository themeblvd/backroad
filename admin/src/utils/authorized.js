import axios from 'axios';

/**
 * Create authorized axios instance.
 *
 * This allows us to pass around a single
 * instance of axios, which has the logged-in
 * user's authentication token in the header.
 *
 * @return {Object} Axios instance.
 */
function authorized() {
  const authorized = axios.create();

  authorized.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return authorized;
}

export default authorized();
