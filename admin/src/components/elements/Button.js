import React from 'react';
import classNames from 'classnames';

/**
 * Button
 *
 * @param  {Object}    props           Component props.
 * @param  {String}    props.size      Optioonal button size, like `xs`, `sm`, `lg`, `xl`, `xxl`, or `xxxl`.
 * @param  {Boolean}   props.isLoading Whether button has loading animation state.
 * @param  {Boolean}   props.isPrimary Whether button has primary styling.
 * @param  {Function}  props.onClick   Button click handler.
 * @return {Component}
 */
const Button = props => {
  const { size, isLoading, isPrimary, onClick, children } = props;

  const classes = classNames({
    btn: true,
    'btn-xs': size === 'xs',
    'btn-sm': size === 'sm',
    'btn-lg': size === 'lg',
    'btn-xl': size === 'xl',
    'btn-xxl': size === 'xxl',
    'btn-xxxl': size === 'xxxl',
    'has-loader': true,
    'btn-primary': isPrimary,
    loading: isLoading
  });

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
