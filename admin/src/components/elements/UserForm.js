import React from 'react';
import Alert from './Alert';
import Button from './Button';

const UserForm = props => {
  const { handleSubmit, handleChange, inputs, isSubmitting, errorOnSubmit } = props;

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errorOnSubmit && <Alert text={errorOnSubmit} status="danger" />}
      <fieldset>
        <legend>Name</legend>
        <div className="row">
          <p className="col col-md-6">
            <input
              type="text"
              name="first_name"
              value={inputs.first_name}
              placeholder="First Name"
              onChange={handleChange}
            />
            <span className="help-text">Enter first name.</span>
          </p>
          <p className="col col-md-6">
            <input
              type="text"
              name="last_name"
              value={inputs.last_name}
              placeholder="Last Name"
              onChange={handleChange}
            />
            <span className="help-text">Enter last name.</span>
          </p>
        </div>
      </fieldset>
      <div className="row">
        <p className="col col-md-6">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={inputs.username}
            placeholder="Enter Name"
            onChange={handleChange}
            disabled
          />
          <span className="help-text">Your username cannot be changed.</span>
        </p>
        <p className="col col-md-6">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={inputs.email}
            placeholder="Enter E-mail"
            onChange={handleChange}
            required
          />
          <span className="help-text">Enter a valid email address.</span>
        </p>
      </div>
      <fieldset>
        <legend>New Password</legend>
        <div className="row">
          <p className="col col-md-6">
            <input
              type="password"
              name="password"
              value={inputs.password}
              placeholder=""
              onChange={handleChange}
            />
            <span className="help-text">Password must be at least 8 characters.</span>
          </p>
          <p className="col col-md-6">
            <input
              type="password"
              name="password_confirm"
              value={inputs.password_confirm}
              placeholder=""
              onChange={handleChange}
            />
            <span className="help-text">Enter password again.</span>
          </p>
        </div>
      </fieldset>
      <Button isPrimary isLoading={props.isSubmitting}>
        Update Profile
      </Button>
    </form>
  );
};

export default UserForm;
