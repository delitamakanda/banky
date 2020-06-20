import 'whatwg-fetch';
import 'babel-polyfill';
import BankAPI from '../api/BankApi';
import { csrftoken } from '../utils/cookie';

class AccountService {

    createAccount () {
        const data = {
            user: id,
            balance: amount
        };

        return fetch('/api/account/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.token,
                'X-CSRFToken': csrftoken,
                mode: 'opaque'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .catch((error) => console.log(error));
    }

}

export default new AccountService();
