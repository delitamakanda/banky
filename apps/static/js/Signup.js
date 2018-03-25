import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import AuthStore from './store/AuthStore';
import AuthActions from './actions/AuthActions';
import './App.css';


class Signup extends Component {
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

Signup.getStores = () => ([AuthStore]);
Signup.calculateState = (prevState) => ({});

const SignupContainer = Container.create(Signup);

export default SignupContainer;
