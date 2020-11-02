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

    dispatchLoginError: (error) => {
        console.log('Login error action dispatches to Store');

        AppDispatcher.dispatch({
            actionType: AuthConstants.LOGIN_USER_ERROR,
            error: error
        });
    },

	signup: (first_name, last_name, username, pwd, pwd2, email) => {
		AppDispatcher.dispatch({
            actionType: AuthConstants.SIGNUP_USER,
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: pwd,
            password2: pwd2,
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

    updateCurrentUser (user) {
        console.log('Update User action dispatches to Store');

        AppDispatcher.dispatchAsync(BankApi.updateUser(user), {
            request: AuthConstants.UPDATE_AUTHENTICATED_USER,
            success: AuthConstants.UPDATE_AUTHENTICATED_USER_SUCCESS,
            failure: AuthConstants.UPDATE_AUTHENTICATED_USER_ERROR
        }, { user });
    },

    updateDraft(field, value) {
        AppDispatcher.dispatch({
            type: AuthConstants.UPDATE_DRAFT,
            payload: {field, value}
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

