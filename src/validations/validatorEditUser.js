const {check,body} =require('express-validator')
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
];