import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import AuthStore from './store/AuthStore';
import AuthActions from './actions/AuthActions';
import './App.css';


class Login extends Component {
    constructor() {
        super(...arguments);
    }

    render() {

        return (
            <div>
                Signup
            </div>
        );
    }
}

Login.getStores = () => ([AuthStore]);
Login.calculateState = (prevState) => ({});

const LoginContainer = Container.create(Login);

export default LoginContainer;
