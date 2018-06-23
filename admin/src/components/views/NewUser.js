import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { singularTitle } from '../../utils/data';
import Form from '../forms/Form';
import UserForm from '../forms/UserForm';

class newUser extends Component {
  render() {
    return (
      <div className="edit-document-view">
        <h1 className="view-title">New {singularTitle('users')}</h1>
        <Form type="users" slug="new" render={props => <UserForm {...props} />} />
      </div>
    );
  }
}

export default newUser;
