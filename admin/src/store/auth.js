import axios from 'axios';

const authorizedAxios = axios.create();

authorizedAxios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Intial State

const initialState = {
  username: '',
  role: '',
  firstName: '',
  lastName: '',
  isAuthenticated: false,
  authErrCode: {
    register: '',
    login: ''
  },
  isLoading: true
};

// Action Types

const AUTHENTICATE = 'AUTHENTICATE';

const AUTH_ERROR = 'AUTH_ERROR';

const START_LOADING = 'START_LOADING';

const STOP_LOADING = 'STOP_LOADING';

const LOGOUT = 'LOGOUT';

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        ...action.user,
        isAuthenticated: true,
        authErrCode: initialState.authErrCode,
        isLoading: false
      };

    case AUTH_ERROR:
      return {
        ...state,
        authErrCode: {
          ...state.authErrCode,
          [action.key]: action.errCode
        },
        isLoading: false
      };

    case START_LOADING:
      return {
        ...initialState,
        isLoading: false
      };

    case LOGOUT:
    case STOP_LOADING:
      return {
        ...initialState,
        isLoading: false
      };

    default:
      return state;
  }
}

// Actions

function authError(key, errCode) {
  return {
    type: AUTH_ERROR,
    key,
    errCode
  };
}

function authenticate(user) {
  return {
    type: AUTHENTICATE,
    user // pass the user for storage in Redux store
  };
}

export function verify() {
  return dispatch => {
    if (!localStorage.token) {
      dispatch({
        type: STOP_LOADING
      });
      return;
    }

    authorizedAxios
      .get('/api/v1/auth/verify')
      .then(response => {
        const { user } = response.data;
        dispatch(authenticate(user));
      })
      .catch(err => {
        dispatch(authError('verify', err.response.status));
      });
  };
}

/* @TODO
export function register(userInfo) {
  return dispatch => {
    return axios
      .post('/api/v1/users', userInfo)
      .then(response => {
        const { token, user } = response.data;
        localStorage.token = token;
        localStorage.user = JSON.stringify(user);
        dispatch(authenticate(user));
      })
      .catch(err => {
        dispatch(authError('register', err.response.status));
      });
  };
}
*/

export function login(credentials) {
  return dispatch => {
    return axios
      .post('/api/v1/auth/login', credentials)
      .then(response => {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        dispatch(authenticate(user));
      })
      .catch(err => {
        dispatch(authError('login', err.response.status));
      });
  };
}

export function logout() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT
  };
}
