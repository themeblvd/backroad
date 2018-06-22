import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown';
import Logo from '../elements/Logo';
import Search from '../elements/Search';

class Header extends Component {
  /**
   * Toggle the user menu.
   */
  toggleUserMenu = event => {
    event.preventDefault();
    document.body.classList.toggle('user-menu-on');
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    const { username, avatar } = this.props;

    return (
      <div className="app-header">
        <div className="app-logo">
          <Logo />
          <span>{'0.1.0'}</span>
        </div>
        <Search />
        <a href="#user-menu" className="user-menu-trigger" onClick={this.toggleUserMenu}>
          <FontAwesomeIcon icon={faChevronDown} />
          <img src={avatar} alt={`Avatar for ${username}`} />
        </a>
      </div>
    );
  }
}

export default connect(state => ({ ...state.auth }))(Header);
