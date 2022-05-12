const joi = require('joi');

const addBooks = async function(request,response, next){
    const schema = joi.object({
        bookName: joi.string()
            .uppercase()
            .lowercase()
            .min(6)
            .max(30)
            .required(),
        
        author: joi.string()
            .uppercase()
            .lowercase()
            .min(6)
            .max(30)
            .required(),
        rating: joi.number()
            .min(1)
            .max(10)
            .required(),
        
        genre:joi.array()
            .items(joi.string().valid())
    })
    try {
        let {bookName, author,rating,genre} = request.body
        if ( bookName && author && rating && genre !==""){
            const bookDetails = await schema.validateAsync({
                bookName: bookName,
                author: author,
                rating: rating,
                genre: genre
            })
        }else{
            response.status(401).json({
                erroe: true,
                description: "missing field",
                message: "all fields are required"
            })
        }
    } catch (error) {
        response.status(401).json({
            error: true,
            payload: error.details[0].message
        })
        return 
    }

    next()
}

module.exports ={
    addBooks
}