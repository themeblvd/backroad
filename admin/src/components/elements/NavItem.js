import React from 'react';
import { Link } from 'react-router-dom';
import { singularTitle, pluralTitle, getPathBase, getPathItem } from '../../utils/data';

/**
 * Navigation Item
 *
 * @param {Object} props             Component properties.
 * @param {String} props.endpoint    Base URL endpoint of item, like `pages`.
 * @param {String} props.currentPath Current pathname from React router.
 * @return {Component}
 */
const NavItem = props => {
  const { endpoint, currentPath } = props;
  const base = getPathBase(currentPath);
  const item = getPathItem(currentPath);

  return (
    <li className={base === endpoint ? 'active-item' : ''}>
      <Link to={`/${endpoint}`}>{pluralTitle(endpoint)}</Link>
      <ul className="child-menu">
        <li className={base === endpoint && !item ? 'active-child' : ''}>
          <Link to={`/${endpoint}`}>Manage {pluralTitle(endpoint)}</Link>
        </li>
        <li className={base === endpoint && item === 'new' ? 'active-child' : ''}>
          <Link to={`/${endpoint}/new`}>New {singularTitle(endpoint)}</Link>
        </li>
      </ul>
    </li>
  );
};

export default NavItem;
