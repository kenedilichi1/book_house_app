const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

// jwt authentication
const jwtAuthentication = async function (request, response, next) {
  try {
    const authHeader = request.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      const v = jwt.verify(token, JWT_SECRET);
      request.app.set("userId", v.id);
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  jwtAuthentication,
};
