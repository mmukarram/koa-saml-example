'use strict';

const   Saml    = require('passport-saml').Strategy,
        passport= require('koa-passport');


let conf = {
    path: '/saml/consume', // it appears feide ignores this.
    entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
    issuer: 'passport-saml',
    cert: null
};

function onSerialize(user, done) {
    done(null, user);
}

function onDeserialize(user, done) {
    done(null, user);
}

function onProfile(profile, done) {
    return done(null,
        {
            id: profile.uid,
            email: profile.email,
            displayName: profile.cn,
            firstName: profile.givenName,
            lastName: profile.sn
        });
}

let saml = new Saml(conf, onProfile);

passport.serializeUser(onSerialize);

passport.deserializeUser(onDeserialize);

passport.use(saml);

module.exports = passport;