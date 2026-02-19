//run this command to seed the database with sellers and books. Use --clean to clear existing data before seeding.
// cd OnlineBookstore/backend node data/index.js --clean


const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const sellerModel = require('../models/seller.model');
const bookModel = require('../models/book.model');
const sellers = require('./sellers');
const baseBooks = require('./books');

const BOOKS_PATH = path.join(__dirname, 'books.js');

const shuffle = (items) => {
    for (let i = items.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
};

const writeBooksFile = (books) => {
    const contents = `const books = ${JSON.stringify(books, null, 4)};\n\nmodule.exports = books;\n`;
    fs.writeFileSync(BOOKS_PATH, contents, 'utf8');
};

const ensureSellers = async ({ clean = false } = {}) => {
    if (clean) {
        await sellerModel.deleteMany({ email: { $in: sellers.map((seller) => seller.email) } });
    }

    const results = [];
    for (const seller of sellers) {
        let existing = await sellerModel.findOne({ email: seller.email });
        if (!existing) {
            const hashedPassword = await sellerModel.hashPassword(seller.password);
            existing = await sellerModel.create({
                storename: seller.storename,
                email: seller.email,
                password: hashedPassword
            });
        }
        results.push(existing);
    }

    return results;
};

const assignSellerIds = (books, sellerIds) => {
    const pool = [];
    while (pool.length < books.length) {
        pool.push(...sellerIds);
    }
    shuffle(pool);

    return books.map((book, index) => ({
        ...book,
        sellerId: String(pool[index])
    }));
};

const seedDatabase = async ({ clean = false } = {}) => {
    const mongoUri = process.env.DB_CONNECT;
    if (!mongoUri) throw new Error('DB_CONNECT is not set in the environment');

    await mongoose.connect(mongoUri);

    if (clean) {
        await bookModel.deleteMany({});
    }

    const sellerDocs = await ensureSellers({ clean });
    const sellerIds = sellerDocs.map((seller) => seller._id);

    const books = assignSellerIds(baseBooks, sellerIds);
    writeBooksFile(books);

    const existingCount = await bookModel.countDocuments();
    if (existingCount && !clean) {
        console.log('Books already exist. Skipping insert (use --clean to reset).');
        return;
    }

    await bookModel.insertMany(books, { ordered: false });
    console.log(`Seeded ${books.length} books.`);
};

seedDatabase({ clean: process.argv.includes('--clean') })
    .then(() => mongoose.connection.close())
    .catch((error) => {
        console.error('Seeding failed:', error.message);
        mongoose.connection.close();
        process.exit(1);
    });
