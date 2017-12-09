'use strict';

module.exports = function(Account) {
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
};
