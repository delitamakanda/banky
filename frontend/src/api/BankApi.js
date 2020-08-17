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
    signup(first_name, last_name, username, pwd, email) {
        API_HEADERS['Authorization'] = '';
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
    getAccount() {
		API_HEADERS['Authorization'] = 'Token ' + localStorage.token;
        return fetch('/api/account/', {headers: API_HEADERS})
        .then((response) => response.json())
    },
    getUser() {
		API_HEADERS['Authorization'] = 'Token ' + localStorage.token;
        return fetch('/api/users/i/', {headers: API_HEADERS})
        .then((response) => response.json())
    },
    updateUser() {
		API_HEADERS['Authorization'] = 'Token ' + localStorage.token;
        return fetch('/api/users/i/', {headers: API_HEADERS})
        .then((response) => response.json())
    }
}

