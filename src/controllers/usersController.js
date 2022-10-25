const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

/* User de models */
const User = require("../modelsUser/User");

module.exports = {
  register: (req, res) => {
    return res.render("users/register", {
      title: "Register",
    });
  },

  processRegister: (req, res) => {
    const { name, surname, password, email, country, province, city,rolId} =req.body;
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
    
    let address= db.Address.create({
      country: country?.trim(),
      city: city?.trim(),
      province: province?.trim(),
      userId: user.id,
    });
    Promise.all([address, rol,user]).then(
      ([address, rol,user]) => {
      ({
        address,
        rol,
        user
      })
      return res.redirect('profile')
      }
      
    );

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
    return res.render("users/login");
  },

  loginProcess: (req, res) => {
    const {email} = req.body;
     db.User.findOne({
      where: {
        email
      },
    })
    .then((user) => {
          req.session.userLogin = {
          id : user.id,
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
        return res.redirect('/')
    })
  },

  profile: (req, res) => {
    const id = req.session.userLogin?.id;
    db.User.findByPk(id)
      .then((user) => {
        return res.render("users/profile", {
          title: "New Home Perfil",
          user,
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
