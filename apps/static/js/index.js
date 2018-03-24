import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import 'antd/dist/antd.css';
import AppContainer from './App';
import LoginContainer from './Login';
import SignupContainer from './Signup';

render((
  <Router history={hashHistory}>
    <Route path="/login" component={LoginContainer}/>
    <Route path="/signup" component={SignupContainer}/>
    <Route path="/" component={AppContainer}/>
  </Router>
), document.getElementById('app'))
