const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    borrowDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:new Date()
    },
    returnDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    bookID: {
        type: DataTypes.INTEGER,
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
const users = sequelize.define('users',{},{
    tableName: 'users',
  },);

const books = sequelize.define('books',{},{
    tableName: 'books',
  },)

users.hasMany(Order,{foreignKey:'userID',foreignKeyConstraint: true})
books.hasMany(Order,{foreignKey:'bookID',foreignKeyConstraint: true})

module.exports = Order;
