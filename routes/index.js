const express = require('express');
const router = express.Router();
const passport = require('passport');
const apiHelper = require('../helpers/api.helper');
const { model: MODELS } = require('../constants');

const mongoose = require('mongoose');
const User = mongoose.model(MODELS.User);

router.use('/apis', require('./apis'));

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user) => {
    if (err) {
      return apiHelper.failure(res, [err]);
    }
    if (user) {
      return apiHelper.success(res, { user: user.toJson('login') }, 'You have logged in successfully!.');
    }
    return apiHelper.failure(res, [], 'Invalid email or password!', 401);
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  try{
  let user = new User(req.body);
  user.setPassword(req.body.password);

  user = await user.save();

  apiHelper.success(res, { user: user.toJson() }, 'You have signed up successfully!.');
  } catch (err) {
    return apiHelper.failure(res, [err]);
  }
});

module.exports = router;