const { check } = require("express-validator");
const db = require('../database/models')

module.exports = [
  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email valido"),
  check("password")
    .notEmpty()
    .withMessage("El password es obligatorio"),
];
