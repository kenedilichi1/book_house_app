const database = require('../model/database');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
require ('dotenv').config();

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
        

        // jwt verify
        const authHeader = request.headers.authorization;
        const secret = process.env.ACCESS_TOKEN_SECRET;
    
        if (authHeader){
            const token = authHeader.split(' ')[1];
    
            jwt.verify(token,secret,(error, user)=>{
                if(error){
                    throw new Error("invalid token");
                };
                request.user = user;
                request.app.set("jwtUser", request.user.id)
            });
            
        };
        const jwtId = new ObjectId(`${request.app.get("jwtUser")}`) 
        // find user id with username
        const user= await dataBaseConnection.collection('users')
                .findOne({username:username})

        console.log(!user._id.equals(jwtId), user._id, jwtId);

        if(!user._id.equals(jwtId)){
            throw new Error("wrong user id")
        }
        // find book id with book name
        const book = await dataBaseConnection.collection('books')
            .findOne({bookName:bookName})


        // check if the user has up to 2 books
        console.log(user._id)
        const checkId = await dataBaseConnection.collection('bookShelf')
            .find({user_id: user._id}).toArray();

        console.log(checkId,"checkId")
        if(checkId.length === 2){
            throw new Error("maximum amount reached")
        }
        
        // inserting to bookshelf collection
        console.log(book, "book")
        const borrowedBook= await dataBaseConnection.collection('bookShelf')
            .insertOne({
                user_id: user._id,
                book_id: book._id
            })

        response.status(200).json({
            error: false,
            description: "submit successful",
            message: "Book added to Book Shelf",
            payload: book.bookName
        })
        return;
    } catch (error) {
        response.status(400).json(error.message)
    }
}


module.exports={
    addToBookShelf,
    getBookShelf
}