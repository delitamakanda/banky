import BaseStore from './BaseStore';
import AuthConstants from '../constants';
import jwt_decode from 'jwt-decode';

class AuthStore extends BaseStore {

    constructor () {
        super();
        this.subscribe(() => this.reduce.bind(this));
        this._user = null;
        this._token = null;
    }

    reduce(action) {
        switch (action.type) {
            case AuthConstants.LOGIN_USER:
                this._token = action.token;
                this._user = jwt_decode(this._token);
                this.emitChange();
                break;

            case AuthConstants.LOGOUT_USER:
                this._user = null;
                this.emitChange();
                break;

            case AuthConstants.SIGNUP_USER:
                break;

            default:
                break;
        };
    }

    get user() {
        return this._user;
    }

    get token() {
        return this._token;
    }

    isLoggedIn() {
        return !!this._user;
    }
}

export default new AuthStore();
