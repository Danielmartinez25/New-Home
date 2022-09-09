const {check} = require('express-validator');

module.exports = [
    check('name')
         .notEmpty().withMessage('Debe ingresar su nombre completo').bail()
         .isAlpha().withMessage('El nombre debe contener solo letras')
         .isLength({
             min : 2,
             max : 25
         }).withMessage('Puede ingresar entre 2 y 25 caracteres'),
    check('email')
         .notEmpty().withMessage('El email es obligatorio').bail()
         .isEmail().withMessage('Debe ser un email válido').bail()
         .custom((value, {req}) => {
             let user = users.find(user => user.email === value.trim());
             return !!!user;
         }).withMessage('Este email ya se encuentra registrado'),
         
    check('password')
         .notEmpty().withMessage('La contraseña es obligatoria').bail()
         .isLength({
             min : 4,
             max : 8
         }).withMessage('La contraseña debe contener entre 4 y 8 caracteres'),
    check('country')
         .notEmpty().withMessage('Debe seleccionar un pais'),
     check('avatar')
          .custom((value,{req}) => {
                 let file = req.file;
                if(!file){
                throw new Error('Seleccione foto de perfil');
          }
          return true;
      })
]