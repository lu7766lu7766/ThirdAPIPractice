var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config()

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    callbackURL: process.env.HOST + '/auth/facebook/callback',
    // profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function (accessToken, refreshToken, profile, done) {
    console.dir(profile)
    return done(null, profile);
  }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST + '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    console.dir(profile)
    return done(null, profile);
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

module.exports = passport;