const express = require("express");
const router = express.Router();
const controllers = require("../controllers/allbooksController");
const middleware = require("../middleware/booksMiddleWare");
const { jwtAuthentication } = require("../middleware/jwt");

// get all books route
router.get("/books", jwtAuthentication, controllers.getAllBooks);

// add new book
router.post(
  "/add_books",
  jwtAuthentication,
  middleware.addBooks,
  controllers.addNewBooks
);

module.exports = router;
