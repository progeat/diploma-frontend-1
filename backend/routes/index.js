const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/transactions', require('./transactions'));

module.exports = router;
