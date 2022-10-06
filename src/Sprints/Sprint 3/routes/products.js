var express = require('express');
var router = express.Router();
const {productDetail, productCart,productAdd,productEdition} = require('../controllers/productController')

/*/products */
router.get('/productDetail', productDetail);
router.get('/productCart', productCart);
router.get('/productAdd',productAdd);
router.get('/productEdition',productEdition);


module.exports = router;