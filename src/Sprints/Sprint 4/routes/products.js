var express = require('express');
/* const productController = require('../controllers/productController'); */
var router = express.Router();
const {detail,all,edit,update,cart,store,create,destroy,remove} = require('../controllers/productController')

/*/products */
router    

    .get('/all/:nombre', all)
    .get('/detail/:id',detail) 
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .post('/store',store)
    .get('/create',create) 
    .get('/cart',cart)  
    .get('/delete/:id', remove)   
    .delete('/destroy/:id',destroy)

module.exports = router;