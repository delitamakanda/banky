import 'whatwg-fetch';
import 'babel-polyfill';

import { csrftoken } from '../utils/cookie';

let API_HEADERS = {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
    // 'Authorization': localStorage.token,
    mode: 'opaque'
};

export default {
    login(username, password) {
        API_HEADERS['Authorization'] = '';
        return fetch('/api/obtain-auth-token/', {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify({
                username,
                password
            })
        });
    },
    signup(first_name, last_name, username, pwd, pwd2, email) {
        API_HEADERS['Authorization'] = '';
        return fetch('/api/users/', {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                username: username,
                password: pwd,
                password2: pwd2,
                email: email
            })
        });
    },
    getAccount() {
        API_HEADERS['Authorization'] = 'Token ' + localStorage.token;
        return fetch('/api/account/', { headers: API_HEADERS })
            .then((response) => response.json())
    },
    getActionsAccount() {
        API_HEADERS['Authorization'] = 'Token ' + localStorage.token;
        return fetch('/api/action/', { headers: API_HEADERS })
            .then((response) => response.json())
    },
    getUser() {
        API_HEADERS['Authorization'] = 'Token ' + localStorage.token;
        return fetch('/api/users/i/', { headers: API_HEADERS })
            .then((response) => response.json())
    },
    updateUser(user) {
        API_HEADERS['Authorization'] = 'Token ' + localStorage.token;
        return fetch(`/api/user/${user.id}/`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify(user)
        })
    },
    withdraw(amount, userId) {
        API_HEADERS['Authorization'] = 'Token ' + localStorage.token;
        return fetch(`/api/withdraw/`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify({
                amount,
                user: userId
            })
        })
    },
    deposit(amount, userId) {
        API_HEADERS['Authorization'] = 'Token ' + localStorage.token;
        return fetch(`/api/deposit/`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify({
                amount,
                user: userId
            })
        })
    }
}

