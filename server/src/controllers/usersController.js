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
        profile.push(getOneUser)
        
        response.status(200).json({
            error: false,
            description: "successful",
            message: "Fetched user",
            payload: profile
        })
        console.log(profile, "profile")
    } catch (error) {
        console.log(error)
    }
}


// signup controller
const signUp = async function(request, response){
    const dataBaseConnection = await dataBase.connectToDb();
    const hash = await argon2.hash(request.body.password,{
        type: argon2.argon2id
    });
    try {
        let {fullName,username, email } = request.body;

        // checking if username and password already exists
        const checkUsername = await dataBaseConnection.collection('users')
            .findOne({username: username});

        const checkEmail = await dataBaseConnection.collection('users')
            .findOne({email: email});

        if (checkUsername && checkUsername._id){
            response.status(400).json({
                error: true,
                description: "username taken",
                message: "pick a different name",
                payload: "Null"
            });
            return
        }
        if (checkEmail && checkEmail._id){
            response.status(400).json({
                error: true,
                description: "Email already exists",
                message: "Try a different email",
                payload: "Null"
            });
            return
        }

        // creating user
        const user = await dataBaseConnection.collection('users')
            .insertOne({
                fullName: fullName,
                username: username,
                email: email,
                password: hash,
                confirmPassword: hash
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
    const dataBaseConnection = await dataBase.connectToDb();
    try {
        let {email, password} =  request.body;

        if (email !== ""){
            // checking if user email exists
            const checkUser = await dataBaseConnection.collection('users')
            .findOne({email: email});

            // verifying hased password
            const  checkPassword = await argon2.verify( checkUser.password, password );
            console.log(checkPassword)
            if(!checkUser){
                response.status(401).json({
                    error: true,
                    description: "No user",
                    message: "Could not find user",
                    payload: "Null"
                })
                return
            }
            
            if(checkPassword === true){
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
                
                return 
            }else{
                response.status(401).json({
                    error: true,
                    description: "password incorrect",
                    message: "Login denied",
                    payload: "Null"
                })
            }
        }else{
            response.status(401).json({
                error: true,
                description: "username/email required",
                message: "Username/Email",
                payload: "Null"
            })
        }
        
    } catch (error) {
        console.log(error)
    }   
    

};




module.exports ={
    signUp,
    login,
    getUser
}