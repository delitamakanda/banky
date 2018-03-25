import $ from 'jquery';

class AuthService {

    login (username, pass, cb) {
        if (localStorage.token) {
            if (cb) cb(true)
            return
        }
        this.getToken(username, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (cb) cb(true)
            } else {
                if (cb) cb(false)
            }
        })
    }

    logout () {
        delete localStorage.token
    }

    loggedIn () {
        return !!localStorage.token
    }

    getToken (username, pass, cb) {
        $.ajax({
            type: 'POST',
            url: '/api/obtain-auth-token/',
            data: {
                username: username,
                password: pass
            },
            success: function(res){
                cb({
                    authenticated: true,
                    token: res.token
                })
            },
            error: (xhr, status, err) => {
                cb({
                    authenticated: false
                })
            }
        })
    }
}

export default new AuthService();
