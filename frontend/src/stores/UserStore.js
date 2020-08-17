import AppDispatcher from '../dispatchers/main';
import AccountConstants from '../constants';
import 'core-js';
import { ReduceStore } from 'flux/utils';
import update from 'react-addons-update';
import 'babel-polyfill';

class UserStore extends ReduceStore {

    getInitialState() {
        return {};
    }

    reduce(state, action) {
        switch (action.type) {
            case AccountConstants.AUTHENTICATED_USER_SUCCESS:
                return action.payload.response;

            case AccountConstants.UPDATE_AUTHENTICATED_USER:
                const user = this.getState();
                return update(this.getState(), {
                    [user]: {
                        $set: action.payload.user
                    }
                });

            case AccountConstants.UPDATE_AUTHENTICATED_USER_ERROR:
                const userIndex = this.getState();
                return update(this.getState(), {
                    [userIndex]: {
                        $set: action.payload.user
                    }
                });

        
            default:
                return state;
        }
    }
}

export default new UserStore(AppDispatcher);