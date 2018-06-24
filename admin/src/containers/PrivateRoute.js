import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/**
 * Private Route
 *
 * This is a wrapper for <Route /> that
 * restricts access to logged-in users.
 *
 * @return {Component}
 */
const PrivateRoute = props => {
  const { isAuthenticated, path, component } = props;
  return isAuthenticated ? <Route path={path} component={component} /> : <Redirect to="/login" />;
};

export default connect(state => state.auth)(PrivateRoute);
