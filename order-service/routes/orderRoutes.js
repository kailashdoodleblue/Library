const express = require('express');
const {verifytoken}= require('../middleware/verifytoken')
const order = require('../controller/orderController')
const router = express.Router();
const {validateOrder,handleValidationErrors}= require('../middleware/validation')

/**
 * @swagger
 * /orders/:
 *   get:
 *     summary: Get all employees
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       401:
 *         description: Unauthorized
 */
router.get('/',order.getallorders );

/**
 * @swagger
 * /neworder:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       description: Order data to create a new order
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               borrowDate:
 *                 type: string
 *                 format: date
 *                 example: 
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 example: 
 *               bookName:
 *                 type: string
 *                 example: ""
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 
 *               userName:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "order_12345"
 *                 borrowDate:
 *                   type: string
 *                   format: date
 *                   example: 2023-07-01
 *                 returnDate:
 *                   type: string
 *                   format: date
 *                   example: 2023-07-10
 *                 bookName:
 *                   type: string
 *                   example: "Example Book Name"
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 9.99
 *                 userName:
 *                   type: string
 *                   example: "john_doe"
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/neworder',validateOrder,handleValidationErrors,order.addorder );

router.put('/:id',verifytoken,order.updateorder );

router.delete('/:id',verifytoken,order.deleteorder );

router.put('/payment/:id',order.updateOrderPayment );

router.post('/userorders',verifytoken,order.getOrderByUsername)

router.get('/getalluser/:id',order.getallordersbyuserid);

module.exports = router;