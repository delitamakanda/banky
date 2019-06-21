import './main/assets/js/util';

import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import AppContainer from './components/App';
import LoginContainer from './components/Auth/Login';
import SignupContainer from './components/Auth/Signup';
import AuthService from './services/AuthService';

/* Cody Framework */
import './main/assets/css/style.scss';

/* styles bank app */
import './styles/app.scss';

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
  </Router>
), document.getElementById('app'))
