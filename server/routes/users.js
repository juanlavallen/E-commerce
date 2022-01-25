const { Router } = require('express');
const { verifyTokenAndAuthorization } = require('../helpers/verify-token');
const User = require('../models/User');
const router = Router();

router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {

    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY).toString()
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        res.status(200).json(updateUser);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router