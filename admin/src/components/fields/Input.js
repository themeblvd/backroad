import React from 'react';

/**
 * Text input field.
 *
 * @param  {Object}    props             Component props.
 * @param  {Function}  props.onChange    Handle input state change.
 * @param  {String}    props.title       Optional. Title above input.
 * @param  {String}    props.name        Name attribute for input.
 * @param  {String}    props.type        Type attribute for input, defaults to "text".
 * @param  {String}    props.placeholder Optional. Field placeholder text.
 * @param  {String}    props.help,       Optional. Help text below input.
 * @param  {Boolean}   props.hasError    Whether currently has error.
 * @return {Component}
 */
const Input = props => {
  const { onChange, title, name, type, placeholder, help, hasError, isRequired } = props;

  return (
    <p className={hasError && 'field-error'}>
      {title && (
        <label>
          {title}
          {isRequired && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type ? type : 'text'}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        required={isRequired}
      />
      {help && <span className="help-text">{help}</span>}
    </p>
  );
};

export default Input;
