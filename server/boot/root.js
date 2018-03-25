'use strict';
var path = require('path');
module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.set('view engine', 'ejs');
  server.set('views', path.join(__dirname, '../views'));
  server.use(router);
};
