const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/customers', require('./customers'));
router.use('/pizzas', require('./pizzas'));

module.exports = router;
