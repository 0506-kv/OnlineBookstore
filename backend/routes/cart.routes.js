const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const cartController = require('../controllers/cart.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/add', [
    authMiddleware.authUser,
    body('bookId').isMongoId().withMessage('Valid bookId is required'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1').toInt(),
], cartController.addToCart);

router.get('/my', authMiddleware.authUser, cartController.getMyCart);

module.exports = router;
