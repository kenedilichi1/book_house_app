const argon2 = require('argon2');
const dataBase = require('../model/database'); 

// get user details
const getUser = async function(request,response){
    try {
        const dataBaseConnection =await dataBase.connectToDb();
        let profile = []
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
        console.log(profile, "profile")
    } catch (error) {
        console.log(error)
    }
}


// signup controller
const signUp = async function(request, response){
    const dataBaseConnection = await dataBase.connectToDb();
    
    try {
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
            response.status(400).json({
                error: true,
                description: "username taken",
                message: "pick a different name",
                payload: null
            });
            return
        }
        if (checkEmail){
            response.status(400).json({
                error: true,
                description: "Email already exists",
                message: "Try a different email",
                payload: null
            });
            return
        }

        // creating user
        const user = await dataBaseConnection.collection('users')
            .insertOne({
                fullName: fullName,
                username: username,
                email: email,
                password: hash
                
            })
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
    } catch (error) {
        console.log(error)
    }
}


// login controller
const login = async function(request,response){

    try {
        const requestPayload = request.app.get("loginCredentials")
        const dataBaseConnection = await dataBase.connectToDb();

        if(requestPayload.email === ""){
            throw new Error("email can not be empty")
        }
        
        // checking if user email exists
        const checkUser = await dataBaseConnection.collection('users')
        .findOne({email: requestPayload.email});

        if(!checkUser){
            throw new Error("Invalid login credentials")
        }
        // verifying hased password
        const  checkPassword = await argon2.verify( checkUser.password, requestPayload.password );
        console.log(checkPassword);
        if(!checkPassword){
            throw new Error("Invalid login credentials");
            
        }
        
        response.json({
            error: false,
            description: "password correct",
            message: "Logged in successfully",
            payload: {
                message: `welcome, ${checkUser.username}`,
                id: checkUser._id,
                email: checkUser.email,
                username: checkUser.username
            }
        })
        
        return;
        
    } catch (error) {
        response.status(400).json({
            error: true,
            description: "bad request",
            message: "incorrect input",
            payload: error
        });
        return;
    }   
    

};




module.exports ={
    signUp,
    login,
    getUser
}