import React, { Component } from 'react';
import { render } from 'react-dom';
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
