const express = require('express');
const router = express.Router();
const middleWares = require('../middleware/usersMiddleware');
const controllers = require('../controllers/usersController')

//get user
router.get('/users/:username', controllers.getUser) 

// user signup 
router.post('/users/signup', middleWares.signupMiddleWare,controllers.signUp)


// user login
router.post('/users/login',middleWares.loginMiddleWare,controllers.login );


module.exports = router