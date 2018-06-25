import React from 'react';

/**
 * Select Menu
 *
 * @param  {Object}   props             Component props.
 * @param  {String}   props.value       Current value.
 * @param  {Function} props.onChange    Handle input state change.
 * @param  {String}   props.title       Optional. Title above input.
 * @param  {String}   props.name        Name attribute for input.
 * @param  {Array}    props.options     Options to choose from.
 * @param  {String}   props.placeholder Optional. Field placeholder text.
 * @param  {String}   props.help,       Optional. Help text below input.
 * @param  {Boolean}  props.hasError    Whether currently has error.
 * @param  {String}   props.className   Optional. CSS class(es).
 * @return {Component}
 */
const SelectMenu = props => {
  const { value, onChange, title, name, options, help, hasError, className } = props;

  return (
    <p className={hasError && 'field-error'}>
      {title && <label>{title}</label>}
      <select name={name} onChange={onChange} value={value} className={className}>
        {options.map(option => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      {help && <span className="help-text">{help}</span>}
    </p>
  );
};

export default SelectMenu;
