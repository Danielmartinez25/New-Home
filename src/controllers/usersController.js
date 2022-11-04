const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const { where } = require("sequelize");
const db = require("../database/models");

module.exports = {
  edit: (req, res) => {
    let address = db.Address.findByPk(req.params.id);
    let user = db.User.findByPk(req.params.id);
    Promise.all([address, user]).then(([address, user]) => {
      return res.render("users/edit", {
        address,
        user,
        title: "Editar usuario",
      });
    });
  },
  update: (req, res) => {
    db.User.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => {return res.send("/");})
      .catch((error) => console.log(error));
  },
  register: (req, res) => {
    return res.render("users/register", {
      title: "Registrate",
    });
  },

  processRegister: (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) {
    const { name, surname, password, email, country, province, city, rolId } =
      req.body;
    let rol = db.Rol.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    let user = db.User.create({
      name: name?.trim(),
      surname: surname?.trim(),
      email: email?.trim(),
      password: bcryptjs.hashSync(password, 10),
      country: country?.trim(),
      city: city?.trim(),
      province: province?.trim(),
      avatar: req.file?.filename,
      rolId: rolId,
    });

    let address = db.Address.create({

      country: country?.trim(),
      city: city?.trim(),
      province: province?.trim(),
      userId: user.id,
    });
    Promise.all([address, rol, user]).then(([address, rol, user]) => {
      ({
        address,
        rol,
        user,
      });
      return res.redirect("profile");
    });  
    }
    else {
      db.User.findAll()
      .then((user) => {
        return res.render('users/register',{
          user,
          old: req.body,
          errors : errors.mapped(),
          title : "Registrate"
        })
      })
    }
    

    /*     const errors = validationResult(req);
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
    } */
  },

  login: (req, res) => {
    return res.render("users/login", {
      title: "Ingresar",
    });
  },

  loginProcess: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const { email } = req.body;
      db.User.findOne({
        where: {
          email
      },
      }).then((user) => {
        
        req.session.userLogin = {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          rol: user.rolId,
          avatar: user.avatar,
        };
        if (req.body.remember) {
          res.cookie("newHome", req.session.userLogin, {
            maxAge: 1000 * 60 * 60 * 24,
          });
        }
        res.locals.user = req.session.userLogin;
        return res.redirect("/");
      });
    } else {
      const { email } = req.body;
      db.User.findOne({
        where: {
          email
      },
      }).then((user) => {
        return res.render("users/login", {
          user,
          old: req.body,
          errors: errors.mapped(),
          title: "Ingresar",
        });
      });
    }
  },

  profile: (req, res) => {
    const id = req.session.userLogin?.id;
    let user = db.User.findByPk(id);
    let address = db.Address.findByPk(id);
    Promise.all([user, address])
      .then(([user, address]) => {
        return res.render("users/profile", {
          title: "Perfil",
          user,
          address,
        });
      })
      .catch((err) => console.log(err));
    /*     return res.render("users/profile", {
      title: "Perfil",
      user: req.session.userLogged,
    }); */
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
