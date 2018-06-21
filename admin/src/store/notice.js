// Intial State
const initialState = {
  hasNotice: false,
  message: '',
  type: ''
};

// Action Types

const ADD_NOTICE = 'ADD_NOTICE';

const REMOVE_NOTICE = 'REMOVE_NOTICE';

// Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTICE:
      return {
        hasNotice: true,
        message: action.noticeMessage,
        type: action.noticeType
      };

    case REMOVE_NOTICE:
      return initialState;

    default:
      return state;
  }
}

// Actions

export function addNotice(noticeMessage, noticeType) {
  return {
    type: ADD_NOTICE,
    noticeMessage,
    noticeType
  };
}

export function removeNotice() {
  return {
    type: REMOVE_NOTICE
  };
}
