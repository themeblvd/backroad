import React from 'react';
import Logo from '../components/elements/Logo';
import LoginForm from '../components/forms/LoginForm';
import RandomBackground from '../components/elements/RandomBackground';

const Login = () => {
  return (
    <div className="login-page">
      <div className="wrap">
        <div className="login-logo">
          <Logo />
        </div>
        <div className="login-form">
          <LoginForm />
        </div>
      </div>
      <RandomBackground />
    </div>
  );
};

export default Login;
