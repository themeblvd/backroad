import React from 'react';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import AdminRoute from './AdminRoute';
import Home from '../components/views/Home';
import NewUser from '../components/views/NewUser';
import EditUser from '../components/views/EditUser';
import ManageUsers from '../components/views/ManageUsers';
import NewDoc from '../components/views/NewDoc';
import EditDoc from '../components/views/EditDoc';
import NotFound from '../components/views/NotFound';
import Footer from '../components/layout/Footer';

/**
 * Handles routing and the current view.
 *
 * @return {Component}
 */
const View = props => {
  const { currentUser } = props;

  return (
    <div className="app-view">
      <div className="wrap">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path={`/users/${currentUser}`} component={EditUser} />
          <AdminRoute path="/users/new" component={NewUser} />
          <AdminRoute path="/users/:username" component={EditUser} />
          <AdminRoute path="/users" component={ManageUsers} />
          <Route path="/:type/new" component={NewDoc} />
          <Route path="/:type/:slug" component={EditDoc} />
          <Route path="/404" component={NotFound} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
      {/*<Footer /> @TODO*/}
    </div>
  );
};

export default withRouter(connect(state => ({ currentUser: state.auth.username }))(View));
