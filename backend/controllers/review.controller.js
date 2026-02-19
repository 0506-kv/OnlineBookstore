const { validationResult } = require('express-validator');
const reviewModel = require('../models/review.model');
const bookModel = require('../models/book.model');

module.exports.createReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { bookId, rating, comment } = req.body;

        const book = await bookModel.findById(bookId).select('_id sellerId');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const review = await reviewModel.create({
            bookId: book._id,
            sellerId: book.sellerId,
            userId: req.user._id,
            rating,
            comment
        });

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.updateReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rating, comment } = req.body;
        const updates = {};

        if (rating !== undefined) {
            updates.rating = rating;
        }
        if (comment !== undefined) {
            updates.comment = comment;
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No updates provided' });
        }

        const review = await reviewModel.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        Object.assign(review, updates);
        await review.save();

        res.status(200).json({ message: 'Review updated', review });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.deleteReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const review = await reviewModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.getBookReviews = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const reviews = await reviewModel
            .find({ bookId: req.params.bookId })
            .sort({ createdAt: -1 })
            .populate('userId', 'fullname')
            .populate('bookId', 'name author');

        res.status(200).json({ reviews });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.getMyReviews = async (req, res) => {
    try {
        const reviews = await reviewModel
            .find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .populate('bookId', 'name author');

        res.status(200).json({ reviews });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.getSellerReviews = async (req, res) => {
    try {
        const reviews = await reviewModel
            .find({ sellerId: req.seller._id })
            .sort({ createdAt: -1 })
            .populate('userId', 'fullname email')
            .populate('bookId', 'name author price');

        res.status(200).json({ reviews });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.getAdminReviews = async (req, res) => {
    try {
        const reviews = await reviewModel
            .find()
            .sort({ createdAt: -1 })
            .populate('userId', 'fullname email')
            .populate('sellerId', 'storename email')
            .populate('bookId', 'name author price');

        res.status(200).json({ reviews });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports.getRandomReviews = async (req, res) => {
    try {
        const count = await reviewModel.countDocuments();

        let reviews;
        if (count > 5) {
            reviews = await reviewModel.aggregate([
                { $sample: { size: 5 } },
                { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
                { $unwind: '$user' },
                {
                    $project: {
                        _id: 1,
                        rating: 1,
                        comment: 1,
                        'user.fullname': 1
                    }
                }
            ]);
        } else {
            reviews = await reviewModel.find()
                .limit(5)
                .populate('userId', 'fullname');
        }

        res.status(200).json({ reviews });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
