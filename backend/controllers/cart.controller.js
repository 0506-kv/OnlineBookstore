const { validationResult } = require('express-validator');
const cartModel = require('../models/cart.model');
const bookModel = require('../models/book.model');

module.exports.addToCart = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { bookId, quantity = 1 } = req.body;
        const qty = Number(quantity) || 1;

        const book = await bookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        let cart = await cartModel.findOne({ userId: req.user._id });
        const itemPayload = {
            bookId: book._id,
            sellerId: book.sellerId,
            bookName: book.name,
            bookAuthor: book.author,
            unitPrice: book.price,
            quantity: qty
        };

        if (!cart) {
            cart = await cartModel.create({
                userId: req.user._id,
                items: [itemPayload]
            });
            return res.status(201).json({ message: 'Added to cart', cart });
        }

        const existingIndex = cart.items.findIndex(
            (item) => String(item.bookId) === String(book._id)
        );

        if (existingIndex >= 0) {
            cart.items[existingIndex].quantity += qty;
            cart.items[existingIndex].unitPrice = book.price;
        } else {
            cart.items.push(itemPayload);
        }

        await cart.save();
        res.status(200).json({ message: 'Added to cart', cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.getMyCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId: req.user._id });
        res.status(200).json({ cart: cart || { userId: req.user._id, items: [] } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.updateCartItem = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { bookId, quantity } = req.body;
        const qty = Number(quantity);

        const cart = await cartModel.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find((entry) => String(entry.bookId) === String(bookId));
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        item.quantity = qty;
        await cart.save();
        res.status(200).json({ message: 'Cart updated', cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.removeCartItem = async (req, res) => {
    try {
        const { bookId } = req.params;
        const cart = await cartModel.findOne({ userId: req.user._id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const nextItems = cart.items.filter((entry) => String(entry.bookId) !== String(bookId));
        if (nextItems.length === cart.items.length) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cart.items = nextItems;
        await cart.save();
        res.status(200).json({ message: 'Item removed', cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
