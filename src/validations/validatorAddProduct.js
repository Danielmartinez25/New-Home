const {check} = require('express-validator');

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("Nombre de producto requerido")
    .bail()
    .isLength({
      min: 30,
      max: 100,
    })
    .withMessage("el producto debe contener entre 30 y 100 caracteres"),
  check("price")
    .notEmpty()
    .withMessage("Precio de producto requerido")
    .bail()
    .isNumeric({
      no_symbols: true,
    })
    .withMessage("Solo números positivos"),
  check("description").notEmpty().withMessage("Descripción requerida"),
  check("categoryId").notEmpty().withMessage("categoria requerida"),
  check("subcategoryId").notEmpty().withMessage("subcategoria requerida"),
];