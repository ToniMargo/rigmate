const router = require('express').Router();

const rigsController = require('../controllers/rigs');

// GET /feed/posts
router.get('/', rigsController.getAllRigs);
// localhost:8080/rigs/

router.get('/:id', rigsController.getSingleRig);
// localhost:8080/rigs/

module.exports = router;
