const express = require('express');
const router = express.Router();
const controllers = require('../controllers/allbooksController')
const middleware = require('../middleware/booksMiddleWare')


// get all books route
router.get('/books', controllers.getAllBooks);


// add new book
router.post('/add_books', middleware.addBooks, controllers.addNewBooks)




module.exports = router