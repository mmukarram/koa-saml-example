const   Koa     = require('koa'),
        body    = require('koa-bodyparser'),
        session = require('koa-generic-session'),
        passport= require('./passport'),
        mount   = require('koa-mount'),
        router  = require('./routes');

const app = Koa();

app.keys = ['abc'];

app.use(body({extendTypes: {json: ['json', '**/json']}}));
app.use(session({key: 'test.cookie'}));
app.use(passport.initialize());
app.use(passport.session());

router.get('/login',
    passport.authenticate('saml',
        {
            successRedirect: '/',
            failureRedirect: '/login'
        })
);

// feide's openidp doesn't seem to take custom callback paths.
// using /login/callback for now
router.post('/login/callback',
    passport.authenticate('saml',
        {
            failureRedirect: '/',
            failureFlash: true
        }),
    function *consume() {
        this.redirect('/');
    }
);

app.use(mount(router.routes()));

app.listen(3000, () => console.log(`Listening on port 3000`));