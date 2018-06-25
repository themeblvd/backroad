import React from 'react';
import { singularTitle, getContentType } from '../../utils/data';
import Fields from '../fields/Fields';
import Input from '../fields/Input';
import Alert from '../elements/Alert';
import Button from '../elements/Button';

const ArticleForm = props => {
  const {
    context,
    type,
    handleSubmit,
    handleChange,
    title,
    inputs,
    isSubmitting,
    errorOnSubmit
  } = props;
  const { fields } = getContentType(type);
  const btnText =
    context === 'new' ? 'Add New ' + singularTitle(type) : 'Update ' + singularTitle(type);

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errorOnSubmit && <Alert text={errorOnSubmit} status="danger" />}
      <div className="title-field">
        <Input
          value={title}
          onChange={handleChange}
          name="title"
          placeholder="Enter Title"
          isRequired={true}
          className="field-xxxl"
        />
      </div>
      <Fields fields={fields} values={inputs} handleChange={handleChange} />
      {errorOnSubmit && <Alert text={errorOnSubmit} status="danger" />}
      <Button isPrimary isLoading={props.isSubmitting}>
        {btnText}
      </Button>
    </form>
  );
};

export default ArticleForm;
