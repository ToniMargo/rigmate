const router = require('express').Router();

const ramsController = require('../controllers/rams');

// GET /feed/posts
router.get('/', ramsController.getAllRams);

router.get('/:id', ramsController.getSingleRam);

router.post('/', ramsController.createRam);

router.put('/:id', ramsController.updateRam);

router.delete('/:id', ramsController.deleteRam);

module.exports = router;
