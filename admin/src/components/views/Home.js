import React from 'react';
import { connect } from 'react-redux';
import RecentContentTable from '../tables/RecentContentTable';

const Home = props => {
  const { first_name, username } = props;

  return (
    <div className="home-view">
      <div className="wrap">
        <header className="home-top">
          <h1>Welcome, {first_name ? first_name : username}.</h1>
        </header>
        <RecentContentTable />
      </div>
    </div>
  );
};

export default connect(state => ({ ...state.auth }))(Home);
