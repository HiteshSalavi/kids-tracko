const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../configs/env.config').SECRET;
const { model: MODELS, global: GLOBAL } = require('../constants');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  hash: String,
  salt: String,
  userType: {
    type: String,
    enum: GLOBAL.USER_TYPES,
    default: GLOBAL.DEFAULT_VALUES.PARENT,
  },
  watches: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: MODELS.Watch,
    index: true,
  },
  kids: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: MODELS.Kid,
    index: true,
  }
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

// NOTE: DON'T USE arrow functions while defining methods on mongoose schema
UserSchema.methods.validPassword = function (password) { // eslint-disable-line
  const hash = crypto.pbkdf2Sync(password.toString(), this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) { // eslint-disable-line
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

// UserSchema.methods.generateBasicAuthToken = function () { // eslint-disable-line
//   const today = new Date();
//   const exp = new Date(today);
//   exp.setDate(today.getDate() + 100000000);

//   return jwt.sign({
//     id: this._id, // eslint-disable-line
//     email: this.email,
//     role: this.userType,
//     vendor: this.restaurantDetails || undefined,
//     exp: parseInt(exp.getTime() / 1000, 10),
//   }, secret);
// };

UserSchema.methods.toJson = function (actionType) { // eslint-disable-line
  const obj = {
    _id: this._id, // eslint-disable-line
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    contactNo: this.contactNo,
    isActive: this.isActive,
    userType: this.userType,
    watches: this.watches,
    kids: this.kids
  };

  if (actionType === 'login') {
    obj.token = this.generateJWT();
  }

  delete obj.hash;
  delete obj.salt;

  return obj;
};

UserSchema.methods.generateJWT = function () { // eslint-disable-line
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id, // eslint-disable-line
    email: this.email,
    role: this.userType,
    vendor: this.restaurantDetails || undefined,
    exp: parseInt(exp.getTime() / 1000, 10),
  }, secret);
};

UserSchema.index({ email: 'text', firstName: 'text', lastName: 'text' });

mongoose.model(MODELS.User, UserSchema);
