var express = require('express');
/* const productController = require('../controllers/productController'); */
var router = express.Router();
const {detail,all,edit,update,cart,store,create,destroy,remove} = require('../controllers/productController')

const {uploadImageProduct} = require('../middlewares/uploadImg')
const {validatorAddProduct,validatorEditProduct} = require('../validations')

const adminUserCheck = require('../middlewares/adminUserCheck')
/*/products */
router    

    .get('/all/:nombre', all)
    .get('/detail/:id',detail) 
    .get('/edit/:id',adminUserCheck,edit)
    .put('/update/:id',validatorEditProduct,update)
    .post('/store',uploadImageProduct.single('image'),validatorAddProduct,store)
    .get('/create', adminUserCheck,create) 
    .get('/cart',cart)  
    .get('/delete/:id',adminUserCheck, remove)   
    .delete('/destroy/:id',destroy)

module.exports = router;