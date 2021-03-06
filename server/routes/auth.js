const { Router } = require('express');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
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
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (Originalpassword !== req.body.password) {
            return res.status(401).json({
                msg: 'Wrong credentials!'
            });
        }

        const accessToken = jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        }, process.env.SECRET_KEY, {
            expiresIn: '1d'
        });

        const { password, ...others } = user._doc;
        res.status(200).json({ others, accessToken });

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;