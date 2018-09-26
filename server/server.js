'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
//var AuthenticationController = require('./controllers/authentication');
var http = require('http');
//var passport = require('./sso/passport');
var app = module.exports = loopback();
//var ssoAuth = passport.authenticate('saml', {session: false});

function redirector(application) {
  return (req, res) => {
    if(req.headers['x-forwarded-proto'] === 'https' || req.headers['x-forwarded-port'] === '443') {
      application(req, res)
    } else if (req.url.indexOf('/healthCheck') === 0) {
      res.end('Hello, world!')
    } else {
      res.writeHead(301,
        { Location: `https://central.excellalabs.com${req.url}` }
      )
      res.end()
    }
  }
}

//app.get('/ssoauth', ssoAuth, AuthenticationController.ssoAuthentication);
app.use(passport.initialize());
app.use(passport.session());

app.start = function(forceHttps) {
  if(forceHttps === undefined) {
    forceHttps = process.env.NODE_ENV === 'production';
  }

  const protocol = forceHttps ? 'https' : 'http';
  const baseUrl = `${protocol}://${app.get('host')}:${app.get('port')}`;

  let server;
  if(forceHttps) {
    server = http.createServer(redirector(app));
  } else {
    server = http.createServer(app)
  }

  return server.listen(app.get('port'), function() {
    app.emit('started');
    console.log(`Web server listening at: ${baseUrl}`);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log(`Browse your REST API at ${baseUrl}${explorerPath}`);
    }
  });
};



// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
