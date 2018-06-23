import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNotice } from '../../store/notice';
import authorized from '../../utils/authorized';
import { getUserInputs, cleanUserData } from '../../utils/data';
import { timeoutPromise } from '../../../../lib/utils/timing';
import Alert from './Alert';

/**
 * Form to edit a document.
 */
class Form extends Component {
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
  initialState = () => ({
    errorOnLoad: '',
    errorOnSubmit: '',
    isLoading: true,
    isSubmitting: false,
    inputs: getUserInputs() // @TODO this.props.type === 'users' ? getUserInputs() : getContentTypeInputs(this.props.type)
  });

  /**
   * Load data for the document.
   */
  loadData = (type, slug) => {
    authorized
      .get(`/api/v1/${type}/${slug}`)
      .then(response => {
        this.setState({
          inputs: { ...this.state.inputs, ...response.data },
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
   * Fetch existing data for document, that
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
   * reset everything for the new document.
   *
   * NOTE: We need to be careful to only update
   * when the type or slug changes.
   */
  componentWillReceiveProps(newProps) {
    const { type, slug } = newProps;
    if (type !== this.props.type || slug !== this.props.slug) {
      this.setState(this.initialState(), () => {
        this.loadData(type, slug);
      });
    }
  }

  /**
   * Handle individual form field
   * changes.
   */
  handleChange = event => {
    const { name, value, checked, type } = event.target;
    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  /**
   * Handle form submission.
   */
  handleSubmit = event => {
    event.preventDefault();

    const { type } = this.props;
    const { _id } = this.state.inputs;
    const data = cleanUserData({ ...this.state.inputs }); // @TODO Will clean with a different function for content type.

    if (typeof data === 'string') {
      // String means error message from cleanUserData().
      this.setState({
        errorOnSubmit: data,
        isSubmitting: false
      });
      return;
    }

    this.setState({ isSubmitting: true });

    authorized
      .put(`/api/v1/${type}/${_id}`, data)
      .then(response => {
        return timeoutPromise(1000); // Force at least 1 second delay in response.
      })
      .then(() => {
        this.props.addNotice('Saved!', 'success');
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
      })
      .catch(err => {
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
      return <p>Loading...</p>;
    }

    if (errorOnLoad) {
      return <Alert text={errorOnLoad} status="danger" />;
    }

    return this.props.render({
      handleSubmit: this.handleSubmit,
      handleChange: this.handleChange,
      inputs: this.state.inputs,
      isSubmitting: this.state.isSubmitting,
      errorOnSubmit: this.state.errorOnSubmit
    });
  }
}

export default connect(
  null,
  { addNotice }
)(Form);
