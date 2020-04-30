import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Login = ({ login, auth: { isAuthenticated } }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  // OnChange
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // OnSubmit
  const onSubmit = async (e) => {
    e.preventDefault();

    login({ email, password });

    // clear form field
    setFormData({
      email: '',
      password: ''
    });
  };

  // redirect to homepage after login success
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='container'>
      <h4>Login</h4>
      <div className='row'>
        <form className='col s12' onSubmit={(e) => onSubmit(e)}>
          <div className='row'>
            <div className='input-field'>
              <i className='material-icons prefix'>email</i>
              <input
                id='icon_telephone'
                type='tel'
                className='validate'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
              <label htmlFor='icon_telephone'>Email</label>
            </div>
            <div className='input-field'>
              <i className='material-icons prefix'>explore</i>
              <input
                id='icon_explore'
                type='tel'
                className='validate'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
              />
              <label htmlFor='icon_explore'>Password</label>
            </div>
            <button
              className='btn waves-effect waves-light'
              type='submit'
              name='action'
            >
              Submit
              <i className='material-icons right'>send</i>
            </button>
          </div>
        </form>
        <p className=''>
          Don't have an account? <Link to='/signup'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { login })(Login);
