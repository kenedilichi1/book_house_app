const Joi = require('joi');


const signupMiddleWare = async function(request, response, next){

    const schema = Joi.object({
        fullName: Joi.string()
            .uppercase()
            .lowercase()
            .min(5)
            .max(30)
            .required(),
        username: Joi.string()
            .alphanum()
            .min(5)
            .max(30)
            .required(),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
        confirmPassword: Joi.ref('password'),          
    
    })
    try {
        let {fullName, username, email, password, confirmPassword} = request.body;
        if ( fullName && username && email && password && confirmPassword !==""){
            const bookDetails = await schema.validateAsync({
                fullName: fullName,
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        }else{
            response.status(400).json({
                erroe: true,
                description: "missing field",
                message: "all fields are required",
                payload: "Null"

            })
        }
        next()
    } catch (error) {
        response.status(400).json({
            error: true,
            description: "doesn't match pattern",
            message: "incorrect input",
            payload: error.details[0].message
        })
        return 
    }

    
} 


// login middleware
const loginMiddleWare = async function (request, response, next){
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
              
    
    })

    try {
        let {email, password} = request.body;

        if(email && password){
        
            const value = await schema.validateAsync({
                email: request.body.email,
                password: request.body.password
            })
        
            next()
        }else{
            response.status(401).json({message: "provide username/email  and password "})
        }
    } catch (error) {
        console.log(error)
    }
    
    
}


module.exports ={
    signupMiddleWare,
    loginMiddleWare
}