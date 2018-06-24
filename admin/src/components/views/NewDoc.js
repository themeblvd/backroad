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
    <div className="new-doc-view">
      <div className="wrap">
        <h1 className="view-title">{title}</h1>
        <Form type={type} slug="new" render={props => <DocForm {...props} />} />
      </div>
    </div>
  );
};

export default withRouter(NewDoc);
