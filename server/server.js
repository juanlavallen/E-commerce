const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

const userRoute = require('./routes/users');

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});