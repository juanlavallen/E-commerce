const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Test is successfull');
});

router.post('/register', (req, res) => {
    
});

module.exports = router