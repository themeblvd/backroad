import React, { Component } from 'react';
import authorized from '../../utils/authorized';
import { Link } from 'react-router-dom';
import {
  getConfig,
  contentTypeEndpoint,
  singularTitle,
  pluralTitle,
  timestamp,
  apiUrl
} from '../../utils/data';
import Alert from '../elements/Alert';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';

/**
 * Table of recent articles across all
 * content types.
 */
class RecentContentTable extends Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: '',
      articles: []
    };
  }

  /**
   * Fetch article data from API, when
   * component mounts.
   */
  componentDidMount() {
    authorized
      .get(apiUrl() + '?per_page=10')
      .then(response => {
        this.setState({
          isLoading: false,
          articles: response.data
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false,
          error: "An error occurred. Couldn't fetch recent content."
        });
      });
  }

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    const { error } = this.state;

    if (error) {
      return <Alert text={error} status="danger" />;
    }

    const { articles } = this.state;

    const types = getConfig('contentTypes');

    return (
      <div className="recent-content-table">
        <div className="table-title">
          <h2>Recent Content</h2>
          {types &&
            types.map(type => {
              return (
                <Link key={type.id} to={`/${type.endpoint}`} className="btn btn-default btn-xs">
                  {type.pluralName}
                </Link>
              );
            })}
          {/*<span className="stats">{types.length} Content Types</span>*/}
        </div>
        <div className="table-container">
          {articles.length ? (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th width="17%">Created</th>
                    <th width="17%">Author</th>
                    <th width="17%">Type</th>
                    <th width="8%">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map(article => {
                    const endpoint = contentTypeEndpoint(article.content_type);
                    const singular = singularTitle(endpoint);
                    const plural = pluralTitle(endpoint);
                    const time = timestamp(article.created_at);
                    return (
                      <tr key={article._id}>
                        <td>{article.title}</td>
                        <td>{time}</td>
                        <td>{article.created_by}</td>
                        <td>{singular}</td>
                        <td>
                          <ul className="actions-menu list-unstyled">
                            <li>
                              <Link
                                to={`/${endpoint}/${article.slug}`}
                                className="edit-item"
                                title={`Edit ${article.title}`}
                              >
                                <FontAwesomeIcon icon={faPencilAlt} />
                              </Link>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-articles">{"You haven't created any articles yet."}</p>
          )}
        </div>
      </div>
    );
  }
}

export default RecentContentTable;
