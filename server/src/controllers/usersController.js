const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const dataBase = require('../model/database');
require('dotenv').config();

// get user details
const getUser = async function(request,response){
    try {
        const dataBaseConnection =await dataBase.connectToDb();
        let user = request.params.username
        console.log(user, "user")
        const getOneUser = await dataBaseConnection.collection('users')
            .find({username: user},{projection:{_id:0, password:0, confirmPassword:0}})
            .toArray()
        // profile.push(getOneUser)

        response.status(200).json({
            error: false,
            description: "successful",
            message: "Fetched user",
            payload: getOneUser
        })
        return
    } catch (error) {
        console.log(error)
    }
}


// signup controller
const signUp = async function(request, response){
    
    try {
        const dataBaseConnection = await dataBase.connectToDb();
        const requestPayload = request.app.get("bookDetails")
        let {fullName,username, email } = requestPayload;

        const hash = await argon2.hash(requestPayload.password,{
            type: argon2.argon2id
        });
        // checking if username and password already exists
        const checkUsername = await dataBaseConnection.collection('users')
            .findOne({username: username});

        const checkEmail = await dataBaseConnection.collection('users')
            .findOne({email: email});

        if (checkUsername){
           throw new Error("Username taken")
        }
        if (checkEmail){
           throw new Error("Pick a different email") 
        }

        // creating user
        const user = await dataBaseConnection.collection('users')
            .insertOne({
                fullName: fullName,
                username: username,
                email: email,
                password: hash

            })
        
        // // creating jwt
        // const secret = process.env.ACCESS_TOKEN_SECRET;
        // const accessToken = jwt.sign(_id,)
        response.status(201).json({
            error: false,
            description: "request successful",
            message: "Signup successfull, please login",
            payload: {
                fullName: fullName,
                username: username,
                email: email
            }
        })
        return
    } catch (error) {
        response.staus(400).json({
            error: true,
            description: "bad request",
            message: "invalid input",
            payload:error
        })
        return
    }
}


// login controller
const login = async function(request,response){

    try {
        const requestPayload = request.app.get("loginCredentials");
        const dataBaseConnection = await dataBase.connectToDb();

        if(requestPayload.email === ""){
            throw new Error("email can not be empty")
        };

        // checking if user email exists
        const checkUser = await dataBaseConnection.collection('users')
        .findOne({email: requestPayload.email});

        if(!checkUser){
            throw new Error("Invalid login credentials")
        };

        // verifying hased password
        const  checkPassword = await argon2.verify( checkUser.password, requestPayload.password );
        console.log(checkPassword);
        if(!checkPassword){
            throw new Error("Invalid login credentials");
        }
        
        // create jwt
        const secret =  process.env.ACCESS_TOKEN_SECRET;
        const accessToken = jwt.sign({id:checkUser._id}, secret);
        console.log(accessToken, "accesstoken")
        response.json({
            error: false,
            description: "password correct",
            message: "Logged in successfully",
            payload: {
                message: `welcome, ${checkUser.username}`,
                id: checkUser._id,
                email: checkUser.email,
                username: checkUser.username
            },
            token: accessToken
        });

        return;

    } catch (error) {
        response.status(400).json({
            error: true,
            description: "bad request",
            message: "incorrect input",
            payload: error.message
        });
        return;
    }   


};




module.exports ={
    signUp,
    login,
    getUser
}