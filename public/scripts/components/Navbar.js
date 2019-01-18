import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

const Navbar = ({history, user, logout}) => {
  return user ? (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/design">Design</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/record">Record</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/report">Report</Link>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Create
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/create/company">Company</Link>
              <Link className="dropdown-item" to="/create/location">Location</Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="">Something else here</Link>
            </div>
          </li>

          <li className="nav-item">
            <button className="btn btn-primary" onClick={() => logout(user)}>Log Out</button>
          </li>
        </ul>

        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </div>)
  : null;
}

const mapStateToProps = (state, ownProps) => {
  return {...state, ...ownProps}
};

export default withRouter(connect(mapStateToProps,actions)(Navbar));
