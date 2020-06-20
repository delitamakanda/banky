
import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../dispatchers/main';
import AuthConstants from '../constants';


class AuthStore extends ReduceStore {

    getInitialState() {
        
    }

    reduce(state, action) {
        switch (action.type) {
            case AuthConstants.LOGIN_USER:
                break;

            case AuthConstants.SIGNUP_USER:
                break;

            case AuthConstants.CURRENT_USER:
                break;

            case AuthConstants.LOGOUT_USER:
                break;

            default:
                break;
        }
    }
}

export default new AuthStore(AppDispatcher);
