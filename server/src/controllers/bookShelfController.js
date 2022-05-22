const database = require('../model/database')

// get all user books
const getBookShelf = async function(request,response){
    try {
        const dbConnection = await database.connectToDb();
        
        let user = request.params.username;
        let shelf = []
        // find one user
        const getUser = await dbConnection.collection('users')
            .findOne({username: user})
    
        
        const allBooks = await dbConnection.collection('bookShelf')
            .find({users_id:getUser._id})
            .toArray()
        console.log(allBooks, getUser)
        const bookSize = allBooks.length
        if(bookSize > 0){
            for(let b = 0; b< bookSize; b++){
                const getBookDetails = await dbConnection.collection('books')
                    .find({_id: allBooks[b].books_id})
                    .toArray();
                
                shelf.push(getBookDetails)
            }
        }
        
        response.status(200).json({
            error: false,
            description: "books exist",
            messaga: "getting all books",
            payload: shelf
        })
        return;
    } catch (error) {
        console.log(error)
    }
}

// add to bookshelf
const addToBookShelf = async function(request,response){
    try {
        const dataBaseConnection = await database.connectToDb();
        let {username, bookName} = request.app.get("userBooks");
        if(username && bookName ===""){  
            throw new Error("Invalid enrty")
        }
        // find user id with username
        const userId= await dataBaseConnection.collection('users')
                .findOne({username:username})

        // find book id with book name
        const bookId = await dataBaseConnection.collection('books')
            .findOne({bookName:bookName})

        // inserting to bookshelf collection
        const sort= await dataBaseConnection.collection('bookShelf')
            .insertOne({
                users_id: userId._id,
                books_id: bookId._id
            })

        response.status(200).json({
            error: false,
            description: "submit successful",
            message: "Book added to Book Shelf",
            payload: bookId.bookName
        })
        return;
    } catch (error) {
        response.status(400).json(error)
    }
}


module.exports={
    addToBookShelf,
    getBookShelf
}