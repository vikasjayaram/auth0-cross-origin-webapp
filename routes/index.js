var express = require('express');
var passport = require('passport');
var router = express.Router();

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
  AUTH0_CLIENT_TITLE: process.env.AUTH0_CLIENT_TITLE,
  API_AUDIENCE: process.env.API_AUDIENCE || 'https://' + process.env.AUTH0_DOMAIN + '/userinfo'
};

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(process.env.API_AUDIENCE);
  console.log(env);
  res.render('index', { title: 'Express', env: env });
});

router.get('/login',
  function(req, res){
    res.render('login', { env: env });
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });

router.get('/co-verify',
  function(req, res){
    res.render('co-verify', { env: env });
  });

module.exports = router;
