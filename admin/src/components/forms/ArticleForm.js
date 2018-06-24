import React from 'react';
import { singularTitle } from '../../utils/data';
import Alert from '../elements/Alert';
import Button from '../elements/Button';

function ArticleForm(props) {
  const { context, type, handleSubmit, handleChange, inputs, isSubmitting, errorOnSubmit } = props;
  const btnText =
    context === 'new' ? 'Add New ' + singularTitle(type) : 'Update ' + singularTitle(type);

  return (
    <form onSubmit={handleSubmit}>
      <p>Use {'<Fields />'} here...</p>
      {errorOnSubmit && <Alert text={errorOnSubmit} status="danger" />}
      <Button isPrimary isLoading={props.isSubmitting}>
        {btnText}
      </Button>
    </form>
  );
}

export default ArticleForm;
