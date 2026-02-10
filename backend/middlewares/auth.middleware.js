const jwt = require('jsonwebtoken');
const sellerModel = require('../models/seller.model');
const userModel = require('../models/user.model');

module.exports.authSeller = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const seller = await sellerModel.findById(decoded._id);

        if (!seller) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.seller = seller;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authAdmin = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded?.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.admin = { email: decoded.email };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
