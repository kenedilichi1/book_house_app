const joi = require('joi');


const addToShelf = async function(request,response, next){
    try {
        const shema = joi.object({
            users_id: joi.string()
                .uppercase()
                .lowercase()
                .required(),
            
            books_id: joi.string()
                .uppercase()
                .lowercase()
                .required(),
        })

        let {username, bookName} = request.body
        const userBooks = await shema.validateAsync({
            users_id: username,
            books_id: bookName
        })
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports ={
    addToShelf
}