const router = require('express').Router();

// database manipulation
router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/rigs', require('./rigs'));

module.exports = router;
