require("dotenv").config();
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const database = require("../model/database");
const { successResponder, errorResponder } = require("../helpers/responder");
const { JWT_SECRET } = require("../config/env");

// get all user books
const getBookShelf = async function (request, response) {
  try {
    const dbConnection = await database.connectToDb();

    let user = request.params.username;
    console.log(user, "user");
    let shelf = [];
    // find one user
    const getUser = await dbConnection
      .collection("users")
      .findOne({ username: user });

    const allBooks = await dbConnection
      .collection("bookShelf")
      .find({ user_id: getUser._id })
      .toArray();
    console.log(allBooks, "allbooks", getUser._id, "getuser");
    const bookSize = allBooks.length;
    if (bookSize > 0) {
      for (let b = 0; b < bookSize; b++) {
        const getBookDetails = await dbConnection
          .collection("books")
          .find({ _id: allBooks[b].book_id })
          .toArray();

        shelf = shelf.concat(getBookDetails);
      }
    }

    console.log(shelf, "shelf");
    return successResponder(response, shelf, "getting all books");
  } catch (error) {
    return errorResponder(response, error.message, 400);
  }
};

// add to bookshelf
const addToBookShelf = async function (request, response) {
  try {
    const dataBaseConnection = await database.connectToDb();
    let { username, bookName } = request.app.get("userBooks");

    // jwt verify

    const jwtId = new ObjectId(`${request.app.get("userId")}`);
    console.log(jwtId, "jwtid");
    // find user id with username
    const user = await dataBaseConnection
      .collection("users")
      .findOne({ username: username });

    console.log(!user._id.equals(jwtId), user._id, jwtId);

    if (!user._id.equals(jwtId)) {
      throw new Error("wrong user id");
    }
    // find book id with book name
    const book = await dataBaseConnection
      .collection("books")
      .findOne({ bookName: bookName });

    // check if the user has up to 2 books
    console.log(user._id);
    const checkId = await dataBaseConnection
      .collection("bookShelf")
      .find({ user_id: user._id })
      .toArray();

    console.log(checkId, "checkId");
    if (checkId.length === 2) {
      throw new Error("maximum amount reached");
    }

    // inserting to bookshelf collection
    console.log(book, "book");
    const borrowedBook = await dataBaseConnection
      .collection("bookShelf")
      .insertOne({
        user_id: user._id,
        book_id: book._id,
      });

    return successResponder(
      response,
      book.bookName,
      "Book added to Book Shelf"
    );
  } catch (error) {
    return errorResponder(response, error.message, 400);
  }
};

module.exports = {
  addToBookShelf,
  getBookShelf,
};
