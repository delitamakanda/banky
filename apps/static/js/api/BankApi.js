import 'whatwg-fetch';
import 'babel-polyfill';

import { csrftoken } from './utils';

const API_URL = 'http://localhost:8000/api';
const API_HEADERS = {
    'Content-Type': 'application/json',
	'X-CSRFToken': csrftoken,
    mode: 'opaque'
};


let export default BankAPI; = {

};

export default BankAPI;
