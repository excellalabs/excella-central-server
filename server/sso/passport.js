var passport = require('passport');
var config = require('./ssoConfig');
var SamlStrategy = require('passport-saml').Strategy;

var samlOptions = {
    entryPoint: config.entryPoint,
    issuer: config.issuer,
    callbackUrl: config.callbackUrl,
    cert: config.cert,
    identifierFormat: null
};

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
        done(err, user);
});

passport.use(new SamlStrategy(samlOptions, function (profile, done) {
    return done(null, profile);
  }
));