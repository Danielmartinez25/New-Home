const path = require('path');
const multer = require('multer');
const uuid = require('uuid')

const storageImageProduct = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/img");
    },
    filename : (req,file,callback) => {
        callback(
          null,
          "product-" + uuid.v1() + path.extname(file.originalname)
        );
    }
});

const uploadImageProduct = multer({
    storage : storageImageProduct
});



module.exports = {
    uploadImageProduct
}