import $ from 'jquery';
import React from 'react';
import { hashHistory } from 'react-router';

import ons from 'onsenui';

import { csrftoken } from './utils';

class AuthService {

    login (username, pass, cb) {
        if (localStorage.token) {
            if (cb) cb(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
                ons.notification.alert('Votre identifiant/mot de passe est erroné.');
            }
        })
    }

    signup (first_name, last_name, username, pwd, email) {

        $.ajax({
            type: 'POST',
            url: '/api/users/',
            data: {
                first_name: first_name,
                last_name: last_name,
                username: username,
                password: pwd,
                email: email
            },
            headers: {
                'X-CSRFToken': csrftoken
            },
            success: function(res){
                console.log(res);
                hashHistory.push('/login');
            },
            error: (xhr, status, err) => {
                ons.notification.alert('Formulaire invalide.');
                console.error(status, err.toString());
            }
        })
    }

    logout () {
        delete localStorage.token
    }

    loggedIn () {
        return !!localStorage.token
    }

    getToken (username, pass, cb) {
        $.ajax({
            type: 'POST',
            url: '/api/obtain-auth-token/',
            data: {
                username: username,
                password: pass
            },
            headers: {
                'X-CSRFToken': csrftoken
            },
            success: function(res){
                cb({
                    authenticated: true,
                    token: res.token
                })

            },
            error: (xhr, status, err) => {
                cb({
                    authenticated: false
                })
            }
        })
    }
}

export default new AuthService();
