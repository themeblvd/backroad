import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { addNotice } from '../../store/notice';
import { singularTitle, apiUrl } from '../../utils/data';
import authorized from '../../utils/authorized';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';

/**
 * Single user entry row for the users
 * table.
 *
 * @param {Object} props           Component properties.
 * @param {String} props.id        Article ID, needed for deletion.
 * @param {String} props.type      Content type endpoint, like `pages` and NOT `page`.
 * @param {String} props.title     Article title.
 * @param {String} props.createdAt Date created
 * @param {String} props.createdBy Username of creator.
 * @param {String} props.slug      Publicly accessible slug.
 */
class ArticleRow extends Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = { isDeleted: false };
  }

  /**
   * Delete user.
   *
   * @TODO Confirmation prompt!!!
   */
  handleDelete = event => {
    event.preventDefault();

    const { type, id, addNotice } = this.props;
    const typeTitle = singularTitle(type);

    authorized
      .delete(apiUrl('delete', type, id))
      .then(response => {
        this.setState({ isDeleted: true });
        addNotice(`${typeTitle} deleted!`, 'success');
      })
      .catch(err => {
        const message = err.response.data.message
          ? err.response.data.message
          : `${typeTitle} could not be deleted.`;
        addNotice(message, 'error');
      });
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    const { isDeleted } = this.state;
    const { type, title, createdAt, createdBy, slug } = this.props;

    if (isDeleted) return null;

    var timeAgo = moment(new Date(createdAt))
      .startOf('hour')
      .fromNow();

    timeAgo = timeAgo.charAt(0).toUpperCase() + timeAgo.substr(1); // Capitalize 1st letter, if not number.

    return (
      <tr>
        <td>
          <Link to={`/${type}/${slug}`} title={`Edit ${title}`}>
            {title}
          </Link>
        </td>
        <td>{timeAgo}</td>
        <td>{createdBy}</td>
        <td>
          <ul className="actions-menu list-unstyled">
            <li>
              <Link to={`/${type}/${slug}`} className="edit-item" title={`Edit ${title}`}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </Link>
            </li>
            <li>
              <a title={`Delete ${title}`} className="delete-item" onClick={this.handleDelete}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </a>
            </li>
          </ul>
        </td>
      </tr>
    );
  }
}

export default connect(
  null,
  { addNotice }
)(ArticleRow);
