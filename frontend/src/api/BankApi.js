import 'whatwg-fetch';
import 'babel-polyfill';

import { csrftoken } from '../utils/cookie';

let API_HEADERS = {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
    // 'Authorization': 'Token ' + localStorage.token,
    mode: 'opaque'
};

export default {
    login(username, password) {
        return fetch('/api/obtain-auth-token/', {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify({ 
                username, 
                password
            })
        });
    },
    signup(first_name, last_name, username, pwd, email) {
        return fetch('/api/users/', {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                username: username,
                password: pwd,
                email: email
            })
        });
    },
    addAccount(userId, amountAccount) {
		API_HEADERS['Authorization'] = 'Token ' + localStorage.token;
        return fetch('/api/account/', {
            method: 'post',
			headers: API_HEADERS,
            body: JSON.stringify({
                user: userId,
                balance: amountAccount
            })
        })
    },
    getAccount() {
		API_HEADERS['Authorization'] = 'Token ' + localStorage.token;
        return fetch('/api/account/', {headers: API_HEADERS})
    },
    getUser() {
		API_HEADERS['Authorization'] = 'Token ' + localStorage.token;
        return fetch('/api/users/i/', {headers: API_HEADERS})
    }
}

