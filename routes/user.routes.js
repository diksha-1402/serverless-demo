const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/auth.middleware');
// User routes
router.post('/user-create', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/user-listing',authenticateToken, userController.getUsers);
router.get('/user-detail',authenticateToken, userController.getUserDetail);
router.patch('/user-edit',authenticateToken, userController.editUserDetail);
router.delete('/user-delete',authenticateToken, userController.deleteUser);

module.exports = router;
