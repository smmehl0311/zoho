import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import Spinner from './Spinner';
import {checkUserAndAuthToken} from './utils';

class Login extends Component {
  constructor(props) {
    console.log('login props', props)
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {username: '', password: '', error: false}
  }

  componentWillMount() {
    checkUserAndAuthToken(this.props);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const {username, password} = this.state;
    const {login, setIsLoginLoading} = this.props;
    console.log({username, password})
    login(username, password)
      .catch(() => {
        this.setState({error: true});
        setIsLoginLoading(false);
      });
  }

  render() {
    const {error, username} = this.state;
    const {children, isLoginLoading, user} = this.props;
    console.log('isLoginLoading', isLoginLoading)
    return isLoginLoading ? (
      <Spinner/>
    ) : user ? (
      children
    ) : (
      <div className="card col-sm-6 login-card">
        <div className="card-body">
          <h1 className="card-title">Air Safe Log in</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleUsernameChange} value={username}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" placeholder="Password" onChange={this.handlePasswordChange}/>
            </div>
            <div className="form-group">
              <span className="error">{error ? "Invalid Credentials" : ""}</span>
            </div>
            <button type="submit" className="btn btn-outline-primary" onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {...state, ...ownProps}
};

export default withRouter(connect(mapStateToProps,actions)(Login));
