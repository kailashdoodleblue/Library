const express = require('express');
const sequelize = require('./config/database');
const router = require('./routes/orderRoutes');
const dotenv=require('dotenv')
dotenv.config()

const app = express();
app.use(express.json());
app.use('/orders', router);

const PORT = process.env.PORT || 3002;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));
    })
    .catch(err => console.log(err));
