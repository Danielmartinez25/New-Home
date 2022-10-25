var express = require("express");
var router = express.Router();

/* Controller */
const {
  register,
  processRegister,
  login,
  loginProcess,
  profile,
  logout,
  logoutV,
  edit,
  update
} = require("../controllers/usersController");

/* Middlewares */
const uploadFile = require("../middlewares/multerMiddleware");
const { validatorRegister, validatorLogin } = require("../validations");
const userSessionCheck = require("../middlewares/userSessionCheck");

/*/users */
/* /register*/

router
  .get("/register", register)
  .post(
    "/register",
    uploadFile.single("avatar"),
    validatorRegister,
    processRegister
  )
  .get("/edit/:id", edit)
  .put("/update/:id", update)
  .get("/login", login)
  .post("/login", validatorLogin, loginProcess)
  .get("/profile", userSessionCheck, profile)
  .get("/logout", logout)
  .get("/logoutV", logoutV);

module.exports = router;
