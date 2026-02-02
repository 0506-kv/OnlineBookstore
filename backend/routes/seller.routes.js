const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const sellerController = require('../controllers/seller.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('storename').isLength({ min: 3 }).withMessage('Store name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    sellerController.registerSeller
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    sellerController.loginSeller
)

router.get('/all', sellerController.allSellers);

module.exports = router;
