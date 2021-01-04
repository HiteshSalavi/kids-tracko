// Super Admins
var SUPER_ADMINS = {
  SUPER_ADMIN: 'SUPER_ADMIN',  // All Power Super Admin
  // SUPER_ADMIN_L1: 'SUPER_ADMIN_L1'  // Assistant Super Admin equvivalent Role, < Super Admin, > all other roles
};
var SUPER_ADMIN_ROLES = Object.keys(SUPER_ADMINS);  // All the Super Admin roles

// Admins
var ADMINS = {
  ADMIN_L1: 'ADMIN_L1',
  ADMIN_L2: 'ADMIN_L2',
  // ...
};
var ADMIN_ROLES = Object.keys(ADMINS);  // All the admin Roles

// Parents
var PARENTS = {
  PARENT_L1: 'PARENT_L1',
  PARENT_L2: 'PARENT_L2'
};
var PARENT_ROLES = Object.keys(PARENTS);

/// Kids Roles
// ------------

var ALL_ROLES_ENUM = [
  ...SUPER_ADMIN_ROLES,
  ...ADMIN_ROLES,
  ...PARENT_ROLES
  // Kids Roles
];

module.exports = {
  SUPER_ADMIN: SUPER_ADMINS.SUPER_ADMIN,

  ADMIN_L1: ADMINS.ADMIN_L1,
  ADMIN_L2: ADMINS.ADMIN_L2,

  PARENT_L1: PARENTS.PARENT_L1,
  PARENT_L2: PARENTS.PARENT_L2,

  ALL_SUPER_ADMINS: [ SUPER_ADMINS.SUPER_ADMIN],
  ALL_ADMINS: [ SUPER_ADMINS.SUPER_ADMIN, ADMINS.ADMIN_L1, ADMINS.ADMIN_L2 ],
  ALL_PARENTS: [ PARENTS.PARENT_L1, PARENTS.PARENT_L2 ],

  ALL_ROLES_ENUM: ALL_ROLES_ENUM
};