import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { singularTitle, getPathBase } from '../../utils/data';
import BackButton from '../elements/BackButton';
import EditForm from '../forms/EditForm';
import ArticleForm from '../forms/ArticleForm';

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
    <div className="new-article-view">
      <div className="wrap">
        <h1 className="view-title">{title}</h1>
        <BackButton to={`/${type}`} />
        <EditForm type={type} slug="new" render={props => <ArticleForm {...props} />} />
      </div>
    </div>
  );
};

export default withRouter(NewDoc);
