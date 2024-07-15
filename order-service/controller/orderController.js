
const Order = require('../model/Order');
const axios = require('axios')
const sendMail = require('../middleware/mail')
const sequelize=require('../config/database')
const addorder = async (req, res) => {
    try {
        const {returnDate, bookID, price, userID } = req.body;
        const data = await axios.post(process.env.GETUSERNAME+userID)
        const users = data.data
        if (!users) {
            res.status(200).json({ message: "User not found" })

        }
        else {
            await axios.put(process.env.REDUCESTOCK, { bookID: bookID });
            console.log(data)
            if (users.LibraryPass == 1) {
                await sendMail(users.username, returnDate, users.email)
                const payment = "Paid"
                const order = await Order.create({ returnDate, price, bookID, payment, userID });
                res.status(201).json(order);
            }
            else {
                const payment = "pending"
                const order = await Order.create({ returnDate, price, bookID, payment, userID });
                res.status(201).json(order);
            }
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getallorders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        -
        res.status(500).json({ error: 'Error fetching orders' });
    }
}

const updateorder = async (req, res) => {
    try {
        const { returnDate, bookID, payment, price, userID } = req.body;
        const order = await Order.findByPk(req.params.id);
        if (order) {
            await order.update({ returnDate, bookID, price, payment, userID });
            res.json(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating order' });
    }
}

const deleteorder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (order) {
            await order.destroy();
            res.json({ message: 'Order deleted' });
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting order' });
    }
}

const updateOrderPayment = async (req, res) => {
    try {
        const { payment } = req.body
        const order = await Order.findByPk(req.params.id)
        if (!order) {
            res.status(200).json({ Message: "order id not found" })
        }
        else {
            await order.update({ payment: payment })
            const data = await axios.post(process.env.GETUSERNAME+order.userID)
            const users = data.data
            await sendMail(users.username, order.returnDate, users.email)
            res.status(200).json({ Message: "Payment success" })
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getOrderByUsername = async (req, res) => {
    try {
        const { userID } = req.body
        const users = await Order.findAll({ where: { userID: userID } })
        // console.log(users)
        res.status(200).json(users)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getallordersbyuserid= async(req,res)=>{
    try {
        const users = await sequelize.query(`select users.username,books.title,orders.price,orders.payment,orders.borrowDate,orders.returnDate from orders inner join users on orders.userID=users.id inner join books on books.id=orders.bookID where users.id=${req.params.id}`)
        res.status(200).json(users)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { addorder, getallorders, updateorder, deleteorder, updateOrderPayment, getOrderByUsername,getallordersbyuserid }

