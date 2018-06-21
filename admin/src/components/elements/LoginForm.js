import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../../store/auth';
import { addNotice } from '../../store/notice';
import Alert from './Alert';
import Button from './Button';
import Input from '../fields/Input';

/**
 * Login Form.
 */
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        username: '',
        password: ''
      },
      error: '',
      isLoading: false
    };
  }

  /**
   * Handle individual form field
   * changes.
   */
  handleChange = event => {
    const { name, value } = event.target;
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

    const { username, password } = this.state.inputs;

    this.setState({ error: '' }); // Clear any previous errors.

    if (!username || !password) {
      this.setState({ error: 'Please fill out all fields.' });
      return;
    }

    this.setState({ isLoading: true });

    this.props.login({ username, password }).then(() => {
      const status = this.props.status;

      if (status === 400 || status === 401) {
        this.setState({ error: 'Username or password was not correct.' });
        return;
      }

      this.props.addNotice('Login Successful!', 'success');
      this.props.history.push('/');
    });
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    const { error, isLoading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {error && <Alert title="Oops!" text={error} status="danger" />}
        <Input title="Username" name="username" onChange={this.handleChange} />
        <Input title="Password" name="password" onChange={this.handleChange} type="password" />
        <Button isPrimary isLoading={isLoading}>
          Log In
        </Button>
      </form>
    );
  }
}

export default withRouter(
  connect(
    state => ({ status: state.auth.authErrCode.login }),
    { login, addNotice }
  )(LoginForm)
);
