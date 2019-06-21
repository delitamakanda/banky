import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { render } from 'react-dom';
import AuthService from '../../services/AuthService';

import Logo from '../Logo';

import Icon from '../Icons';

class LoginContainer extends Component {
    constructor() {
        super(...arguments);
    }

    login (e) {
        e.preventDefault();

        let username = this.refs.username.value;
        let pass = this.refs.pwd.value;

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

    initPassword() {

    }

    render() {

        return (
            <div className="account">
                <form className="login-form" role="form" onSubmit={this.login.bind(this)}>
                    <div className="text-component text-center margin-bottom-md">
                    <Logo title="MyBank" />
                    <h1>Log in</h1>
                    <p>Entrer vos identifiants.</p>
                    </div>

                    {/*<div className="form__social-btns">
                    <div className="grid grid-gap-xs">
                    <div className="col-6@xs">
                    <button className="btn btn--subtle width-100%">
                    <svg aria-hidden="true" className="icon margin-right-xxxs" viewBox="0 0 16 16"><g><path d="M16,3c-0.6,0.3-1.2,0.4-1.9,0.5c0.7-0.4,1.2-1,1.4-1.8c-0.6,0.4-1.3,0.6-2.1,0.8c-0.6-0.6-1.5-1-2.4-1 C9.3,1.5,7.8,3,7.8,4.8c0,0.3,0,0.5,0.1,0.7C5.2,5.4,2.7,4.1,1.1,2.1c-0.3,0.5-0.4,1-0.4,1.7c0,1.1,0.6,2.1,1.5,2.7 c-0.5,0-1-0.2-1.5-0.4c0,0,0,0,0,0c0,1.6,1.1,2.9,2.6,3.2C3,9.4,2.7,9.4,2.4,9.4c-0.2,0-0.4,0-0.6-0.1c0.4,1.3,1.6,2.3,3.1,2.3 c-1.1,0.9-2.5,1.4-4.1,1.4c-0.3,0-0.5,0-0.8,0c1.5,0.9,3.2,1.5,5,1.5c6,0,9.3-5,9.3-9.3c0-0.1,0-0.3,0-0.4C15,4.3,15.6,3.7,16,3z"></path></g></svg>
                    <span>Login with Twitter</span>
                    </button>
                    </div>

                    <div className="col-6@xs">
                    <button className="btn btn--subtle width-100%">
                    <svg aria-hidden="true" className="icon margin-right-xxxs" viewBox="0 0 16 16"><g><path d="M15.3,0H0.7C0.3,0,0,0.3,0,0.7v14.7C0,15.7,0.3,16,0.7,16H8v-5H6V8h2V6c0-2.1,1.2-3,3-3 c0.9,0,1.8,0,2,0v3h-1c-0.6,0-1,0.4-1,1v1h2.6L13,11h-2v5h4.3c0.4,0,0.7-0.3,0.7-0.7V0.7C16,0.3,15.7,0,15.3,0z"></path></g></svg>
                    <span>Login with Facebook</span>
                    </button>
                    </div>
                    </div>

                    <p className="text-center margin-top-md margin-bottom-md">or</p>
                    </div>*/}

                    <div className="margin-bottom-sm">
                    <label htmlFor="username" className="form-label margin-bottom-xxxs">Username</label>
                    {/*<Icon kind="user" width="20" height="20" color="black" className="icon" />*/}
                    <input className="form-control width-100%" onBlur={this.checkValue} type="text" name="username" ref="username" />
                    </div>

                    <div className="margin-bottom-sm">
                    <div className="flex justify-between margin-bottom-xxxs">
                    <label htmlFor="pwd" className="form-label">Password</label>
                    <span className="text-sm"><Link to="/">Forgot?</Link></span>
                    </div>

                    <div className="password js-password">
                    {/*<Icon kind="lock" width="20" height="20" color="black" className="icon" />*/}
                    <input className="form-control width-100% password__input js-password__input" onBlur={this.checkValue} type="pwd" name="pwd" ref="pwd" />

                    <button className="password__btn flex flex-center js-password__btn" onClick={this.initPassword} type="button" aria-hidden="true">
                        <span className="password__btn-label" title="Show Password">Show</span>
                        <span className="password__btn-label" title="Hide Password">Hide</span>
                      </button>
                      </div>
                    </div>

                    <div className="margin-bottom-sm">
                        <button type="submit" className="btn btn--primary btn--md width-100%">Login</button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm">Don't have an account? <Link to="signup">Get started</Link></p>
                </div>
            </div>
        );
    }
}

export default LoginContainer;
