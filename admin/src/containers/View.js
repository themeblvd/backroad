import React from 'react';
// import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import Users from '../components/views/Users';
import Home from '../components/views/Home';
import Footer from '../components/layout/Footer';

const View = () => {
  return (
    <div className="app-view">
      <div className="wrap">
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      {/*<Footer /> @TODO*/}
    </div>
  );
};

export default View;
