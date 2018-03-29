
import { ReduceStore } from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import AuthConstants from '../constants';

class AuthStore extends ReduceStore {

    getInitialState() {
        return;
    }

    reduce(state, action) {
        switch (action.type) {
            case AuthConstants.LOGIN_USER:
                return;
            
            case AuthConstants.SIGNUP_USER:
                return;
            

            case AuthConstants.CURRENT_USER:
                return;
                
            default:
                return state;
        }
    }
}

export default new AuthStore(AppDispatcher);
