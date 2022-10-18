let express = require("express");
let router = express.Router();

const { muebles } = require("../controllers/categoryController.js");

router.get("/muebles/:id", muebles);

module.exports = router;
