import 'whatwg-fetch';
import 'babel-polyfill';

import { csrftoken } from '../utils/cookie';

export const API_HEADERS = {
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
    mode: 'opaque'
};

class BankAPI {}


export default BankAPI;
