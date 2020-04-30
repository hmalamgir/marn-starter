import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Navbar from './components/layout/Navbar';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import M from 'materialize-css/dist/js/materialize.min.js';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './components/layout/HomePage';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    M.AutoInit();
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <PrivateRoute exact path='/' component={HomePage} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
