import AppDispatcher from '../dispatchers/main';
import AuthConstants from '../constants';
import history from '../utils/history';
// import { throttle } from '../utils/misc';
import BankApi from '../api/BankApi';

export default {

    login: (username, password) => {
        console.log('Login action dispatches to Store');

        AppDispatcher.dispatch({
            actionType: AuthConstants.LOGIN_USER,
            username: username,
            password: password
        });
    },

	signup: (first_name, last_name, username, pwd, email) => {
		AppDispatcher.dispatch({
            actionType: AuthConstants.SIGNUP_USER,
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: pwd,
            email: email
        });
	},

	loggedIn: (jwt) => {
        console.log('Login action dispatches to Store');

		AppDispatcher.dispatch({
            actionType: AuthConstants.CURRENT_USER,
			jwt: jwt
        });

        history.push('/dashboard');
	},

    logout () {
        console.log('Logout action dispatches to Store');

        AppDispatcher.dispatch({
            actionType: AuthConstants.LOGOUT_USER
        });
    },
    
    getCurrentUser () {
        console.log('User action dispatches to Store');

        AppDispatcher.dispatchAsync(BankApi.getUser(), {
            request: AuthConstants.AUTHENTICATED_USER,
            success: AuthConstants.AUTHENTICATED_USER_SUCCESS,
            failure: AuthConstants.AUTHENTICATED_USER_ERROR
        });
    },

    fetchAccountUser () {
        console.log('Account action dispatches to Store');

        AppDispatcher.dispatchAsync(BankApi.getAccount(), {
            request: AuthConstants.CREATED_ACCOUNT,
            success: AuthConstants.CREATED_ACCOUNT_SUCCESS,
            failure: AuthConstants.CREATED_ACCOUNT_ERROR
        });
    }
};

