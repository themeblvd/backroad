import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/**
 * Admin Route
 *
 * Restricts access to routes that careful
 * only accessible by and admin-level user.
 *
 * NOTE: A non-logged user will never get
 * to this component; so only a check for
 * the role of current user is needed.
 *
 * @return {Component}
 */
const AdminRoute = props => {
  const { isAdmin, path, component } = props;
  return isAdmin ? <Route path={path} component={component} /> : <Redirect to="/404" />;
};

export default connect(state => ({ isAdmin: state.auth.role === 'admin' }))(AdminRoute);
