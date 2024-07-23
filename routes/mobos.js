const router = require('express').Router();

const mobosController = require('../controllers/mobos');

// GET /feed/posts
router.get('/', mobosController.getAllMobos);

router.get('/:id', mobosController.getSingleMobo);

router.post('/', mobosController.createMobo);

router.put('/:id', mobosController.updateMobo);

router.delete('/:id', mobosController.deleteMobo);

module.exports = router;
