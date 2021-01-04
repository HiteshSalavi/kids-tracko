const acl = require('./acl.constants');

module.exports = {
  USER_TYPES: acl.ALL_ROLES_ENUM,
  DEFAULT_VALUES: {
    PARENT: acl.PARENT_L1,
    ADMIN: acl.ADMIN_L1
  }
};