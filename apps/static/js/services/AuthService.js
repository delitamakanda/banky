import $ from 'jquery';
import React from 'react';
import { hashHistory } from 'react-router';

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
            }
        })
    }

    signup (username, pass, email) {

        $.ajax({
            type: 'POST',
            url: '/api/users/',
            data: {
                username: username,
                password: pass,
                email: email
            },
            success: function(res){
                console.log(res);
                hashHistory.push('/login');
            },
            error: (xhr, status, err) => {
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
