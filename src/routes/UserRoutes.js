const { Router } = require('express');
const path = require('path');
const userController = require('../Controller/UserController');
const permissionCheck = require('../MiddleWares/permissionCheck');
const middleAuth = require('../MiddleWares/AuthMiddle');
const router = Router();

router.post('/login', userController.login); // Login route
router.get('/logout', userController.logout); // Logout route
router.post('/register', userController.register); // User registration route
router.get('/delete-moderator/:id', permissionCheck.verifyUserPermission('ADMIN'), userController.deleteModerator); // Route to delete moderator (only ADMIN can delete)
router.post('/inv-status/:id', permissionCheck.verifyUserPermission('ADMIN'), userController.updateUserStatus); // Route to activate/deactivate user status (only ADMIN can change status)
router.post('/change-perm/:id', permissionCheck.verifyUserPermission('ADMIN'), userController.updateUserPermission); // Route to change user permissions (only ADMIN can change permissions)

module.exports = router;
