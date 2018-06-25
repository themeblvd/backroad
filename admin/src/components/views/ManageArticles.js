import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getPathBase } from '../../utils/data';
import Table from '../tables/Table';
import ArticlesTable from '../tables/ArticlesTable';

/**
 * Manage Articles
 *
 * @return {Component}
 */
const ManageArticles = props => {
  const { location } = props;

  return (
    <div className="manage-articles-view">
      <div className="wrap">
        <Table
          type={getPathBase(location.pathname)}
          render={props => <ArticlesTable {...props} />}
        />
      </div>
    </div>
  );
};

export default withRouter(ManageArticles);
