import React, { Component } from 'react';
import { render } from 'react-dom';
import { hashHistory, Link } from 'react-router';
import AuthService from '../../services/AuthService';

import '../App.css';

import Icon from '../Icons'

class SignupContainer extends Component {
    constructor() {
        super(...arguments);
    }

    signup (e) {
        e.preventDefault();

        let username = this.refs.username.value.trim();
        let pass = this.refs.pass.value.trim();
        let email = this.refs.email.value.trim();

        AuthService.signup(username, pass, email);
    }

    checkValue(e) {
        let elem = e.target;

        if(elem.value != "") {
            elem.classList.add('js-input-filled');
        } else {
            elem.classList.remove('js-input-filled');
        }
    }

    render() {
        return (
            <div className="account">
                <div className="content">
                    <form role="form" onSubmit={this.signup.bind(this)}>
                        <label htmlFor="">
                            <Icon kind="user" width="20" height="20" color="black" className="icon" />
                            <input onBlur={this.checkValue} type="text" name="username" ref="username" />
                            <span>username</span>
                        </label>
                        <label htmlFor="">
                            <Icon kind="envelope" width="20" height="20" color="black" className="icon" />
                            <input onBlur={this.checkValue} type="email" name="email" ref="email" />
                            <span>email</span>
                        </label>
                        <label htmlFor="">
                            <Icon kind="lock" width="20" height="20" color="black" className="icon" />
                            <input onBlur={this.checkValue} type="password" name="password" ref="pass" />
                            <span>password</span>
                        </label>

                        <button type="submit">Create an account</button>
                    </form>

                    <div>Already an account ? <Link to="login" className="link">Login</Link></div>

                </div>
            </div>
        );
    }
}

export default SignupContainer;
