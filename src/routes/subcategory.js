let express = require('express')
let router = express.Router()

const { lg } = require("../controllers/subcategoryController.js")

router
.get("/lg/:id",lg);



module.exports = router