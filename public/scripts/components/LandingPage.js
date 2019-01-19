import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('LandingPage props', this.props)
    return (
      <div>
        <div className="card" style={{margin: '10px'}}>
          <div className="card-body">
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {...state, ...ownProps}
};

export default withRouter(connect(mapStateToProps,actions)(LandingPage));
