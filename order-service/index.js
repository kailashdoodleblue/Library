const express = require('express');
const sequelize = require('./config/database');
const router = require('./routes/orderRoutes');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const dotenv = require('dotenv')
dotenv.config()

const app = express();
app.use(express.json());
app.use('/orders', router);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


const PORT = process.env.PORT || 3002;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));
    })
    .catch(err => console.log(err));
