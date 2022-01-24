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

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({
                msg: 'You are not alowed to do that!'
            });
        }
    });
}

module.exports = { verifyToken, verifyTokenAndAuthorization }