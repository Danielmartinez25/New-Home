    const bcryptjs = require ('bcryptjs');
const {validationResult} = require('express-validator');

/* User de models */
const User = require ('../models/User');

module.exports = {

    register : (req,res) => {
        return res.render('register',{
            title: 'Register'
        })
    },

    processRegister: (req,res) => {
        const resultValidation = validationResult(req);
        
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                title: 'Register',
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }

        let userInDB = User.findByTag('email', req.body.email);

        if (userInDB) {
            return res.render('register', {
                title: 'Register',
                errors : {
                    email : {
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync (req.body.password, 10),
            avatar : req.file.filename
            
        }

        User.create (userToCreate);

        return res.redirect ('/users/login');
    },

    login : (req,res) => {
        return res.render('login',{
            title: 'Login'
        })
    },

    loginProcess: (req,res) => {
        let userToLogin = User.findByTag('email', req.body.email);

        if (userToLogin) {
            let isCorrectPassword = bcryptjs.compareSync (req.body.password , userToLogin.password);
            if (isCorrectPassword){
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                return res.redirect ('/users/profile')
            }
            return res.render ('login', {
                title: 'Login',
                errors: {
                    email: {
                        msg : 'las creedenciales son invalidas'
                    }
                }
            });
        }

        return res.render ('login', {
            title: 'Login',
            errors: {
                email: {
                    msg : 'Este email no se encuentra en nuestra base de datos'
                }
            }
        });
    },

    profile: (req,res) => {
        return res.render ('userProfile', {
            title: 'Perfil',
            user: req.session.userLogged
        })
    },
    logout : (req,res) => {
        req.session.destroy();
        res.cookie('newHome',null,{maxAge: -1});
        return res.redirect('/');
    }
}
