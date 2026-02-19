const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    line1: { type: String, required: true, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, index: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'seller', required: true, index: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true },
    bookName: { type: String, required: true, trim: true },
    bookAuthor: { type: String, trim: true },
    unitPrice: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    totalPrice: { type: Number, required: true, min: 0 },
    purchasedAt: { type: Date, default: Date.now },
    shippingAddress: { type: addressSchema, required: true },
    contactPhone: { type: String, trim: true },
    status: {
        type: String,
        enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'placed'
    },
    notes: { type: String, trim: true }
}, { timestamps: true });

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
