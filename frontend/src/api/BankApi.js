import 'whatwg-fetch';
import 'babel-polyfill';

import { csrftoken } from '../utils/cookie';

const API_HEADERS = {
    'Content-Type': 'application/json',
	'X-CSRFToken': csrftoken,
    mode: 'opaque'
};

export default BankAPI;
