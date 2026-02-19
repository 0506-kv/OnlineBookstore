const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/add', [
    authMiddleware.authUser,
    body('bookId').isMongoId().withMessage('Valid bookId is required'),
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5')
        .toInt(),
    body('comment')
        .isLength({ min: 1 })
        .withMessage('Comment is required')
], reviewController.createReview);

router.get('/admin', authMiddleware.authAdmin, reviewController.getAdminReviews);

router.get('/seller', authMiddleware.authSeller, reviewController.getSellerReviews);

router.get('/my', authMiddleware.authUser, reviewController.getMyReviews);

router.get('/random', reviewController.getRandomReviews);

router.get('/book/:bookId', [
    param('bookId').isMongoId().withMessage('Valid bookId is required')
], reviewController.getBookReviews);

router.patch('/:id', [
    authMiddleware.authUser,
    param('id').isMongoId().withMessage('Valid review id is required'),
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5')
        .toInt(),
    body('comment')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Comment cannot be empty')
], reviewController.updateReview);

router.delete('/:id', [
    authMiddleware.authUser,
    param('id').isMongoId().withMessage('Valid review id is required')
], reviewController.deleteReview);

module.exports = router;
