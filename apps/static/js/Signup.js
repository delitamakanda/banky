import React, { Component } from 'react';
import { render } from 'react-dom';
import { hashHistory, Link } from 'react-router';
import AuthService from './services/AuthService';
import Header from './components/Header';
import './App.css';


class SignupContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            login_error: false
        }
    }

    signup (e) {
        e.preventDefault();

        let username = this.refs.username.value.trim();
        let pass = this.refs.pass.value.trim();
        let email = this.refs.email.value.trim();

        AuthService.signup(username, pass, email);
    }

    render() {
        return (
            <div>
                <Header title="Budgetto" subtitle="Signup" hasBackButton={true}/>

                <form role="form" onSubmit={this.signup.bind(this)}>
                    <div className="form-group">
                        <input type="text" name="username" placeholder="username" ref="username" />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="e-mail" ref="email" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="password" ref="pass" />
                    </div>
                    <div className="form-group">
                        <button type="submit">Create an account</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignupContainer;
