const express = require('express');
const router = express.Router();
const jwtHandler = require('../../middlewares/jwt-auth.middleware');
const verifyUser = require('../../middlewares/verify-user.middleware');
const { custom, roles } = require('../../middlewares/role-validator.middleware');
const { validateData, mongoIdInParam, mongoIdInBody, name } = require('../../middlewares/data-validation');

const parentsController = require('../../controllers/index').v1.parentsController;

// Get Parent Details
router.get('/:parentId', jwtHandler, custom([...roles.admins, ...roles.parents]), validateData([mongoIdInParam('parentId')]), verifyUser, parentsController.getParent);

// Get Kids Details by Parent ID
router.get('/:parentId/kids', jwtHandler, custom([...roles.admins, ...roles.parents]), validateData([mongoIdInParam('parentId')]), verifyUser, parentsController.getKids);

// Register kids details
router.post('/:parentId/kids', jwtHandler, custom([...roles.admins, ...roles.parents]),
  validateData([mongoIdInParam('parentId'), mongoIdInBody('watch'), name('name', true)]), verifyUser, parentsController.saveKids);

// Get List of registered watches
router.get('/:parentId/watches', jwtHandler, custom([...roles.admins, ...roles.parents]), validateData([mongoIdInParam('parentId')]), verifyUser, parentsController.getWatches);

// Register a watch
router.post('/:parentId/watches', jwtHandler, custom([...roles.admins, ...roles.parents]),
  validateData([mongoIdInParam('parentId'), mongoIdInBody('watchId')]), verifyUser, parentsController.saveWatch);

module.exports = router;
