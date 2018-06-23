import React from 'react';
import Alert from '../elements/Alert';
import Button from '../elements/Button';

const UserForm = props => {
  const { context, handleSubmit, handleChange, inputs, isSubmitting, errorOnSubmit } = props;

  return (
    <form onSubmit={handleSubmit} noValidate>
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
          <label>
            Username<span className="required">*</span>
          </label>
          <input
            type="text"
            name="username"
            value={inputs.username}
            placeholder="Enter Name"
            onChange={handleChange}
            disabled={context !== 'new'}
          />
          <span className="help-text">Your username cannot be changed.</span>
        </p>
        <p className="col col-md-6">
          <label>
            Email<span className="required">*</span>
          </label>
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
      <p>
        <label>Bio</label>
        <textarea name="bio" value={inputs.bio} onChange={handleChange} rows="10" />
        <span className="help-text">Write a bit about yourself.</span>
      </p>
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
      {errorOnSubmit && <Alert text={errorOnSubmit} status="danger" />}
      <Button isPrimary isLoading={props.isSubmitting}>
        {context === 'new' ? 'Add New User' : 'Update User'}
      </Button>
    </form>
  );
};

export default UserForm;
