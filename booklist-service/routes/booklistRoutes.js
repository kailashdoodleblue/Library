const express = require('express');
const router = express.Router();
const bookcontroller = require('../controller/booklistController')

router.get('/',bookcontroller.getAllBooks);

router.post('/addbook',bookcontroller.addBooks );

router.put('/editbook/:id',bookcontroller.editBooks );

router.delete('/:id', bookcontroller.deleteBook);

router.put('/reducestock',bookcontroller.reducestock);

module.exports = router;
