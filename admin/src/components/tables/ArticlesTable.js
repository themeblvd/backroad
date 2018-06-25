import React from 'react';
import ArticleRow from './ArticleRow';

/**
 * Users Table
 *
 * @return {Component}
 */
const ArticlesTable = props => {
  const { items, type } = props;

  return (
    <table>
      <thead>
        <tr>
          <th width="50%">Title</th>
          <th width="20%">Created</th>
          <th width="20%">Created By</th>
          <th width="10%">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <ArticleRow
            key={item._id}
            id={item._id}
            type={type}
            title={item.title}
            createdAt={item.created_at}
            createdBy={item.created_by}
            slug={item.slug}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ArticlesTable;
