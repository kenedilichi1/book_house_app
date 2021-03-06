const joi = require('joi');


const addToShelf = async function(request,response, next){
    try {
        const shema = joi.object({
            username: joi.string()
                .uppercase()
                .lowercase()
                .required(),
            
            bookName: joi.string()
                .uppercase()
                .lowercase()
                .required(),
        })

        let data = request.body
        const userBooks = await shema.validateAsync({...data})
        request.app.set("userBooks", userBooks)
        next()
    } catch (error) {
        response.status(400).json(error)
    }
}

module.exports ={
    addToShelf
}