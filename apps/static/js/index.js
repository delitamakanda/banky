import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import AppContainer from './App';
import LoginContainer from './Login';
import SignupContainer from './Signup';
import NotFound from './NotFound';
import AuthService from './Auth';

function requireAuth (nextState, replace) {
    if (!AuthService.loggedIn()) {
        replace({
            pathname: '/login',
            state: {nextPathname: '/'}
        })
    }
}

render((
  <Router history={hashHistory}>
    <Route path="/login" component={LoginContainer}/>
    <Route path="/signup" component={SignupContainer}/>
    <Route path="/" component={AppContainer} onEnter={requireAuth} />
    <Route path="*" component={NotFound}/>
  </Router>
), document.getElementById('app'))
