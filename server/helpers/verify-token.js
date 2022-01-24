const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header.token;
    if (authHeader) {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({
                    msg: 'Token is not valid!'
                });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({
            msg: 'You are not authenticated!'
        });
    }
}

module.exports = verifyToken;