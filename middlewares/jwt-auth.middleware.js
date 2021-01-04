const jwt = require('jsonwebtoken');
const apiHelper = require('../helpers/api.helper');
const SECRET = require('../configs/env.config').SECRET;

const jwtHandler = (req, res, next) => { // eslint-disable-line
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, SECRET, (err, result) => {
      if (err) {
        return apiHelper.failure(res, [err], 'Unauthorized access token.', 401);
      }
      req.user = result;
      return next();
    });
  } else {
    return next(); //apiHelper.failure(res, [], 'ACCESS_FORBIDDEN', 403);
  }
};

module.exports = jwtHandler;
