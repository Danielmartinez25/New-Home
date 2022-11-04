const {check} = require('express-validator');
const path = require('path');
const fs = require('fs')


module.exports = [
  check("name")
    .notEmpty()
    .withMessage("Debe ingresar su Nombre")
    .bail()
    .isAlpha()
    .withMessage("El Nombre debe contener solo letras")
    .isLength({
      min: 2,
      max: 25,
    })
    .withMessage("Debe ingresar entre 2 y 25 caracteres"),
  check("surname")
    .notEmpty()
    .withMessage("Debe ingresar su Apellido")
    .bail()
    .isAlpha()
    .withMessage("El Apellido debe contener solo letras")
    .isLength({
      min: 2,
      max: 25,
    })
    .withMessage("Debe ingresar entre 2 y 25 caracteres"),
  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("Debe ser un email válido")
    .bail()
    .custom((value, { req }) => {
      let user = users.find((user) => user.email === value.trim());
      return !!!user;
    })
    .withMessage("Este email ya se encuentra registrado"),

  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({
      min: 4,
      max: 8,
    })
    .withMessage("La contraseña debe contener entre 4 y 8 caracteres"),

  check("country")
    .notEmpty()
    .withMessage("Debe rellenar con un pais")
    .isAlpha()
    .withMessage("Este campo solo debe contener letras"),

  check("province")
    .notEmpty()
    .withMessage("Debe rellenar con una provincia")
    .isAlpha()
    .withMessage("Este campo solo debe contener letras"),
  check("city")
    .notEmpty()
    .withMessage("Debe rellenar con una ciudad")
    .isAlpha()
    .withMessage("Este campo solo debe contener letras"),
  check("avatar").custom((value, { req }) => {
    let file = req.file;
    if (!file) {
      throw new Error("Seleccione una foto de perfil");
    }
    return true;
  }),
];