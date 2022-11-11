var express = require("express");
var router = express.Router();
const { index } = require("../../controllers/api/indexController");

/* / */
router.get("/", index);
module.exports = router;
