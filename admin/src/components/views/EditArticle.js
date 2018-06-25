import React from 'react';
import { withRouter } from 'react-router-dom';
import { isValidContentType, singularTitle } from '../../utils/data';
import BackButton from '../elements/BackButton';
import NotFound from './NotFound';
import EditForm from '../forms/EditForm';
import ArticleForm from '../forms/ArticleForm';

/**
 * Edit a document (of any content type).
 *
 * @return {Component}
 */
const EditArticle = props => {
  const { type, slug } = props.match.params;

  if (!isValidContentType(type)) {
    return <NotFound />;
  }

  return (
    <div className="edit-article-view">
      <div className="wrap">
        <h1 className="view-title">Edit {singularTitle(type)}</h1>
        <BackButton to={`/${type}`} />
        <EditForm type={type} slug={slug} render={props => <ArticleForm {...props} />} />
      </div>
    </div>
  );
};

export default withRouter(EditArticle);
