import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNotice } from '../../store/notice';
import { pluralTitle, singularTitle, apiUrl } from '../../utils/data';
import authorized from '../../utils/authorized';
import Search from '../elements/Search';

/**
 * Table for managing users and
 * documents.
 */
class Table extends Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: true
    };
  }

  /**
   * Fetch existing data to populate
   * table.
   */
  componentDidMount() {
    const { type } = this.props;

    authorized
      .get(apiUrl('get', type))
      .then(response => {
        this.setState({
          items: response.data,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          errorOnLoad: err.response.data.message ? err.response.data.message : 'An error occurred.',
          isLoading: false
        });
      });
  }

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    const { items, isLoading } = this.state;
    const { type } = this.props;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="manage-users-table">
        <div className="table-title">
          <h1>{pluralTitle(type)}</h1>
          <Link to={`/${type}/new`} className="btn btn-xs btn-primary">
            Add New {singularTitle(type)}
          </Link>
        </div>
        <div className="table-container">
          <div className="table-top">
            <Search />
            <span className="stats">
              {items.length} {pluralTitle(type)}
            </span>
          </div>
          <div className="table-responsive">
            {this.props.render({
              type,
              items
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addNotice }
)(Table);
