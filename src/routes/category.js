let express = require("express");
let router = express.Router();

const { furniture,category,tv, smartphone,freetime} = require("../controllers/categoryController.js");

router
  .get("/furniture/:id", furniture)
  .get("/category/:id", category)
  .get("/tv/:id", tv)
  .get("/smartphone/:id", smartphone)
  .get("/freetime/:id", freetime);







module.exports = router;
