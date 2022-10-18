let express = require("express");
let router = express.Router();

const { furniture,category,tv, smartphone} = require("../controllers/categoryController.js");

router
  .get("/furniture/:id", furniture)
  .get("/category/:id", category)
  .get("/tv/:id", tv)
  .get("/smartphone/:id", smartphone)





module.exports = router;
