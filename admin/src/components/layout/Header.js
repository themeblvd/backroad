import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown';
import Logo from '../elements/Logo';

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
        <div className="app-search field-icon field-icon-sm">
          <FontAwesomeIcon icon={faSearch} />
          <input className="field-sm" type="search" placeholder="Search..." />
        </div>
        <a href="#user-menu" className="user-menu-trigger" onClick={this.toggleUserMenu}>
          <FontAwesomeIcon icon={faChevronDown} />
          <img src={avatar} alt={`Avatar for ${username}`} />
        </a>
      </div>
    );
  }
}

export default connect(state => ({ ...state.auth }))(Header);
