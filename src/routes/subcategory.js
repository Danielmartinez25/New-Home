let express = require('express')
let router = express.Router()

const { lg, samsung } = require("../controllers/subcategoryController.js")

router
.get("/lg/:id",lg)
.get("/samsung/:id",samsung)




module.exports = router