import AppDispatcher from '../dispatchers/main';
import AuthConstants from '../constants';

let AuthActions = {

    login () {
        AppDispatcher.dispatch({
            type: AuthConstants.LOGIN_USER,
            content: data
        });
    },

	signup () {
		AppDispatcher.dispatch({
            type: AuthConstants.SIGNUP_USER,
            content: data
        });
	},

	loggedIn () {
		AppDispatcher.dispatch({
            type: AuthConstants.CURRENT_USER,
			user: null
        });
	},

    logout () {
        AppDispatcher.dispatch({
            type: AuthConstants.LOGOUT_USER,
            user: null
        })
    }
};

export default AuthActions;
