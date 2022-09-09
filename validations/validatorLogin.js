const {check} = require('express-validator');

module.exports = [
    check('password')
         .notEmpty().withMessage('La contraseña es obligatoria')

]

