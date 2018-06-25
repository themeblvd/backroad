import React from 'react';

/**
 * Checkbox Group
 *
 * @param  {Object}    props             Component props.
 * @param  {String}    props.value       Current value.
 * @param  {Function}  props.onChange    Handle input state change.
 * @param  {String}    props.title       Optional. Title above input.
 * @param  {String}    props.name        Name attribute for input.
 * @param  {Array}     props.options     Options to choose from.
 * @param  {String}    props.placeholder Optional. Field placeholder text.
 * @param  {String}    props.help,       Optional. Help text below input.
 * @param  {Boolean}   props.hasError    Whether currently has error.
 * @return {Component}
 */
const RadioGroup = props => {
  const { value, onChange, title, name, options, help, hasError } = props;

  return (
    <fieldset className={hasError && 'field-error'}>
      {title && <legend>{title}</legend>}
      <ul className="radio-group">
        {options.map(option => {
          return (
            <li key={option}>
              <input
                type="radio"
                checked={value.includes(option)}
                name={name}
                value={option}
                onChange={onChange}
              />
              <label className="radio-label">{option}</label>
            </li>
          );
        })}
      </ul>
      {help && <span className="help-text">{help}</span>}
    </fieldset>
  );
};

export default RadioGroup;
