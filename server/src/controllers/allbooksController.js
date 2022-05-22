const route = require('../routes/books');
const database = require('../model/database');

// getting all books
const getAllBooks = async function(request,response){
    try {
        const dbConnection = await database.connectToDb();
        const allBooks = await dbConnection.collection('books')
            .find()
            .toArray()
            
        response.status(200).json({
            error: false,
            description: "books exist",
            messaga: "getting all books",
            payload: allBooks
        })
        return
    } catch (error) {
        response.status(400).json(error)
    }
    
}

// adding new books
const addNewBooks = async function(request,response){
    try {
        const dbConnection = await database.connectToDb();
        let {bookName, author, rating, genre} = request.app.get("books");

        const checkBook = await dbConnection.collection('books')
            .findOne({bookName: bookName});

        if(checkBook){
            throw new Error("Book already exist")
        };
        
        const newBooks = await dbConnection.collection('books')
            .insertOne({
                bookName: bookName,
                author: author,
                rating: rating,
                genre: genre
            });

        response.status(200).json({
            error: false,
            description: "book added",
            messaga: "Added Successfully",
            payload: newBooks
        });
        return;
    } catch (error) {
        response.status(400).json({
            error:true,
            description: "bad request",
            message: "invalid input",
            payload:error
        });
    }
    
}


module.exports= {
    getAllBooks,
    addNewBooks
}