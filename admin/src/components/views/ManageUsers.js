import React, { Component } from 'react';
import ManageTable from '../tables/ManageTable';
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
        <ManageTable type="users" render={props => <UsersTable {...props} />} />
      </div>
    </div>
  );
};

export default ManageUsers;
