
const Order = require('../model/Order');
const axios = require('axios')
const sendMail = require('../middleware/mail')
const addorder = async (req, res) => {
    try {
        const { borrowDate, returnDate, bookName, price, userName } = req.body;
        const data = await axios.post(process.env.GETUSERNAME, { username: userName })
        const users = data.data
        if (!users) {
            res.status(200).json({ message: "User not found" })

        }
        else {
            await axios.put(process.env.REDUCESTOCK, { bookname: bookName });
            console.log(data)
            if (users.LibraryPass == 1) {
                await sendMail(userName, bookName, returnDate, users.email)
                const payment = "Paid"
                const order = await Order.create({ borrowDate, returnDate, price, bookName, payment, userName });
                res.status(201).json(order);
            }
            else {
                const payment = "pending"
                const order = await Order.create({ borrowDate, returnDate, price, bookName, payment, userName });
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
        const { borrowDate, returnDate, bookName, payment, price, userName } = req.body;
        const order = await Order.findByPk(req.params.id);
        if (order) {
            await order.update({ borrowDate, returnDate, bookName, price, payment, userName });
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
            const data = await axios.post(process.env.GETUSERNAME, { username: order.userName })
            const users = data.data
            await sendMail(order.userName, order.bookName, order.returnDate, users.email)
            res.status(200).json({ Message: "Payment success" })
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const getOrderByUsername = async (req, res) => {
    try {
        const { userName } = req.body
        const users = await Order.findAll({ where: { userName: userName } })
        // console.log(users)
        res.status(200).json(users)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { addorder, getallorders, updateorder, deleteorder, updateOrderPayment, getOrderByUsername }

