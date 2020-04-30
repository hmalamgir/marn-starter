import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/'>Sass</Link>
      </li>
      <li>
        <Link to='/signup'>Sign Up</Link>
      </li>
      <li>
        <Link to='login'>Login</Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li>
        <a href='#!' onClick={logout}>
          Logout
        </a>
      </li>
      <li>Hello {!loading && user ? user.name : null}</li>
    </Fragment>
  );

  return (
    <nav>
      <div className='container'>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo left'>
            Logo
          </Link>
          <ul id='nav-mobile' className='right '>
            {!loading && isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
