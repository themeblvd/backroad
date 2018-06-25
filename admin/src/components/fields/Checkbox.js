import React from 'react';

/**
 * Single Checkbox
 *
 * @param  {Object}    props             Component props.
 * @param  {String}    props.value       Current value.
 * @param  {Function}  props.onChange    Handle input state change.
 * @param  {String}    props.title       Optional. Title above input.
 * @param  {String}    props.name        Name attribute for input.
 * @param  {String}    props.help,       Optional. Help text below input.
 * @param  {Boolean}   props.hasError    Whether currently has error.
 * @return {Component}
 */
const Checkbox = props => {
  const { value, onChange, title, name, help, hasError } = props;

  return (
    <p className={hasError && 'field-error'}>
      {title && <label>{title}</label>}
      <input checked={value} type="checkbox" name={name} onChange={onChange} />
      {help && <label className="checkbox-label">{help}</label>}
    </p>
  );
};

export default Checkbox;
