import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNotice } from '../../store/notice';
import { pluralTitle, singularTitle, apiUrl } from '../../utils/data';
import authorized from '../../utils/authorized';

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
    this.state = this.initialState();
  }

  /**
   * Initial state.
   *
   * This is helpful in resetting the state
   * in componentWillReceiveProps().
   */
  initialState = () => {
    return {
      items: [],
      isLoading: true
    };
  };

  /**
   * Load data for the table.
   */
  loadData = type => {
    var url = apiUrl('get', type);

    if (type === 'users') {
      url += '?order_by=role&order=asc'; // Show those awesome admins first.
    }

    authorized
      .get(url)
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
  };

  /**
   * Fetch existing data to populate
   * table.
   */
  componentDidMount() {
    const { type } = this.props;
    this.loadData(type);
  }

  /**
   * Reset state and re-fetch data.
   *
   * Every time we navigate to a route using
   * this component, we want to make sure and
   * reset everything for the new item.
   *
   * NOTE: We need to be careful to only update
   * when the type or slug changes.
   */
  componentWillReceiveProps(newProps) {
    const { type } = newProps;
    if (type !== this.props.type) {
      this.setState(this.initialState(), () => {
        this.loadData(type);
      });
    }
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
      return <p className="hide">Loading...</p>;
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
            <select className="field-xs">
              <option value="newest">Newest</option>
              <option value="mcdavid">Oldest</option>
            </select>
            <span className="stats">
              {items.length} {pluralTitle(type)}
            </span>
          </div>
          <div className="table-responsive">
            {items.length ? (
              this.props.render({
                type,
                items
              })
            ) : (
              <p className="no-articles">
                You haven't created any {pluralTitle(type).toLowerCase()} yet.
              </p>
            )}
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
