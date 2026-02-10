const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname').isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long'),
    body('gender')
        .isIn(['male', 'female', 'other', 'prefer_not_say'])
        .withMessage('Gender must be one of male, female, other, prefer_not_say'),
    body('dateOfBirth')
        .isISO8601()
        .withMessage('Invalid date of birth'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

router.get('/all', userController.allUsers);
router.delete('/admin/:id', authMiddleware.authAdmin, userController.deleteUser);

module.exports = router;
