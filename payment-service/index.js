const express = require('express');
const router = require('./routes/paymentRoutes');
const dotenv=require('dotenv')
dotenv.config()
const app = express();
app.use(express.json());
app.use('/payment', router);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));

