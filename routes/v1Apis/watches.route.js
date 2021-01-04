const express = require('express');
const router = express.Router();

const jwtHandler = require('../../middlewares/jwt-auth.middleware');
const { admins } = require('../../middlewares/role-validator.middleware');
const { validateData, mongoIdInParam } = require('../../middlewares/data-validation');

const watchesController = require('../../controllers/index').v1.watchesController;
const locationsRouter = require('./location.route');

router.get('/', jwtHandler, admins, watchesController.getWatches);
router.post('/', jwtHandler, admins, watchesController.setWatch);
router.get('/:watchId', jwtHandler, admins, validateData([mongoIdInParam('watchId')]),
  watchesController.getWatchById);
// router.post('/:watchId/deactivate')
router.use('/:watchId/locations', locationsRouter);

module.exports = router;