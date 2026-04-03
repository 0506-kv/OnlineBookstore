const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const dbStateLabels = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
};

router.get('/health', (req, res) => {
    const dbState = mongoose.connection.readyState;

    res.status(200).json({
        status: 'ok',
        service: 'backend',
        timestamp: new Date().toISOString(),
        uptime: Math.floor(process.uptime()),
        database: dbStateLabels[dbState] || 'unknown'
    });
});

module.exports = router;
