const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'seller', required: true },
    bookName: { type: String, required: true, trim: true },
    bookAuthor: { type: String, trim: true },
    unitPrice: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    addedAt: { type: Date, default: Date.now }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true, index: true },
    items: { type: [cartItemSchema], default: [] }
}, { timestamps: true });

const cartModel = mongoose.model('cart', cartSchema);

module.exports = cartModel;
