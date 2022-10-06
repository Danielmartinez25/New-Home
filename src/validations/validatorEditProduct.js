const { check, body } = require("express-validator");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .bail()
    .isLength({
      min: 5,
      max: 50,
    })
    .withMessage("El nombre debe tener entre 5 y 20 caracteres"),
  check("price")
    .notEmpty()
    .withMessage("El precio es requerido")
    .bail()
    .isNumeric({
      no_symbols: true,
    })
    .withMessage("Solo números positivos"),
  check("description").notEmpty().withMessage("Debes dar una descripción")
];
