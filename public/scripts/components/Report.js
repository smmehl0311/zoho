import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

const Report = props => <div>report</div>;

const mapStateToProps = (state, ownProps) => {
  return {...state, ...ownProps}
};

export default withRouter(connect(mapStateToProps,actions)(Report));
