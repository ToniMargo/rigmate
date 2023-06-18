const router = require('express').Router();

const pizzasController = require('../controllers/pizzas');

// GET /feed/posts
router.get('/', pizzasController.getData);
// localhost:8080/pizzas/

router.get('/:id', pizzasController.getSingleData);
// localhost:8080/pizzas/id

router.post('/', pizzasController.createPizza);
// post pizza to localhost:8080/pizzas/

router.put('/:id', pizzasController.updatePizza);
// update pizza in localhost:8080/pizzas/

router.delete('/:id', pizzasController.deletePizza);
// delete pizza in localhost:8080/pizzas/

module.exports = router;
