const Router = require('koa-router');

let route = Router();

route.get('/', function *() {
    if (this.isAuthenticated()) {
        this.body = {'authenticated': true};
        return void 0;
    }

    this.redirect('/login');
});

route.get('/profile', function *profile() {
    if (!this.isAuthenticated()) {
        this.redirect('/login');
        return;
    }

    this.body = { user: this.session.passport.user };
});

route.get('/logout', function *logout() {
    this.logout();
    // check if session is invalidated
    this.redirect('/');
});

module.exports = route;