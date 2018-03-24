import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import AuthConstants from '../constants';

class AuthStore extends ReduceStore {

    getInitialState() {
        return null;
    }

    reduce(state, action) {
        switch (action.type) {
            case AuthConstants.LOGIN_USER:
                return null;

            case AuthConstants.LOGOUT_USER:
                return null;


            case AuthConstants.SIGNUP_USER:
                return null;

            default:
                return state;
        }
    }
}

export default new AuthStore(AppDispatcher);
