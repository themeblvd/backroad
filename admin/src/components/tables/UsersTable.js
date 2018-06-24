import React from 'react';
import UserRow from './UserRow';

/**
 * Users Table
 *
 * @return {Component}
 */
const UsersTable = props => {
  const { items } = props;

  return (
    <table>
      <thead>
        <tr>
          <th width="26%">Username</th>
          <th width="26%">Name</th>
          <th width="26%">Email</th>
          <th width="11%">Role</th>
          <th width="11%">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <UserRow
            key={item._id}
            id={item._id}
            username={item.username}
            firstName={item.first_name}
            lastName={item.last_name}
            email={item.email}
            role={item.role}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
