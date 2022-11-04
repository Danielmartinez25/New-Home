const {check} = require('express-validator');

module.exports = [
  check("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email valido"),
  check("password").custom((value, { req }) => {
    let password = req.body.password;
    if (value !== password) {
      throw new Error("Contraseña incorrecta");
    } else {
      return true;
    }
        
  }),
];

