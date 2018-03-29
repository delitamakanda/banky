import AppDispatcher from '../AppDispatcher';
import AuthConstants from '../constants';

let AuthActions = {
    
    login() {
        AppDispatcher.dispatch({
            type: AuthConstants.LOGIN_USER,
            username: '',
            password: '',
            token: token
        });
    },

    
};

export default AuthActions;
