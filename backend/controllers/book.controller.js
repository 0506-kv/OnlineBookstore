const bookModel = require('../models/book.model');
const { validationResult } = require('express-validator');

module.exports.createBook = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, author, price, description, category, isbn, dateOfPublishing } = req.body;

        const book = await bookModel.create({
            name,
            author,
            price,
            description,
            category,
            isbn,
            dateOfPublishing,
            sellerId: req.seller._id
        });

        res.status(201).json({ message: 'Book added successfully', book });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports.updateBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const updates = req.body;

        const book = await bookModel.findOne({ _id: bookId, sellerId: req.seller._id });

        if (!book) {
            return res.status(404).json({ message: 'Book not found or unauthorized' });
        }

        Object.assign(book, updates);
        await book.save();

        res.status(200).json({ message: 'Book updated successfully', book });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports.deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;

        const book = await bookModel.findOneAndDelete({ _id: bookId, sellerId: req.seller._id });

        if (!book) {
            return res.status(404).json({ message: 'Book not found or unauthorized' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports.getSellerBooks = async (req, res, next) => {
    try {
        const books = await bookModel.find({ sellerId: req.seller._id });
        res.status(200).json({ books });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


module.exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await bookModel.find().populate('sellerId', 'storename email');
        res.status(200).json({ books });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports.getRandomBooks = async (req, res, next) => {
    try {
        const books = await bookModel.aggregate([
            { $sample: { size: 4 } },
            {
                $lookup: {
                    from: 'sellers',
                    localField: 'sellerId',
                    foreignField: '_id',
                    as: 'seller'
                }
            },
            {
                $unwind: '$seller'
            },
            {
                $project: {
                    name: 1,
                    author: 1,
                    price: 1,
                    description: 1,
                    category: 1,
                    isbn: 1,
                    'seller.storename': 1,
                    'seller.location': 1
                }
            }
        ]);
        res.status(200).json({ books });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}
