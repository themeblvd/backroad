import React from 'react';
import { Switch, Route } from 'react-router';
import Home from '../components/views/Home';
import NewUser from '../components/views/NewUser';
import EditUser from '../components/views/EditUser';
import NotFound from '../components/views/NotFound';
import Footer from '../components/layout/Footer';

const View = () => {
  return (
    <div className="app-view">
      <div className="wrap">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users/new" component={NewUser} />
          <Route path="/users/:username" component={EditUser} />
          <Route path="/" component={NotFound} />
        </Switch>
      </div>
      {/*<Footer /> @TODO*/}
    </div>
  );
};

export default View;
