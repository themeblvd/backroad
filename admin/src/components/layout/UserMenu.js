import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoutLink from '../elements/LogoutLink';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faSignOutAlt from '@fortawesome/fontawesome-free-solid/faSignOutAlt';

/**
 * User Menu Component
 *
 * This is a hidden menu of user options,
 * which needs to be toggled into view.
 *
 * @return {Component}
 */
class UserMenu extends Component {
  /**
   * Closes user menu, if any item is clicked.
   */
  closeUserMenu = event => {
    document.body.classList.remove('user-menu-on');
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    return (
      <div className="app-user-menu">
        <ul>
          <li>
            <Link to={`/users/${this.props.username}`} onClick={this.closeUserMenu}>
              <FontAwesomeIcon icon={faUser} />Edit Profile
            </Link>
          </li>
          <li>
            <LogoutLink closeUserMenu={this.closeUserMenu}>
              <FontAwesomeIcon icon={faSignOutAlt} />Log Out
            </LogoutLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(state => ({ username: state.auth.username }))(UserMenu);
