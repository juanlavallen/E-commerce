const { Router } = require('express');
const CryptoJS = require('crypto-js');
const User = require('../models/User');
const router = Router();

router.post('/register', async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json({
                msg: 'Wrong credentials!'
            });
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const password = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (password !== req.body.password) {
            return res.status(401).json({
                msg: 'Wrong credentials!'
            });
        }

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;