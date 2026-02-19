const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const bookController = require('../controllers/book.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/add', [
    authMiddleware.authSeller,
    body('name').isLength({ min: 1 }).withMessage('Book name is required'),
    body('author').isLength({ min: 1 }).withMessage('Author name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
], bookController.createBook);

router.put('/update/:id', authMiddleware.authSeller, bookController.updateBook);

router.delete('/delete/:id', authMiddleware.authSeller, bookController.deleteBook);

router.get('/sell', authMiddleware.authSeller, bookController.getSellerBooks);

router.get('/random', bookController.getRandomBooks);

router.get('/all', bookController.getAllBooks);

module.exports = router;
