import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { render } from 'react-dom';
import AuthService  from './Auth';
import './App.css';


class LoginContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            login_error: false
        }
    }

    login (e) {
        e.preventDefault();

        let username = this.refs.username.value;
        let pass = this.refs.pass.value;

        AuthService.login(username, pass, (loggedIn) => {
            if (loggedIn) {
                hashHistory.push('/');
            } else {
                this.setState({login_error: true})
            }
        })

    }

    render() {

        return (
            <div>
                <form role="form" onSubmit={this.login.bind(this)}>
                    <div className="form-group">
                        <input type="text" name="username" placeholder="username" ref="username" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="pass" placeholder="password" ref="pass" />
                    </div>
                    <div className="form-group">
                        <button type="submit">Login</button>
                    </div>

                    { this.state.login_error }
                </form>
            </div>
        );
    }
}

export default LoginContainer;
