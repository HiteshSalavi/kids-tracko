// roles should be an array of ADMIN , PARENT

const { acl } = require('../constants');
const apiHelper = require('../helpers/api.helper');

const validateRoles = roles => {
  return (req, res, next) => {
    if ( roles.includes(req.user.role) ) {
      return next();
    } else {
      return apiHelper.failure(res, ['Not allowed to access requested resource.'], 'ACCESS_VALIDATION', 403);
    }
  };
};

module.exports = {
  all: validateRoles(acl.ALL_ROLES_ENUM),
  superAdmins: validateRoles(acl.ALL_SUPER_ADMINS),
  admins: validateRoles(acl.ALL_ADMINS),
  parents: validateRoles(acl.ALL_PARENTS),

  custom: roles => validateRoles(roles),
  roles: {
    admins: acl.ALL_ADMINS, // Super Admins are included
    parents: acl.ALL_PARENTS, // Admins and Super Admins are excluded
    superAdmins: acl.SUPER_ADMIN // Supwer Admins only
  }
};
