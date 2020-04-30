import axios from 'axios';
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
  AUTH_ERROR
} from './types';

import setAuthToken from '../utils/setAuthToken';
import M from 'materialize-css/dist/js/materialize.min.js';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/v1/auth/me');

    dispatch({
      type: LOAD_USER,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const signUp = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/v1/auth/register', body, config);

    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.error.split(',');

    if (errors) {
      errors.forEach((error) =>
        M.toast({
          html: `${error}`,
          classes: 'red lighten-1'
        })
      );
    }

    dispatch({
      type: SIGN_UP_FAIL
    });
  }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/v1/auth/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.error.split(',');

    if (errors) {
      errors.forEach((error) =>
        M.toast({
          html: `${error}`,
          classes: 'red lighten-1'
        })
      );
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  await axios.get('/api/v1/auth/logout');
  dispatch({ type: LOGOUT });
};
