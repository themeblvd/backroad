import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLongArrowAltLeft from '@fortawesome/fontawesome-free-solid/faLongArrowAltLeft';

/**
 * Back Button
 *
 * Displayed when editing or adding users
 * and documents, to go back to the respective
 * management table.
 *
 * @param  {Object}    props    Component props.
 * @param  {Function}  props.to Where to redirect.
 * @return {Component}
 */
const BackButton = props => {
  const { to } = props;

  return (
    <Link to={to} className="btn btn-xs btn-default btn-back">
      <FontAwesomeIcon icon={faLongArrowAltLeft} className="icon" />
      Back
    </Link>
  );
};

export default BackButton;
