import React from 'react';

/**
 * Textarea
 *
 * @param  {Object}    props             Component props.
 * @param  {String}    props.value       Current value.
 * @param  {Function}  props.onChange    Handle input state change.
 * @param  {String}    props.title       Optional. Title above input.
 * @param  {String}    props.name        Name attribute for input.
 * @param  {String}    props.placeholder Optional. Field placeholder text.
 * @param  {String}    props.help,       Optional. Help text below input.
 * @param  {Boolean}   props.hasError    Whether currently has error.
 * @param  {Boolean}   props.isRequired  Whether field is required.
 * @return {Component}
 */
const TextArea = props => {
  const { value, onChange, title, name, placeholder, help, hasError, isRequired } = props;

  return (
    <p className={hasError && 'field-error'}>
      {title && (
        <label>
          {title}
          {isRequired && <span className="required">*</span>}
        </label>
      )}
      <textarea
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        required={isRequired}
        rows="10"
      />
      {help && <span className="help-text">{help}</span>}
    </p>
  );
};

export default TextArea;
