import AppDispatcher from '../dispatchers/main';
import ActionsAccountConstants from '../constants';
import 'core-js';
import { ReduceStore } from 'flux/utils';
import 'babel-polyfill';

class ActionsAccountStore extends ReduceStore {

    getInitialState() {
        return [];
    }

    reduce(state, action) {
        switch (action.type) {

            case ActionsAccountConstants.CREATED_ACTIONS_ACCOUNT_SUCCESS:
                return action.payload.response;
        
            default:
                return state;
        }
    }
}

export default new ActionsAccountStore(AppDispatcher);