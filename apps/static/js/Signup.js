import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import AuthStore from './store/AuthStore';
// import AuthActions from './actions/AuthActions';
import AuthService from './AuthService';
import './App.css';


class SignupContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            username: '',
            password: '',
            email: ''
        }
    }

    signup (e) {
        e.preventDefault();
        AuthService.signup(this.state.username, this.state.password, this.state.email)
        .catch(function(err) {
            console.log('Error logging in', err);
        });
    }

    render() {
        return (
            <div>
                <form role="form">
                    <div className="form-group">
                        <input type="text" name="username" placeholder="username" />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="password" />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="e-mail" />
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={this.signup.bind(this)}>Create an account</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignupContainer;
