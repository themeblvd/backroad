import React from 'react';
import Input from '../fields/Input';
import TextArea from '../fields/TextArea';
import SelectMenu from '../fields/SelectMenu';
import Checkbox from '../fields/Checkbox';
import RadioGroup from '../fields/RadioGroup';

/**
 * Render set of form fields.
 *
 * @param  {Object}   props              Component props.
 * @param  {Object}   props.fields       Fields to display.
 * @param  {Object}   props.values       Field values to match to.
 * @param  {Function} props.handleChange Single function to handle all field changes.
 * @return {Component}
 */
const Fields = props => {
  const { fields, values, handleChange } = props;

  return fields.map(field => {
    switch (field.type) {
      case 'radio':
        return (
          <RadioGroup
            key={field.id}
            value={values[field.id]}
            onChange={handleChange}
            options={field.options}
            title={field.name}
            name={field.id}
            help={field.desc}
          />
        );
      case 'select':
        return (
          <SelectMenu
            key={field.id}
            value={values[field.id]}
            onChange={handleChange}
            options={field.options}
            title={field.name}
            name={field.id}
            help={field.desc}
            isRequired={field.required ? true : false}
          />
        );
      case 'checkbox':
        return (
          <Checkbox
            key={field.id}
            value={values[field.id]}
            onChange={handleChange}
            title={field.name}
            name={field.id}
            help={field.desc}
          />
        );
      case 'textarea':
        return (
          <TextArea
            key={field.id}
            value={values[field.id]}
            onChange={handleChange}
            title={field.name}
            name={field.id}
            placeholder={field.placeholder}
            help={field.desc}
            isRequired={field.required ? true : false}
          />
        );
      default:
        return (
          <Input
            key={field.id}
            value={values[field.id]}
            onChange={handleChange}
            title={field.name}
            name={field.id}
            placeholder={field.placeholder}
            help={field.desc}
            isRequired={field.required ? true : false}
          />
        );
    }
  });
};

export default Fields;
