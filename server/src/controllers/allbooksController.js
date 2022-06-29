const route = require("../routes/books");
const database = require("../model/database");
const { successResponder, errorResponder } = require("../helpers/responder");
// getting all books
const getAllBooks = async function (request, response) {
  try {
    const dbConnection = await database.connectToDb();
    const allBooks = await dbConnection.collection("books").find().toArray();

    return successResponder(response, allBooks, "getting all books");
  } catch (error) {
    return errorResponder(response, error.message, 400);
  }
};

// adding new books
const addNewBooks = async function (request, response) {
  try {
    const dbConnection = await database.connectToDb();
    let { bookName, author, rating, genre } = request.app.get("books");

    const checkBook = await dbConnection
      .collection("books")
      .findOne({ bookName });

    if (checkBook) {
      throw new Error("Book already exist");
    }

    const newBooks = await dbConnection.collection("books").insertOne({
      bookName,
      author,
      rating,
      genre,
    });

    return successResponder(response, newBooks, "Added Successfully");
  } catch (error) {
    return errorResponder(response, error.message, 400);
  }
};

module.exports = {
  getAllBooks,
  addNewBooks,
};
