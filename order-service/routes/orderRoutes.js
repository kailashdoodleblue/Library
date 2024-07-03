const express = require('express');
const {verifytoken}= require('../middleware/verifytoken')
const order = require('../controller/orderController')
const router = express.Router();
const {validateOrder,handleValidationErrors}= require('../middleware/validation')


router.get('/',verifytoken,order.getallorders );

router.post('/neworder',validateOrder,handleValidationErrors,order.addorder );

router.put('/:id',verifytoken,order.updateorder );

router.delete('/:id',verifytoken,order.deleteorder );

router.put('/payment/:id',order.updateOrderPayment );

module.exports = router;