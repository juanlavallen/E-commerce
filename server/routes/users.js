const { Router } = require('express');
const verifyToken = require('../helpers/verify-token');
const router = Router();

router.put('/:id', verifyToken, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY).toString()
    }
});

module.exports = router