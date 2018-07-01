import $ from 'jquery';
import React from 'react';

import { csrftoken } from './utils';

class AccountService {

    createAccount () {

        $.ajax({
            type: 'POST',
            url: '/api/account/',
            data: {
                user: id,
                balance: amount
            },
            headers: {
                'Authorization': 'Token ' + localStorage.token,
                'X-CSRFToken': csrftoken
            },
            success: function(res){
                console.log(res);
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        })
    }

}

export default new AccountService();
