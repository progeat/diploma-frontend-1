const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/transactions', require('./transactions'));
router.use('/accounts', require('./accounts'));
router.use('/categories', require('./categories'));

module.exports = router;
