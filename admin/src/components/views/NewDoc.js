import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { singularTitle, getPathBase } from '../../utils/data';
import Form from '../forms/Form';
import DocForm from '../forms/DocForm';

/**
 * Add a new document (of any content
 * type).
 *
 * @return {Component}
 */
const NewDoc = props => {
  const { type } = props.match.params;
  const title = 'New ' + singularTitle(type);
  return (
    <div className="edit-document-view">
      <h1 className="view-title">{title}</h1>
      <Form type={type} slug="new" render={props => <DocForm {...props} />} />
    </div>
  );
};

export default withRouter(NewDoc);
