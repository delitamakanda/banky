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
                return update(this.getState(), {
                    $set: action.payload.user
                });

            case AccountConstants.UPDATE_AUTHENTICATED_USER_ERROR:
                return update(this.getState(), {
                    $set: action.payload.user
                });

            case AccountConstants.UPDATE_DRAFT:
                return update(this.getState(), {
                    [action.payload.field]: {
                        $set: action.payload.value
                    }
                });


            default:
                return state;
        }
    }
}

export default new UserStore(AppDispatcher);