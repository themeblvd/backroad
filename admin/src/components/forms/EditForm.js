import React, { Component } from 'react';

// Router
import { withRouter } from 'react-router-dom';

// Store
import { connect } from 'react-redux';
import { addNotice } from '../../store/notice';
import { updateUser } from '../../store/auth';

// Utilities
import {
  getUserInputs,
  getContentTypeInputs,
  cleanUserData,
  cleanArticleData,
  apiUrl
} from '../../utils/data';
import authorized from '../../utils/authorized';
import { timeoutPromise } from '../../../../lib/utils/timing';

// Components
import Alert from '../elements/Alert';

/**
 * Edit Form
 *
 * This is an HOC that handles all the data
 * when adding or editing users or articles,
 * of any content type.
 */
class EditForm extends Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = this.initialState(props);
  }

  /**
   * Initial state.
   *
   * This is helpful in resetting the state
   * in componentWillReceiveProps().
   */
  initialState = props => {
    const { type, slug } = props;

    return {
      context: slug === 'new' ? 'new' : 'edit',
      errorOnLoad: '',
      errorOnSubmit: '',
      isLoading: true,
      isSubmitting: false,
      title: '', // Not used with users.
      _id: '',
      inputs: type === 'users' ? getUserInputs() : getContentTypeInputs(type)
    };
  };

  /**
   * Load data for the item.
   *
   * NOTE: When the context of the form is
   * adding a new item, there's no data to
   * retrieve for the form.
   */
  loadData = (type, slug) => {
    if (slug === 'new') {
      this.setState({
        context: 'new',
        isLoading: false
      });
      return;
    }

    authorized
      .get(apiUrl('get', type, slug))
      .then(response => {
        // If we're editing an article data stored in fields,
        // and with user's it's stored directly in response.data.
        const inputs = response.data.fields ? response.data.fields : response.data;

        this.setState({
          _id: response.data._id,
          title: response.data.title && response.data.title,
          inputs: { ...this.state.inputs, ...inputs },
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
   * Fetch existing data for item, that
   * the user will be editing.
   */
  componentDidMount() {
    const { type, slug } = this.props;
    this.loadData(type, slug);
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
    const { type, slug } = newProps;
    if (type !== this.props.type || slug !== this.props.slug) {
      this.setState(this.initialState(newProps), () => {
        this.loadData(type, slug);
      });
    }
  }

  /**
   * Handle individual form field
   * changes.
   */
  handleChange = event => {
    const { name, value, type, checked } = event.target;

    if (name === 'title') {
      this.setState({ title: value });
      return;
    }

    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  /**
   * Handle changes from Slate content
   * editors.
   */
  handleEditorChange = (name, value) => {
    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [name]: value
      }
    }));
  };

  /**
   * Handle form submission.
   */
  handleSubmit = event => {
    event.preventDefault();

    const { type, history, updateUser, currentUserId } = this.props;
    const { context, _id, inputs } = this.state;

    const data =
      type === 'users'
        ? cleanUserData({ ...this.state }, context)
        : cleanArticleData({ ...this.state }, context);

    if (typeof data === 'string') {
      // String means error message from cleanUserData().
      this.setState({
        errorOnSubmit: data,
        isSubmitting: false
      });
      return;
    }

    this.setState({ isSubmitting: true });

    const options = {
      method: context === 'new' ? 'post' : 'put',
      url: context === 'new' ? apiUrl('post', type) : apiUrl('put', type, _id),
      data
    };

    authorized(options)
      .then(response => {
        return timeoutPromise(1000, response); // Force at least 1 second delay in response.
      })
      .then(response => {
        // Add global notice.
        this.props.addNotice('Saved!', 'success');

        if (context === 'new') {
          if (type === 'users') {
            // When saving a new user, forward back to Manage
            // Users page.
            history.push('/users');
          } else {
            // When saving a new article, forward to the
            // Edit view of it, which will now exist.
            history.push(`/${type}/${response.data.slug}`);
          }
        } else {
          // When saving an existing user or article,
          // adjust state and stay in the current component
          // for further editing.
          this.setState(prevState => ({
            ...prevState,
            errorOnSubmit: '',
            isSubmitting: false,
            inputs: {
              ...prevState.inputs,
              password: '',
              password_confirm: ''
            }
          }));

          // When a user saves their own data, also dispatch
          // to the store.
          if (type === 'users' && currentUserId === _id) {
            updateUser(response.data);
          }
        }
      })
      .catch(err => {
        console.dir(err);
        var errorMessage = 'An error occurred.';
        if (err.response && err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
        this.setState({
          errorOnSubmit: errorMessage,
          isSubmitting: false
        });
      });
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    const { isLoading, errorOnLoad } = this.state;

    if (isLoading) {
      return <p className="hide">Loading...</p>;
    }

    if (errorOnLoad) {
      return <Alert text={errorOnLoad} status="danger" />;
    }

    return this.props.render({
      title: this.state.title, // Only used with articles.
      context: this.state.context,
      type: this.props.type,
      handleSubmit: this.handleSubmit,
      handleChange: this.handleChange,
      handleEditorChange: this.handleEditorChange,
      inputs: this.state.inputs,
      isSubmitting: this.state.isSubmitting,
      errorOnSubmit: this.state.errorOnSubmit
    });
  }
}

export default withRouter(
  connect(
    state => ({ currentUserId: state.auth._id }),
    { addNotice, updateUser }
  )(EditForm)
);
