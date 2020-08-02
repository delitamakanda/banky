
import AppDispatcher from '../dispatchers/main';
import AuthConstants from '../constants';
import 'core-js';
import BaseStore from './BaseStore';
import BankAPI from '../api/BankApi';
import history from '../utils/history';

class AuthStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this.registerToActions.bind(this));
        this.getUser = this.getUser.bind(this);

        this._user = null;
        this._jwt = null;
    }

    async registerToActions(action) {
        console.log(action);
        switch(action.actionType) {
            case AuthConstants.LOGIN_USER:
                const data = await BankAPI.login(action.username, action.password);
                const response = await data.json();

                if (data.ok) {
                    console.log('Log in successfully');
                    
                    // Create token
                    const token = response.token;
                    
                    // Set token to localStorage to use for authenticated requests
                    localStorage.token = token;

                    // Set state
                    this._jwt = token;

                    history.push('/dashboard');
                }

                this.emitChange();
                break;

            case AuthConstants.LOGOUT_USER:
                console.log('Store receives Logout action');

                delete localStorage.token;
                this._user = null;
                this._jwt = null;

                history.push('/login');

                this.emitChange();
                break;
            case AuthConstants.SIGNUP_USER:
                console.log('Store receives signup action');

                const user = await BankAPI.signup(action.first_name, action.last_name, action.username, action.password, action.email);

                if (user.ok) {
                    console.log('Signup successfully');

                    history.push('/');

                }

                this.emitChange();
                break;
            case AuthConstants.AUTHENTICATED_USER:
                console.log('Store receives user action');
                this.getUser();
                break;

            default:
                break;
        };
    }

    // Get Method
    get user() { 
        return this._user;
    }

    get jwt() { 
        return this._jwt;
    }

    // Set Method
    set user(user) {
        this._user = user;
    }

    set jwt(jwt) {
        this._jwt = jwt;
    }

    // Check user logged in
    isLoggedIn() {
        if (typeof localStorage.token != 'undefined') {
            try {
                // eslint-disable-next-line
                const decoded = localStorage.token;
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
        return false;
    }

    async getUser() {
        const currentUser = await BankAPI.getUser();
        const responseUser = await currentUser.json();

        if (currentUser.ok) {
            this._user = responseUser;
            // console.log(this._user);
        }
        this.emit('updated');
    }

    /* reduce(state, action) {
        switch (action.type) {
            case AuthConstants.CREATED_ACCOUNT:
                break;
            case AuthConstants.LOGIN_USER:
                break;

            case AuthConstants.SIGNUP_USER:
                break;

            case AuthConstants.CURRENT_USER:
                break;

            case AuthConstants.LOGOUT_USER:
                break;

            default:
                return state;
        }
    } */

    
}

export default new AuthStore(AppDispatcher);
