let express = require("express");
let router = express.Router();

const { furniture,category,tv} = require("../controllers/categoryController.js");

router
  .get("/furniture/:id", furniture)
  .get("/category/:id", category)
  .get("/tv/:id", tv);




module.exports = router;
