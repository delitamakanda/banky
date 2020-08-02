import AppDispatcher from '../dispatchers/main';
import AuthConstants from '../constants';
import history from '../utils/history';

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

        AppDispatcher.dispatch({
            actionType: AuthConstants.AUTHENTICATED_USER
        });
    }
};

