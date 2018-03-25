import request from 'reqwest';
import when from 'when';
import AuthActions from './actions/AuthActions';
import AuthConstants from './constants';

class AuthService {

    login(username, password) {
        return this.handleAuth(when(request({
            url: 'api/users/i',
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                username,
                password
            }
        })));
    }

    logout() {
        AuthActions.logUserOut();
    }

    signup(username, password, extra) {
        return this.handleAuth(when(request({
            url: 'api/signup/',
            method: 'POST',
            crossOrigin: true,
            type: 'json',
            data: {
                username,
                password,
                extra
            }
        })));
    }

    handleAuth(loginPromise) {
        return loginPromise
            .then(function(response) {
                var token = response.auth_token;
                AuthActions.logUserIn(token);
                return true;
            });
    }
}

export default new AuthService();
