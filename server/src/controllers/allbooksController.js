const route = require('../routes/books');
const database = require('../model/database');

// getting all books
const getAllBooks = async function(request,response){
    const dbConnection = await database.connectToDb();
    let books = []
    const allBooks = await dbConnection.collection('books')
        .find()
        .toArray()
        
    response.status(200).json({
        error: false,
        description: "books exist",
        messaga: "getting all books",
        payload: allBooks
    })
}

// adding new books
const addNewBooks = async function(request,response){
    const dbConnection = await database.connectToDb();
    let {bookName, author, rating, genre} = request.body;

    const checkBook = await dbConnection.collection('books')
        .findOne({bookName: bookName})

    if(checkBook && checkBook._id){
        response.status(400).json({
            error: true,
            discreption: "bad request",
            message: "book already exists",
            payload: "null"
        })
        return
    }
    

    const newBooks = await dbConnection.collection('books')
        .insertOne({
            bookName: bookName,
            author: author,
            rating: rating,
            genre: genre
        })

    response.status(200).json({
        error: false,
        description: "book added",
        messaga: "Added Successfully",
        payload: newBooks
    })
}


module.exports= {
    getAllBooks,
    addNewBooks
}