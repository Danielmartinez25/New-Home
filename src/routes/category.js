let express = require("express");
let router = express.Router();

const { muebles,category} = require("../controllers/categoryController.js");

router
.get("/muebles/:id", muebles)
.get("/category/:id", category);


module.exports = router;
