const express = require('express');
const UserController = require('../controllers/userController');
const { validateUser, validateUserUpdate, validateLogin} = require('../validators/userDTO');

const router = express.Router();

router.post('/', validateUser, UserController.createUser);
router.post('/login',validateLogin,UserController.loginUser);
router.get('/email/:email', UserController.getUserByEmail);
router.get('/:user_id', UserController.getUserByID);
router.get('/', UserController.getAllUsers);
router.put('/:user_id', validateUserUpdate, UserController.updateUser);
router.delete('/:user_id', UserController.deleteUser);

module.exports = router;