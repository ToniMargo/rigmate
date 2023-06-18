const router = require('express').Router();

const customersController = require('../controllers/customers');

// GET /feed/posts
router.get('/', customersController.getData);
// localhost:8080/customers/

router.get('/:id', customersController.getSingleData);
// localhost:8080/customers/id

router.post('/', customersController.createCustomer);
// post customer to localhost:8080/customers/

router.put('/:id', customersController.updateCustomer);
// update customer in localhost:8080/customers/

router.delete('/:id', customersController.deleteCustomer);
// delete customer in localhost:8080/customers/

module.exports = router;
