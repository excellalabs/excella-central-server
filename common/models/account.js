'use strict';
var config = require('../../server/config.json');
var path = require('path');
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
    var text = 'Copy and paste this reset token into the Reset Password form in Excella Central: '
     + info.accessToken.id;

    Account.app.models.Email.send({
      to: info.email,
      from: info.email,
      subject: 'Password reset',
      text: text
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });

  Account.afterRemote('create', function(context, userInstance, next) {
    console.log('> user.afterRemote triggered');

    var options = {
      type: 'email',
      to: userInstance.email,
      from: 'central@excella.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      user: Account
    };

    userInstance.verify(options, function(err, response) {
        
        console.log('> verification email sent:', response);
    });
    next();
  });
};
