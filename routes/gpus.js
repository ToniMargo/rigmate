const router = require('express').Router();

const gpusController = require('../controllers/gpus');

// GET /feed/posts
router.get('/', gpusController.getAllGpus);

router.get('/:id', gpusController.getSingleGpu);

router.post('/', gpusController.createGpu);

router.put('/:id', gpusController.updateGpu);

router.delete('/:id', gpusController.deleteGpu);

module.exports = router;
