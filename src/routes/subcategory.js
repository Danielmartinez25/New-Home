let express = require('express');
const subcategoryController = require('../controllers/subcategoryController.js');
let router = express.Router()

const { lg, samsung,subcategory } = require("../controllers/subcategoryController.js")

router
  .get("/lg/:id", lg)
  .get("/samsung/:id", samsung)
  .get("/subcategory/:id", subcategory);





module.exports = router