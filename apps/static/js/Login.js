import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import { render } from 'react-dom';
import AuthService from './services/AuthService';
import Header from './Header';
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
                <Header title="Budgetto" subtitle="Login" hasBackButton={false}/>

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
                </form>

                <div>Not an account ? <Link to="signup">Create one !</Link></div>
            </div>
        );
    }
}

export default LoginContainer;
