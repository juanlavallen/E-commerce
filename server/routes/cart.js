const { Router } = require('express');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require('../helpers/verify-token');
const Cart = require('../models/Cart');
const route = Router();

route.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

route.put('/:id', verifyTokenAndAuthorization, async(req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

route.delete('/:id', verifyTokenAndAuthorization, async(req,res) => {
    try {
        await Cart.findOneAndDelete(req.params.id);
        res.status(200).json('Cart has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
});