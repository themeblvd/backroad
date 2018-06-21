import React from 'react';

/**
 * Alert
 *
 * This is for displaying messages within
 * components like forms, not to be confused
 * with the "Notice" component which is for
 * top-level application notices.
 *
 * @param  {Object}    props        Component props.
 * @param  {String}    props.status Status, `sucess`, `info`, `warning`, or `danger`
 * @param  {String}    props.title  Optional. Heading for alert.
 * @param  {String}    props.text   Content of alert.
 * @return {Component}
 */
const Alert = props => {
  const { status, title, text } = props;

  return (
    <div className={`alert alert-${status}`}>
      <p>
        {title && <strong>{title + ' '}</strong>}
        {text}
      </p>
    </div>
  );
};

export default Alert;
