'use strict';
module.exports = function(Account) {
  var app = require('../../server/server');

  Account.checkAccountExists = function(email, cb) {
    if (!email || email === '') {
      return cb(null, false);
    }
    Account.find({where: {email: email}}, function(err, instance) {
      var accountExists = instance && instance.length > 0;
      return cb(null, accountExists);
    });
  };

  Account.remoteMethod (
    'checkAccountExists',
    {
      http: { path: '/checkAccountExists', verb: 'get' },
      accepts: { arg: 'email', type: 'string', http: { source: 'query' } },
      returns: { arg: 'doesAccountExist', type: 'boolean'}
    }
  );

  Account.checkProfileExists = function(email, cb) {
    var Profile = app.models.Profile;
    if (!email || email === '') {
      return cb(null, false);
    }
    Profile.find({where: {email: email}}, function(err, instance) {
      var profileExists = instance && instance.length > 0;
      return cb(null, profileExists);
    });
  };

  Account.remoteMethod (
    'checkProfileExists',
    {
      http: { path: '/checkProfileExists', verb: 'get' },
      accepts: { arg: 'email', type: 'string', http: { source: 'query' } },
      returns: { arg: 'doesProfileExist', type: 'boolean'}
    }
  );

  Account.on('resetPasswordRequest', function(info) {
    var text = `In order to reset your password for Excella Central click on this link: <a href="https://central.excellalabs.com/#/reset-password-form/token/${info.accessToken.id}">Reset Password</a>.\n\nIf you didn't request this reset, please ignore this email.\n\n\Have a lovely day,\n\n\The JavaScript Specialty Area`

    Account.app.models.Email.send({
      to: info.email,
      from: info.email,
      subject: 'Excella Central Password Reset',
      text: text
    }, function(err) {
      if (err) return console.log('> error ssending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });
};
