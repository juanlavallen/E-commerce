const { Router } = require('express');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const route = Router();

route.post('/payment', async(req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'usd'
    }, (stripeErr, stripeRes) => {
         
    });
});

module.exports = route;