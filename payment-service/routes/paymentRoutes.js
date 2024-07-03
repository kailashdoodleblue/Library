const express = require('express')
const payment = require('../controller/paymentController')
const router = express.Router();

router.put('/:id',payment.updatePayment);


module.exports = router;