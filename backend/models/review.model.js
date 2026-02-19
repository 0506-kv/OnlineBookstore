const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'book', required: true, index: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'seller', required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true }
}, { timestamps: true });

const reviewModel = mongoose.model('review', reviewSchema);

module.exports = reviewModel;
