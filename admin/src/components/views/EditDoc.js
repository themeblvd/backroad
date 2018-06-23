import React from 'react';
import { withRouter } from 'react-router-dom';
import { isValidContentType, singularTitle } from '../../utils/data';
import NotFound from './NotFound';
import Form from '../forms/Form';
import DocForm from '../forms/DocForm';

/**
 * Edit a document (of any content type).
 *
 * @return {Component}
 */
const EditDoc = props => {
  const { type, slug } = props.match.params;

  if (!isValidContentType(type)) {
    return <NotFound />;
  }

  return (
    <div className="edit-document-view">
      <h1 className="view-title">Edit {singularTitle(type)}</h1>
      <Form type={type} slug={slug} render={props => <DocForm {...props} />} />
    </div>
  );
};

export default withRouter(EditDoc);
