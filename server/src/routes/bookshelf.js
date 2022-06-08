const express = require('express');
const router = express.Router();
const bookShelfMiddleWare = require('../middleware/bookShelfMiddleWare');
const bookShelfController = require('../controllers/bookShelfController')


// get user bookshelf
router.get('/:username/books', bookShelfController.getBookShelf)




// add to bookshelf
router.post('/books', bookShelfMiddleWare.addToShelf, bookShelfController.addToBookShelf)


module.exports = router