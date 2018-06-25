import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getConfig } from '../../utils/data';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTachometerAlt from '@fortawesome/fontawesome-free-solid/faTachometerAlt';
import faFileAlt from '@fortawesome/fontawesome-free-solid/faFileAlt';
import faCog from '@fortawesome/fontawesome-free-solid/faCog';
import NavItem from './NavItem';

/**
 * Primary Navigation.
 *
 * @param {Object} props          Component properties.
 * @param {String} props.location Location from React router.
 * @return {Component}
 */
const PrimaryNav = props => {
  const { location, isAdmin } = props;
  const contentTypes = getConfig('contentTypes');

  return (
    <div className="app-nav">
      <span className="nav-title heading-sm">
        <FontAwesomeIcon icon={faTachometerAlt} className="icon" />Dashboard
      </span>
      <ul>
        <NavItem text="Home" endpoint="" currentPath={location.pathname} />
      </ul>
      {contentTypes && (
        <React.Fragment>
          <span className="nav-title heading-sm">
            <FontAwesomeIcon icon={faFileAlt} className="icon" />Content
          </span>
          <ul>
            {contentTypes.map(type => (
              <NavItem
                key={type.endpoint}
                endpoint={type.endpoint}
                currentPath={location.pathname}
                hasChildren
              />
            ))}
          </ul>
        </React.Fragment>
      )}
      <span className="nav-title heading-sm">
        <FontAwesomeIcon icon={faCog} className="icon" />Configure
      </span>
      <ul>
        {isAdmin && <NavItem endpoint="users" currentPath={location.pathname} hasChildren />}
        <NavItem text="Settings" endpoint="settings" currentPath={location.pathname} />
      </ul>
    </div>
  );
};

export default withRouter(connect(state => ({ isAdmin: state.auth.role === 'admin' }))(PrimaryNav));
