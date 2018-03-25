import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import AppContainer from './App';
import LoginContainer from './Login';
import SignupContainer from './Signup';
import NotFound from './NotFound';

render((
  <Router history={hashHistory}>
    <Route path="/login" component={LoginContainer}/>
    <Route path="/signup" component={SignupContainer}/>
    <Route path="/" component={AppContainer}/>
    <Route path="*" component={NotFound}/>
  </Router>
), document.getElementById('app'))
