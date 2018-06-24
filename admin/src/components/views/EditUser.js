import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { singularTitle } from '../../utils/data';
import Form from '../forms/Form';
import BackButton from '../elements/BackButton';
import UserForm from '../forms/UserForm';

/**
 * Edit a user.
 *
 * @return {Component}
 */
const EditUser = props => {
  const username = props.match.params.username ? props.match.params.username : props.currentUser;

  return (
    <div className="edit-user-view">
      <div className="wrap">
        <h1 className="view-title">Edit {singularTitle('users')}</h1>
        <BackButton to="/users" />
        <Form type="users" slug={username} render={props => <UserForm {...props} />} />
      </div>
    </div>
  );
};

export default withRouter(connect(state => ({ currentUser: state.auth.username }))(EditUser));
