const { body, query, param, oneOf } = require('express-validator');

const name = (name, isRequired) => isRequired ? body(name).exists().isString().notEmpty() : body(name).exists().isString();
const email = name => body(name).exists().isEmail();
const phoneNo = (name, isRequired) => isRequired ? body(name).exists().isNumeric({no_symbols: true}).isLength({min: 10, max: 10}) : body(name).isNumeric({no_symbols: true}).isLength({min: 10, max: 10});
const mongoIdInBody = name => body(name).exists().isString().isLength({min: 24, max: 24});
const mongoIdInQuery = name => query(name).exists().isString().isLength({min: 24, max: 24});
const mongoIdInParam = name => param(name).exists().isString().isLength({min: 24, max: 24});

const validateData = toValidateArray => oneOf([toValidateArray]);

module.exports = {
  name: name,
  email: email,
  phoneNo: phoneNo,
  mongoIdInBody: mongoIdInBody,
  mongoIdInQuery: mongoIdInQuery,
  mongoIdInParam: mongoIdInParam,
  validateData: validateData,
};