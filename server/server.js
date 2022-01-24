const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

const { connectDB } = require('./database/cofig');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});