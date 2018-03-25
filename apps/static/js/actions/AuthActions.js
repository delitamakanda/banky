import AppDispatcher from '../AppDispatcher';
import AuthConstants from '../constants';

let AuthActions = {

    logUserIn (token) {
        let saveToken = localStorage.getItem('token');

        AppDispatcher.dispatch({
            type: AuthConstants.LOGIN_USER,
            token: token
        });

        if (saveToken !== token) {
            localStorage.setItem('token', token);
        }
    },

    logUserOut () {
        localStorage.removeItem('token');
        AppDispatcher.dispatch({
            type: AuthConstants.LOGOUT_USER
        });
    },

    signupUser () {
        AppDispatcher.dispatch({
            type: AuthConstants.SIGNUP_USER
        })
    }
}

export default AuthActions;
