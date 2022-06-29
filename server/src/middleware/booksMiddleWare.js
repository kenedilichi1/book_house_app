const joi = require("joi");

const addBooks = async function (request, response, next) {
  try {
    const schema = joi.object({
      bookName: joi.string().uppercase().lowercase().min(6).max(30).required(),

      author: joi.string().uppercase().lowercase().min(6).max(30).required(),
      rating: joi.number().min(1).max(10).required(),

      genre: joi.array().items(joi.string().valid()),
    });

    const data = request.body;

    const bookDetails = await schema.validateAsync({ ...data });
    request.app.set("books", bookDetails);
    next();
  } catch (error) {
    response.status(401).json({
      error: true,
      description: "bad input",
      message: "Incorrect entry",
      payload: error.details[0].message,
    });
    return;
  }
};

module.exports = {
  addBooks,
};
