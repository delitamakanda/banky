import 'whatwg-fetch';
import 'babel-polyfill';
import BankAPI from '../api/BankApi';

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

    signup (first_name, last_name, username, pwd, email) {
        const data = {
                first_name: first_name,
                last_name: last_name,
                username: username,
                password: pwd,
                email: email
        };
        return fetch('/api/users/', {
            method: 'POST',
            headers: BankAPI.API_HEADERS,
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .catch((error) => console.log(error));
    }

    logout () {
        delete localStorage.token
    }

    loggedIn () {
        return !!localStorage.token
    }

    getToken (username, pass, cb) {
        const data = {
            username: username,
            password: pass
        }
        return fetch('/api/obtain-auth-token/', {
            method: 'POST',
            headers: BankAPI.API_HEADERS,
            body: JSON.stringify(task)
        })
        .then((response) => {
            console.log(response.json());
            cb({
                authenticated: true,
                token: res.token
            });
        })
        .catch((error) => {
            console.log(error);
            cb({
                authenticated: false
            });
        });
    }
}

export default new AuthService();
