const { Router } = require('express');
const verifyToken = require('../helpers/verify-token');
const router = Router();

router.put('/:id', verifyToken, async(req, res) => { });

module.exports = router