import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { singularTitle } from '../../utils/data';
import Form from '../forms/Form';
import UserForm from '../forms/UserForm';

class EditUser extends Component {
  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    const { username } = this.props.match.params;

    return (
      <div className="edit-document-view">
        <h1 className="view-title">Edit {singularTitle('users')}</h1>
        <Form type="users" slug={username} render={props => <UserForm {...props} />} />
      </div>
    );
  }
}

export default withRouter(EditUser);
