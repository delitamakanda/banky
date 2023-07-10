import AppDispatcher from '../dispatchers/main';
import AccountConstants from '../constants';
import 'core-js';
import { ReduceStore } from 'flux/utils';
import 'babel-polyfill';

class AccountStore extends ReduceStore {

    getInitialState() {
        return [];
    }

    reduce(state, action) {
        switch (action.type) {

            case AccountConstants.CREATED_ACCOUNT_SUCCESS:
                return action.payload.response;
        
            default:
                return state;
        }
    }
}

export default new AccountStore(AppDispatcher);