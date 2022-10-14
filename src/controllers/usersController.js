const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

module.exports = {
  register: (req, res) => {
    db.Rol.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    })
      .then((rol) =>
        res.render("users/register", {
          rol,
        })
      )
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    return res.render("login", {
      title: "Login",
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
  processRegister: (req, res) => {
    db.User.create({
      ...req.body
    })
    .then(user => {
        return user
    })
/*      

    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const { name, surname, email, password, username } = req.body;
      let users = loadUsers();

      let newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        password: bcryptjs.hashSync(password, 12),
        username: username.trim(),
        rol: "user",
        avatar: null,
      };

      let usersModify = [...users, newUser];

      storeUsers(usersModify);

      return res.redirect("/users/login");
    } else {
      return res.render("register", {
        title: "Register",
        errors: errors.mapped(),
        old: req.body,
      });
    } */
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let { id, name, username, rol, avatar } = loadUsers().find(
        (user) => user.email === req.body.email
      );

      req.session.userLogin = {
        id,
        username,
        name,
        rol,
        avatar,
      };

      if (req.body.remember) {
        res.cookie("craftsy16", req.session.userLogin, {
          maxAge: 1000 * 60,
        });
      }

      return res.redirect("/");
    } else {
      return res.render("login", {
        title: "Login",
        errors: errors.mapped(),
      });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.cookie("craftsy16", null, { maxAge: -1 });
    return res.redirect("/");
  },
};
