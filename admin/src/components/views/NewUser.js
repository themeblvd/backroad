import React, { Component } from 'react';
import { singularTitle } from '../../utils/data';
import BackButton from '../elements/BackButton';
import EditForm from '../forms/EditForm';
import UserForm from '../forms/UserForm';

/**
 * Add a new user.
 *
 * @return {Component}
 */
const newUser = props => {
  return (
    <div className="new-user-view">
      <div className="wrap">
        <h1 className="view-title">New {singularTitle('users')}</h1>
        <BackButton to="/users" />
        <EditForm type="users" slug="new" render={props => <UserForm {...props} />} />
      </div>
    </div>
  );
};

export default newUser;
