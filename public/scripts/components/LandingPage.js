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
            <form>
              <div className="form-inline">
                <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-raised btn-primary" type="submit">Search</button>
              </div>
            </form>
          </div>
        </div>
        <div className="btn-group btn-toolbar-lg" role="toolbar" aria-label="action bar">
          <button type="button" className="btn btn-raised btn-primary">Create</button>
          <button type="button" className="btn btn-raised btn-primary">Create</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {...state, ...ownProps}
};

export default withRouter(connect(mapStateToProps,actions)(LandingPage));
