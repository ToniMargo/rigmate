const router = require('express').Router();

const cpusController = require('../controllers/cpus');

// GET /feed/posts
router.get('/', cpusController.getAllCpus);

router.get('/:id', cpusController.getSingleCpu);

router.post('/', cpusController.createCpu);

router.put('/:id', cpusController.updateCpu);

router.delete('/:id', cpusController.deleteCpu);

module.exports = router;
