import AppDispatcher from '../dispatchers/main';
import AccountConstants from '../constants';
import 'core-js';
import { ReduceStore } from 'flux/utils';
import 'babel-polyfill';

class UserStore extends ReduceStore {

    getInitialState() {
        return {};
    }

    reduce(state, action) {
        switch (action.type) {
            case AccountConstants.AUTHENTICATED_USER_SUCCESS:
                return action.payload.response;

        
            default:
                return state;
        }
    }
}

export default new UserStore(AppDispatcher);