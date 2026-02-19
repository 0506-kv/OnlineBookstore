const { validationResult } = require('express-validator');
const orderModel = require('../models/order.model');
const bookModel = require('../models/book.model');
const cartModel = require('../models/cart.model');

module.exports.placeOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { bookId, quantity = 1, shippingAddress, contactPhone, notes } = req.body;

        const book = await bookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const qty = Number(quantity) || 1;
        const unitPrice = book.price;
        const totalPrice = unitPrice * qty;

        const order = await orderModel.create({
            userId: req.user._id,
            sellerId: book.sellerId,
            bookId: book._id,
            bookName: book.name,
            bookAuthor: book.author,
            unitPrice,
            quantity: qty,
            totalPrice,
            shippingAddress,
            contactPhone,
            notes
        });

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.placeOrderFromCart = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { shippingAddress, contactPhone, notes } = req.body;

        const cart = await cartModel.findOne({ userId: req.user._id });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const bookIds = cart.items.map((item) => item.bookId);
        const books = await bookModel.find({ _id: { $in: bookIds } });
        if (books.length !== cart.items.length) {
            return res.status(404).json({ message: 'One or more books are no longer available' });
        }

        const bookMap = new Map(books.map((book) => [String(book._id), book]));
        const orderPayloads = cart.items.map((item) => {
            const book = bookMap.get(String(item.bookId));
            const quantity = Number(item.quantity) || 1;
            const unitPrice = book.price;

            return {
                userId: req.user._id,
                sellerId: book.sellerId,
                bookId: book._id,
                bookName: book.name,
                bookAuthor: book.author,
                unitPrice,
                quantity,
                totalPrice: unitPrice * quantity,
                shippingAddress,
                contactPhone,
                notes
            };
        });

        const orders = await orderModel.insertMany(orderPayloads);
        cart.items = [];
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', orders });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.getMyOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.getMyOrderById = async (req, res) => {
    try {
        const order = await orderModel.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.getSellerOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ sellerId: req.seller._id })
            .sort({ createdAt: -1 })
            .populate('userId', 'fullname email')
            .populate('bookId', 'name author price');
        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.getSellerOrderById = async (req, res) => {
    try {
        const order = await orderModel
            .findOne({ _id: req.params.id, sellerId: req.seller._id })
            .populate('userId', 'fullname email')
            .populate('bookId', 'name author price');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.updateSellerOrderStatus = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { status } = req.body;
        const order = await orderModel.findOne({ _id: req.params.id, sellerId: req.seller._id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order updated', order });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.getAdminShippedOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ status: 'shipped' })
            .sort({ createdAt: -1 })
            .populate('userId', 'fullname email')
            .populate('sellerId', 'storename email')
            .populate('bookId', 'name author price');

        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.getAdminDeliveredOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ status: 'delivered' })
            .sort({ createdAt: -1 })
            .populate('userId', 'fullname email')
            .populate('sellerId', 'storename email')
            .populate('bookId', 'name author price');

        res.status(200).json({ orders });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.updateAdminOrderStatus = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { status } = req.body;
        const order = await orderModel.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.status !== 'shipped') {
            return res.status(400).json({ message: 'Only shipped orders can be delivered' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order updated', order });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
