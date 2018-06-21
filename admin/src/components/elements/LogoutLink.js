import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/auth';

class LogoutLink extends Component {
  handleClick = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const { children } = this.props;
    return (
      <a href="#logout" onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

export default connect(
  null,
  { logout }
)(LogoutLink);
