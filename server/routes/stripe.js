const { Router } = require('express');
const stripe = require('stripe')(process.env.SECRET_KEY);
const route = Router();

module.exports = route;