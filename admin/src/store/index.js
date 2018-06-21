import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import auth from './auth';
import notice from './notice';

const reducer = combineReducers({
  auth,
  notice
});

var store;

if (process.env.NODE_ENV === 'development') {
  store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
} else {
  store = createStore(reducer, applyMiddleware(thunk));
}

export default store;
