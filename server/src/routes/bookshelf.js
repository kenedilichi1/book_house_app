const express = require("express");
const router = express.Router();
const bookShelfMiddleWare = require("../middleware/bookShelfMiddleWare");
const bookShelfController = require("../controllers/bookShelfController");
const { jwtAuthentication } = require("../middleware/jwt");

// get user bookshelf
router.get(
  "/:username/books",
  jwtAuthentication,
  bookShelfController.getBookShelf
);

// add to bookshelf
router.post(
  "/books",
  jwtAuthentication,
  bookShelfMiddleWare.addToShelf,
  bookShelfController.addToBookShelf
);

module.exports = router;
