import AppDispatcher from '../AppDispatcher';
import AuthConstants from '../constants';

let AuthActions = {
    
    login() {
        AppDispatcher.dispatch({
            type: AuthConstants.login,
            username: '',
            password: '',
            token: token
        });
    },

    
};

export default AuthActions;
