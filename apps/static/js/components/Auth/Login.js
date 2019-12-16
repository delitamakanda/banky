import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import AuthService from '../../services/AuthService';

import ons from 'onsenui';

import { Page, Input } from 'react-onsenui'

import Logo from '../Logo';

class LoginContainer extends Component {
    constructor() {
        super(...arguments);

        this.state = {
            username:'',
            pwd: null
        }
    }

    login (e) {
        e.preventDefault();

        let username = this.state.username;
        let pass = this.state.pwd;

        AuthService.login(username, pass, (loggedIn) => {
            if (loggedIn) {
                hashHistory.push('/');
            }
        })

    }

    render() {

        return (
            <Page>
                <div className="wrapper">
                    <form className="login-form" role="form" onSubmit={this.login.bind(this)}>
                        <Logo title="MyBank" />
                        <p>Entrer vos identifiants.</p>
                        <p>Vous n'avez pas de compte ? <Link to="signup">Créer le</Link> en 3 minutes.</p>

                        <p>
                        <Input 
                            id="username" 
                            name="username"
                            ref="username"
                            value={this.state.username}
                            onChange={(evt) => { this.setState({ username: evt.target.value })}}
                            modifier="underbar" 
                            placeholder="Identifiant" 
                        />
                        </p>

                        <p>
                        <Input
                            type="password" 
                            name="pwd" 
                            id="pwd" 
                            ref="pwd"
                            value={this.state.pwd}
                            onChange={(evt) => { this.setState({ pwd: evt.target.value })}}
                            modifier="underbar"
                            placeholder="Mot de passe"
                        />
                        </p>

                        <p>
                            <button type="submit">Se connecter</button>
                        </p>
                    </form>
                </div>
            </Page>
        );
    }
}

export default LoginContainer;
