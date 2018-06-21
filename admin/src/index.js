import React from 'react';
import ReactDOM from 'react-dom';

// Routing
import { BrowserRouter } from 'react-router-dom';

// Store
import { Provider } from 'react-redux';
import store from './store';

// Application
import './assets/scss/admin.scss';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/admin">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
