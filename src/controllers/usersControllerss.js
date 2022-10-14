const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

/* User de models */
const User = require("../modelsUser/User");

module.exports = {
  register: (req, res) => {
    return res.render("users/register", {
      title: "Register",
    });
  },

  processRegister: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      let userToCreate = {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        avatar: req.file.filename,
      };

      User.create(userToCreate);

      return res.redirect("/");
    } else {
      return res.render("users/register", {
        title: "Register",
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  login: (req, res) => {
    return res.render("users/login", {
      title: "Login",
    });
  },

  loginProcess: (req, res) => {
    let userToLogin = User.findByTag("email", req.body.email);

    if (userToLogin) {
      let isCorrectPassword = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (isCorrectPassword) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        return res.redirect("/");
      }
      return res.render("users/login", {
        title: "Login",
        errors: {
          email: {
            msg: "las creedenciales son invalidas",
          },
        },
      });
    }

    return res.render("users/login", {
      title: "Login",
      errors: {
        email: {
          msg: "Este email no se encuentra en nuestra base de datos",
        },
      },
    });
  },

  profile: (req, res) => {
    return res.render("users/userProfile", {
      title: "Perfil",
      user: req.session.userLogged,
    });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.cookie("newHome", null, { maxAge: -1 });
    return res.redirect("/");
  },
  logoutV: (req, res) => {
    return res.render("logout");
  },
};
