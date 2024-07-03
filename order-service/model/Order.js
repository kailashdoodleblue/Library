const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    borrowDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:Date()
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    bookName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    payment: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'pending'
    }
});

module.exports = Order;
