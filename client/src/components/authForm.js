import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;
  return (
    <div className="auth-form">
      {displayName === 'Log In' ? (
           <div className="auth-directive">
             <h1>Log in to</h1>
             <h1>your account</h1>
             <h1>here.</h1>
           </div>
      ) : (
        <div className="auth-directive">
        <h1>Sign up for</h1>
        <h1>an account</h1>
        <h1>here.</h1>
      </div>
      )}
      <div className="form-container">
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email">
              <small>email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        <a href="/auth/google">
          <img
            src={
              'https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png'
            }
            />
        </a>
            </form>
      </div>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Log In',
    erorr: state.user.error,
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);

export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

//PROP TYPES
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
