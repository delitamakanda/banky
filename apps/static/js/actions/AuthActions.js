import AppDispatcher from '../AppDispatcher';
import AuthConstants from '../constants';

let AuthActions = {
    
    login () {
        AppDispatcher.dispatch({
            type: AuthConstants.LOGIN_USER,
            username: '',
            password: '',
            token: token
        });
    },
	
	signup () {
		AppDispatcher.dispatch({
            type: AuthConstants.SIGNUP_USER,
            username: '',
            password: '',
			email: ''
        });
	}
	
	loggedIn () {
		AppDispatcher.dispatch({
            type: AuthConstants.CURRENT_USER,
			user: null
        });
	}
};

export default AuthActions;
