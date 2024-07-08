const Book = require('../model/booklist');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books' });
    }
}

const addBooks = async (req, res) => {
    try {
        const books = req.body;
        const book = await Book.bulkCreate(books);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error adding book' });
    }
}

const editBooks = async (req, res) => {
    try {
        const { title, author, publishDate, rack, stock } = req.body;
        const book = await Book.findByPk(req.params.id);
        if (book) {
            await book.update({ title, author, publishDate, rack, stock });
            res.json(book);
        } else {
            res.status(400).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating book' });
    }
}

const deleteBook =  async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            await book.destroy();
            res.json({ message: 'Book deleted' });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book' });
    }
}

const reducestock = async (req,res)=>{
    try {
      const {bookID} = req.body;
      
    //   console.log(bookID)    
      const book = await Book.findByPk(bookID)
    //   console.log(book) 
      const newvalue = book.stock-1
      console.log(newvalue)
      await book.update({stock:newvalue})
      res.status(200).json();
    } catch (error) {
      res.status(400).json({ error: error.message } );
    }
  }


module.exports={getAllBooks,addBooks,editBooks,deleteBook,reducestock}