import React from 'react';

const NotFound = () => {
  return (
    <div className="not-found-view">
      <div className="wrap">
        <h1 className="view-title">Page Not Found</h1>
        <p className="lead">
          {"Oops! The page you're trying to reach doesn't exist. How embarrassing."}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
