// Only used when jwtHandler is in place.
// When Parent ID is part of the API Endpoint
// Comes After jwtHandler

// Inefficient approach is being used as of now.

const { acl } = require('../constants');
const apiHelper = require('../helpers/api.helper');

const verifyUser = (req, res, next) => { // eslint-disable-line
  if (req.originalUrl.includes(req.user.id) || acl.ALL_ADMINS.includes(req.user.role)) {
    return next();
  } else {
    return apiHelper.failure(res, ['ID Mismatch'], 'ACCESS_FORBIDDEN', 403);
  }
};

module.exports = verifyUser;
