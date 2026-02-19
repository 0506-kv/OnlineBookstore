const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/place', [
    authMiddleware.authUser,
    body('bookId').isMongoId().withMessage('Valid bookId is required'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1').toInt(),
    body('shippingAddress.line1').isLength({ min: 1 }).withMessage('Address line1 is required'),
    body('shippingAddress.city').isLength({ min: 1 }).withMessage('City is required'),
    body('shippingAddress.state').isLength({ min: 1 }).withMessage('State is required'),
    body('shippingAddress.postalCode').isLength({ min: 1 }).withMessage('Postal code is required'),
    body('shippingAddress.country').isLength({ min: 1 }).withMessage('Country is required'),
], orderController.placeOrder);

router.post('/place-cart', [
    authMiddleware.authUser,
    body('shippingAddress.line1').isLength({ min: 1 }).withMessage('Address line1 is required'),
    body('shippingAddress.city').isLength({ min: 1 }).withMessage('City is required'),
    body('shippingAddress.state').isLength({ min: 1 }).withMessage('State is required'),
    body('shippingAddress.postalCode').isLength({ min: 1 }).withMessage('Postal code is required'),
    body('shippingAddress.country').isLength({ min: 1 }).withMessage('Country is required'),
], orderController.placeOrderFromCart);

router.get('/my', authMiddleware.authUser, orderController.getMyOrders);
router.get('/my/:id', authMiddleware.authUser, orderController.getMyOrderById);

router.get('/seller', authMiddleware.authSeller, orderController.getSellerOrders);
router.get('/seller/:id', authMiddleware.authSeller, orderController.getSellerOrderById);
router.patch('/seller/:id/status', [
    authMiddleware.authSeller,
    body('status')
        .isIn(['shipped', 'cancelled'])
        .withMessage('Status must be shipped or cancelled')
        .toLowerCase()
], orderController.updateSellerOrderStatus);

router.get('/admin/shipped', authMiddleware.authAdmin, orderController.getAdminShippedOrders);
router.get('/admin/delivered', authMiddleware.authAdmin, orderController.getAdminDeliveredOrders);
router.patch('/admin/:id/status', [
    authMiddleware.authAdmin,
    body('status')
        .isIn(['delivered'])
        .withMessage('Status must be delivered')
        .toLowerCase()
], orderController.updateAdminOrderStatus);

module.exports = router;
