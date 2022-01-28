const { Router } = require('express');
const { verifyTokenAndAdmin } = require('../helpers/verify-token');
const Product = require('../models/Product');
const route = Router();

route.post('/', verifyTokenAndAdmin, async(req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = route;