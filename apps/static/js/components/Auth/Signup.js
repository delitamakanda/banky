import React, { Component } from 'react';
import { Link } from 'react-router';
import AuthService from '../../services/AuthService';

import Logo from '../Logo';

import ons from 'onsenui';

import { Page, Input } from 'react-onsenui'

class SignupContainer extends Component {
    constructor() {
        super(...arguments);

        this.state = {
          first_name: '',
          last_name: '',
          username: '',
          pass: null,
          email: '',
        }
    }

    signup (e) {
        e.preventDefault();

        let first_name = this.refs.first_name.value.trim();
        let last_name = this.refs.last_name.value.trim();
        let username = this.refs.username.value.trim();
        let pass = this.refs.pwd.value.trim();
        let email = this.refs.email.value.trim();

        AuthService.signup(first_name, last_name, username, pass, email);
    }


    render() {
        return (
            <Page>
                <div className="wrapper">
                      <form role="form" className="sign-up-form" onSubmit={this.signup.bind(this)}>
                          <Logo title="MyBank" />
                          <h1>Création de compte</h1>
                          <p><Link to="login">Compte existant ? </Link></p>

                        <div className="margin-bottom-sm">
                          <div className="grid grid-gap-xs">
                            <div className="col-6@md">
                              <label className="form-label margin-bottom-xxxs" htmlFor="firstName">First name</label>
                              <input className="form-control width-100%" type="text" ref="first_name" name="firstName" id="firstName" />
                            </div>

                            <div className="col-6@md">
                              <label className="form-label margin-bottom-xxxs" htmlFor="lastName">Last name</label>
                              <input className="form-control width-100%" type="text" ref="last_name" name="lastName" id="lastName" />
                            </div>
                          </div>
                        </div>

                        <div className="margin-bottom-sm">
                          <label className="form-label margin-bottom-xxxs" htmlFor="username">Username</label>
                          {/*<Icon kind="user" width="20" height="20" color="black" className="icon" />*/}
                          <input className="form-control width-100%" onBlur={this.checkValue} type="text" name="username" ref="username" />
                      </div>

                      <div className="margin-bottom-md">
                          <label htmlFor="email" className="form-label margin-bottom-xxxs">E-mail</label>
                          {/*<Icon kind="envelope" width="20" height="20" color="black" className="icon" />*/}
                          <input className="form-control width-100%" onBlur={this.checkValue} type="email" name="email" ref="email" />
                      </div>

                      <div className="margin-bottom-md">
                          <label className="form-label margin-bottom-xxxs" htmlFor="">Password</label>
                          {/*<Icon kind="lock" width="20" height="20" color="black" className="icon" />*/}
                          <input className="form-control width-100%" onBlur={this.checkValue} type="password" name="pwd" ref="pwd" />
                      </div>

                      <p>
                          <button type="submit">S'inscrire</button>
                      </p>

                      <div className="text-center">
                          <p className="text-sm">By joining, you agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
                        </div>
                  </form>
                </div>
            </Page>
        );
    }
}

export default SignupContainer;
