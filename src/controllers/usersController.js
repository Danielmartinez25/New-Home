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
    const {id} = db.User.create({
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
    
    addressCreate = db.Address.create({
      country: country?.trim(),
      city: city?.trim(),
      province: province?.trim(),
      userId: id,
    });
    Promise.all([addressCreate, rol]).then(
      ([addressCreate, rol]) => {
      ({
        addressCreate,
        rol
      })
      return res.redirect('/')
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
    return res.render("users/login", {
      title: "Login",
    });
  },

  loginProcess: (req, res) => {
/*     const {email, password} = req.body;

    db.User.findOne({
      where : {
      email : email,
      password : password
    }})
    .then(() => {
      return res.redirect('/')
    }) */
    
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
    return res.render("users/profile", {
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
