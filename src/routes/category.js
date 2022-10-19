let express = require("express");
let router = express.Router();

const { furniture,category,tv, smartphoneAndNotebook} = require("../controllers/categoryController.js");

router
  .get("/furniture/:id", furniture)
  .get("/category/:id", category)
  .get("/tv/:id", tv)
  .get("/notebook&smartphone/:id", smartphoneAndNotebook)





module.exports = router;
