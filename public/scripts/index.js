import React from 'react';
import ReactDOM from 'react-dom';
import {Switch} from 'react-router';
import {Router, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import appReducer from './reducers/index';
import {createBrowserHistory} from 'history';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Login from './components/Login';

const [appContext] = window.location.pathname;
const history = createBrowserHistory({basename: appContext, forceRefresh: false});
window.History = history;

const store = createStore(appReducer, applyMiddleware(thunk));

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Navbar/>
          <Login>
            <Switch>
              <Route key="0" path="/" exact component={LandingPage} />
              <Route key="5" path="/login" exact component={Login}/>
            </Switch>
          </Login>
        </div>
      </Router>
    </Provider>);
};

ReactDOM.render(<Root/>, document.getElementById('content'));
