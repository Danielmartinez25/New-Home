const {check} = require('express-validator');

module.exports = [
    check('title')
        .notEmpty()
        .withMessage('Nombre de producto requerido').bail()
        .isLength({
            min : 10,
            max : 40
        }).withMessage('el producto debe contener entre 10 y 40 caracteres'),
    check('price')
        .notEmpty()
        .withMessage('Precio de producto requerido').bail()
        .isNumeric({
            no_symbols: true
        }).withMessage('Solo números positivos'),
    check('section')
        .notEmpty()
        .withMessage('Sectión requerida'),
    check('description')
        .notEmpty()
        .withMessage('Descripción requerida')
]