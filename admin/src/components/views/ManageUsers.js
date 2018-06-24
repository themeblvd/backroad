import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { singularTitle } from '../../utils/data';
import Table from '../tables/Table';
import UsersTable from '../tables/UsersTable';

/**
 * Manage Users
 *
 * @return {Component}
 */
const ManageUsers = props => {
  return (
    <div className="manage-users-view">
      <div className="wrap">
        <Table type="users" render={props => <UsersTable {...props} />} />
      </div>
    </div>
  );
};

export default ManageUsers;
