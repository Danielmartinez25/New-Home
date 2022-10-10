var express = require('express');
var router = express.Router();

/* Controller */
const { register, processRegister, login, loginProcess , profile, logout,logoutV} = require('../controllers/usersController')

/* Middlewares */
const uploadFile = require ('../middlewares/multerMiddleware')
const { validatorRegister, validatorLogin } = require("../validations");
const userSessionCheck = require('../middlewares/userSessionCheck')

/*/users */
/* /register*/

router
    .get('/register', register)
    .post ('/register', uploadFile.single('avatar'), validatorRegister, processRegister)

/* /login */

router
    .get ('/login', login)
    .post ('/login', validatorLogin, loginProcess);

/* Profile */

router
  .get("/profile", userSessionCheck, profile)
  .get("/logout", logout)
  .get("/logoutV", logoutV);


    







module.exports = router;
