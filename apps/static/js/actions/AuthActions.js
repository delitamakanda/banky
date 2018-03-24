import AppDispatcher from '../AppDispatcher';
import AuthConstants from '../constants';

let AuthActions = {

    logUserIn (profile, token) {
        AppDispatcher.dispatch({
            type: AuthConstants.LOGIN_USER,
            profile: profile,
            token: token
        });
    },

    logUserOut () {
        AppDispatcher.dispatch({
            type: AuthConstants.LOGOUT_USER
        });
    },

    signUser (token) {
        AppDispatcher.dispatch({
            type: AuthConstants.SIGNUP_USER,
            token: token
        })
    }
}

export default AuthActions;
