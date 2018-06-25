import React, { Component } from 'react';

// Routing
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import PrivateRoute from './containers/PrivateRoute';

// Store
import { connect } from 'react-redux';
import { verify } from './store/auth';
import { loadConfig } from './store/config';

// Components
import Notice from './components/elements/Notice';
import Admin from './containers/Admin';
import Login from './containers/Login';

class App extends Component {
  /**
   * When component mounts, determine if
   * user is logged-in and if that token
   * is still valid.
   */
  componentDidMount() {
    this.props.verify();
    this.props.loadConfig();
  }

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    const { isLoading, hasNotice } = this.props;
    return (
      <div className="backroad-admin">
        {isLoading ? (
          <p className="hide">Loading...</p>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/" component={Admin} />
          </Switch>
        )}
        {hasNotice && <Notice />}
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({ isLoading: state.auth.isLoading, hasNotice: state.notice.hasNotice }),
    { verify, loadConfig }
  )(App)
);
