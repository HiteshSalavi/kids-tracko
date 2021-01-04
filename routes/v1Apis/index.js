const express = require('express');
const router = express.Router();
// const locationRoute = require('./location.route');

router.use('/parents', require('./parents.route'));
router.use('/watches', require('./watches.route'));

module.exports = router;
