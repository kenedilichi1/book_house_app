const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const dataBase = require("../model/database");
const { successResponder, errorResponder } = require("../helpers/responder");
const { JWT_SECRET } = require("../config/env");

// get user details
const getUser = async function (request, response) {
  try {
    const dataBaseConnection = await dataBase.connectToDb();
    let user = request.params.username;
    console.log(user, "user");
    const getOneUser = await dataBaseConnection
      .collection("users")
      .find(
        { username: user },
        { projection: { _id: 0, password: 0, confirmPassword: 0 } }
      )
      .toArray();

    return successResponder(response, getOneUser, "successful");
  } catch (error) {
    return errorResponder(response, error.message, 400);
  }
};

// signup controller
const signUp = async function (request, response) {
  try {
    const dataBaseConnection = await dataBase.connectToDb();
    const requestPayload = request.app.get("userDetails");
    let { fullName, username, email } = requestPayload;

    const hash = await argon2.hash(requestPayload.password, {
      type: argon2.argon2id,
    });
    // checking if username and password already exists
    const checkUsername = await dataBaseConnection
      .collection("users")
      .findOne({ username: username });

    const checkEmail = await dataBaseConnection
      .collection("users")
      .findOne({ email: email });

    if (checkUsername) {
      throw new Error("Username taken");
    }
    if (checkEmail) {
      throw new Error("Pick a different email");
    }

    // creating user
    const user = await dataBaseConnection.collection("users").insertOne({
      fullName: fullName,
      username: username,
      email: email,
      password: hash,
    });

    const payload = {
      fullName: fullName,
      username: username,
      email: email,
    };
    // // creating jwt
    // const secret = process.env.ACCESS_TOKEN_SECRET;
    // const accessToken = jwt.sign(_id,)
    return successResponder(
      response,
      payload,
      "Signup successfull, please login"
    );
  } catch (error) {
    return errorResponder(response, error.message, 400);
  }
};

// login controller
const login = async function (request, response) {
  try {
    const requestPayload = request.app.get("loginCredentials");
    const dataBaseConnection = await dataBase.connectToDb();

    if (requestPayload.email === "") {
      throw new Error("email can not be empty");
    }

    // checking if user email exists
    const checkUser = await dataBaseConnection
      .collection("users")
      .findOne({ email: requestPayload.email });

    if (!checkUser) {
      throw new Error("Invalid login credentials");
    }

    // verifying hased password
    const checkPassword = await argon2.verify(
      checkUser.password,
      requestPayload.password
    );
    console.log(checkPassword);
    if (!checkPassword) {
      throw new Error("Invalid login credentials");
    }

    // create jwt
    const accessToken = jwt.sign({ id: String(checkUser._id) }, JWT_SECRET);
    console.log(checkUser._id, accessToken, "checkuser");
    const respPayload = {
      message: `welcome, ${checkUser.username}`,
      id: checkUser._id,
      email: checkUser.email,
      username: checkUser.username,
      token: accessToken,
    };

    return successResponder(response, respPayload, "Logged in successfully");
  } catch (error) {
    return errorResponder(response, error.message, 400);
  }
};

module.exports = {
  signUp,
  login,
  getUser,
};
