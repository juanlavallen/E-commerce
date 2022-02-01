const { Router } = require('express');
const { verifyToken } = require('../helpers/verify-token');
const Order = require('../models/Order');
const route = Router();

route.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = route;