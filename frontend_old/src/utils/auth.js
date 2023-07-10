import AuthStore from '../stores/AuthStore';

export default {
    getToken() {
        return localStorage.token;
    },

    loggedIn() {
        return AuthStore.isLoggedIn();
    },

    onChange() { }
}

