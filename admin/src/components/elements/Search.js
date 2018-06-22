import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import classNames from 'classnames';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }
  handleFocus = () => {
    this.setState({ active: true });
  };
  handleBlur = () => {
    this.setState({ active: false });
  };
  render() {
    const className = classNames({
      'app-search': true,
      'field-icon': true,
      'field-icon-sm': true,
      active: this.state.active
    });
    return (
      <div className={className} onFocus={this.handleFocus} onBlur={this.handleBlur}>
        <FontAwesomeIcon icon={faSearch} />
        <input className="field-sm" type="search" placeholder="Search..." />
      </div>
    );
  }
}

export default Search;
