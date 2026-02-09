const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
const userRoutes = require('./routes/user.routes');
const sellerRoutes = require('./routes/seller.routes');
const bookRoutes = require('./routes/book.route');
const orderRoutes = require('./routes/order.routes');
const cartRoutes = require('./routes/cart.routes');

app.use('/users', userRoutes);
app.use('/sellers', sellerRoutes);
app.use('/books', bookRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);

// CONNECTION TO DATABASE
const connectToDb = require('./db/db');
connectToDb();

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
