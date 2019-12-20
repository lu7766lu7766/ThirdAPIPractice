var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/success',function(req, res, next){
  console.log('user', req.user)
  res.render('success', { user: req.user });
});

router.get('/signout', function (req, res) {
  req.logout()
  res.redirect('/')
})


router.get('/auth/facebook', passport.authenticate('facebook'),function(err){
  console.log(err);
});

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/success',
    failureRedirect: '/error'
  }
  // ,function(req, res) {
  //   // Successful authentication, redirect home.
  //
  //   console.log('user', req.user)
  //   console.log('profile', req.profile)
  //   // res.redirect('/');
  // }
  ));

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] },function(err){
  console.log(err);
}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/error'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('user', req.user)
    console.log('profile', req.profile)
    res.redirect('/');
  });

router.get('/error', function(req, res, next) {
  res.send("Error logging in.");
});

module.exports = router;