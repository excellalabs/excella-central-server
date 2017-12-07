module.exports = function(app) {
    app.get('/verified', function(req, res) {
      res.send('Your account is verified!');
    });
  }