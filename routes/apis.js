const express = require('express');
const router = express.Router();

router.use('/v1', require('./v1Apis'));

module.exports = router;