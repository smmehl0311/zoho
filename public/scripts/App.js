import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Switch} from 'react-router';
import {Router, Route, withRouter} from 'react-router-dom';
import {createStore} from 'redux';
import appReducer from './reducers/index';
import {Provider, connect} from 'react-redux';
import {createBrowserHistory} from 'history';

const [appContext] = window.location.pathname.match(/\/[^/]*/);
const history = createBrowserHistory({basename: appContext, forceRefresh: false});
window.History = history;

const store = createStore(appReducer);

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route key="0" path="/" exact component={withRouter(connect(mapStateToProps,{})(component))} />
      </Switch>
    </Router>
  </Provider>
);

class component extends Component {
  render() {
    return <span>Hello World</span>
  }
}

const mapStateToProps = () => ({});

export default Root;
