'use strict';
var config = require('../../server/config.json');
var path = require('path');

module.exports = function(Account) {
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
    
        userInstance.verify(options, function(err, response, next) {
            if (err) return next(err);
            
            console.log('> verification email sent:', response);
    
            return response;
        });
      });
}
