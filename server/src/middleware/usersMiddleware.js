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
        const data = request.body
        const userDetails = await schema.validateAsync({...data})
        request.app.set("userDetails", userDetails)
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
        let logInDetails = request.body;

        const value = await schema.validateAsync({...logInDetails})
        request.app.set("loginCredentials", value)
        next()
        
    } catch (error) {
        console.log(error.details[0].message);
        response.status(400).json({
            error: true,
            description: "Bad request",
            message: error.details[0].message,
            payload: null
        })
    }
    
    
}


module.exports ={
    signupMiddleWare,
    loginMiddleWare
}