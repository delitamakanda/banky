import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { render } from 'react-dom';
import AuthService from '../../services/AuthService';

import '../App.css';

import Icon from '../Icons';

class LoginContainer extends Component {
    constructor() {
        super(...arguments);
    }

    login (e) {
        e.preventDefault();

        let username = this.refs.username.value;
        let pass = this.refs.pass.value;

        AuthService.login(username, pass, (loggedIn) => {
            if (loggedIn) {
                hashHistory.push('/');
            }
        })

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
                    <form role="form" onSubmit={this.login.bind(this)}>
                        <label htmlFor="">
                            <Icon kind="user" width="20" height="20" color="black" className="icon" />
                            <input onBlur={this.checkValue} type="text" name="username" ref="username" />
                            <span>username</span>
                        </label>
                        <label htmlFor="">
                            <Icon kind="lock" width="20" height="20" color="black" className="icon" />
                            <input onBlur={this.checkValue} type="password" name="pass" ref="pass" />
                            <span>password</span>
                        </label>

                        <button type="submit">Login</button>
                    </form>

                    <div>No account ? <Link to="signup" className="link">Join us !</Link></div>
                </div>
            </div>
        );
    }
}

export default LoginContainer;
