var express = require("express");
var router = express.Router();
const {all,update,store,destroy} = require("../../controllers/api/productController");

const { uploadImageProduct } = require("../../middlewares/uploadImg");
const { validatorAddProduct, validatorEditProduct } = require("../../validations");

/*/products */
router
  .get("/all", all)
  .patch("/update/:id", validatorEditProduct, update)
  .post("/store/",uploadImageProduct.array("images"),validatorAddProduct,store)
  .delete("/destroy/:id", destroy);

module.exports = router;
