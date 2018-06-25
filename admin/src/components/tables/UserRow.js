import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNotice } from '../../store/notice';
import { apiUrl } from '../../utils/data';
import authorized from '../../utils/authorized';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import faUserEdit from '@fortawesome/fontawesome-free-solid/faUserEdit';

/**
 * Single user entry row for the users
 * table.
 *
 * @param {Object} props           Component properties.
 * @param {String} props.id        User ID, needed for deletion.
 * @param {String} props.username  Username.
 * @param {String} props.firstName First name.
 * @param {String} props.lastName  Last name.
 * @param {String} props.email     Email address.
 * @param {String} props.role      User role, `admin` or `editor`.
 */
class UserRow extends Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = { isDeleted: false };
  }

  /**
   * Delete user.
   *
   * @TODO Confirmation prompt!!!
   */
  handleDelete = event => {
    event.preventDefault();

    const { id, addNotice } = this.props;

    authorized
      .delete(apiUrl('delete', 'users', id))
      .then(response => {
        this.setState({ isDeleted: true });
        addNotice('User deleted!', 'success');
      })
      .catch(err => {
        const message = err.response.data.message
          ? err.response.data.message
          : 'User could not be deleted.';
        addNotice(message, 'error');
      });
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    const { isDeleted } = this.state;
    const { username, firstName, lastName, email, role } = this.props;

    if (isDeleted) {
      return null;
    }

    var name = '\u2014';

    if (firstName && lastName) {
      name = firstName + ' ' + lastName;
    } else if (firstName) {
      name = firstName;
    } else if (lastName) {
      name = lastName;
    }

    return (
      <tr>
        <td>
          <Link to={`/users/${username}`} title={`Edit ${username}`}>
            {username}
          </Link>
        </td>
        <td>{name}</td>
        <td>{email}</td>
        <td>
          <span className={`role-label label-inline ${role}`}>{role}</span>
        </td>
        <td>
          <ul className="actions-menu list-unstyled">
            <li>
              <Link to={`/users/${username}`} className="edit-item" title={`Edit ${username}`}>
                <FontAwesomeIcon icon={faUserEdit} />
              </Link>
            </li>
            <li>
              <a title={`Delete ${username}`} className="delete-item" onClick={this.handleDelete}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </a>
            </li>
          </ul>
        </td>
      </tr>
    );
  }
}

export default connect(
  null,
  { addNotice }
)(UserRow);
