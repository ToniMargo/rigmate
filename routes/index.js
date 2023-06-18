const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/customers', require('./customers'));
router.use('/pizzas', require('./pizzas'));
// router.use('/orders', require('./orders'));

module.exports = router;
