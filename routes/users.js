const router = require('express').Router();

const usersController = require('../controllers/users');
const rigController = require('../controllers/rigs');

// GET /feed/posts
router.get('/', usersController.getAllUsers);
// localhost:8080/users/

router.get('/:id', usersController.getSingleUser);
// localhost:8080/users/id

router.post('/', usersController.createUser);
// post user to localhost:8080/users/

router.put('/:id', usersController.updateUser);
// update user in localhost:8080/users/

router.delete('/:id', usersController.deleteUser);
// delete user in localhost:8080/users/

router.get('/:id/rig', rigController.getSingleRig);

router.post('/:id/rig', usersController.createRig);

router.put('/:id/rig', usersController.updateRig);

router.delete('/:id/rig', usersController.deleteRig);

module.exports = router;
