import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import AuthStore from './store/AuthStore';
import Button from 'antd/lib/button';
import './App.css';


class Login extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        return (
            <div>
                Login
            </div>
        );
    }
}

Login.getStores = () => ([AuthStore]);
Login.calculateState = (prevState) => ({});

const LoginContainer = Container.create(Login);

export default LoginContainer;
