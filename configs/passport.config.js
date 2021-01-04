const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const { model: MODELS } = require('../constants');
// const logger = require('../generic/logger');
const User = mongoose.model(MODELS.User);

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.findOne({ email }).then((user) => {
    if (!user || !user.validPassword(password)) {
      return done(null, false, { errors: { 'email or password': 'is invalid' } });
    }
    return done(null, user);
  }).catch(done);
}));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// // Used to decode the received cookie and persist session
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });