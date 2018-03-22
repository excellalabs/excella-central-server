'use strict';

module.exports = function(Profile) {
  Profile.search = function(searchText, cb) {
    if (!searchText || searchText === '') {
      Profile.find({}, function(err, instance) {
        return cb(null, instance);
      });
    } else {
      Profile.find({where: {$text: {search: searchText}}}, function(err, instance) {
        return cb(null, instance);
      });
    }
  };

  Profile.remoteMethod (
    'search',
    {
      http: { path: '/search', verb: 'get' },
      accepts: { arg: 'searchText', type: 'string', http: { source: 'query' } },
      returns: { arg: 'profiles', type: 'array'}
    }
  );

};
