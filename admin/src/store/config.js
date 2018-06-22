import authorized from '../utils/authorized.js';

// Intial State

const initialState = {
  docTypes: [],
  optionGroups: []
};

// Action Types

const LOAD_CONFIG = 'LOAD_CONFIG';

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONFIG:
      return { ...action.config };

    default:
      return state;
  }
}

// Actions

export function loadConfig() {
  return dispatch => {
    authorized
      .get('/api/v1/config')
      .then(response => {
        dispatch({
          type: LOAD_CONFIG,
          config: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
