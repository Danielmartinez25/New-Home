const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

module.exports = {
  edit: (req, res) => {
    db.User.findByPk(req.params.id)
    .then(user => {
      return res.render("users/edit", {
        user,
        title: "Editar usuario",
      });
    });
  },
  update: (req, res) => {
    const {name,surname,email,password} = req.body;
    const errors = validationResult(req)
    if (errors.isEmpty()) {
    db.User.update(
      {
        name: name?.trim(),
        surname: surname?.trim(),
        email: email?.trim(),
        password:bcryptjs.hashSync(password, 10),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => res.redirect("/"))
      .catch((error) => console.log(error));  
    }else{
      db.User.findByPk(req.params.id)
      .then(user => {
        return res.render('users/edit',{
          user,
          old :req.body,
          errors: errors.mapped(),
          title : "Editar usuario"
        })
      })
    }
    
  },
  register: (req, res) => {
    let countries = db.Country.findAll({
      attributes: ["name"],
      order: ["name"],
    });
    let provinces = db.Province.findAll({
      attributes: ["name"],
      order: ["name"],
    });
    Promise.all([countries, provinces]).then(([countries, provinces]) => {
      return res.render("users/register", {
        title: "Registrate",
        countries,
        provinces,
      });
    });
  },

  processRegister: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let countries = db.Country.findAll({
        attributes: ["name"],
        order: ["name"],
      });
      let provinces = db.Province.findAll({
        attributes: ["name"],
        order: ["name"],
      });
      const { name, surname, password, email, country, province, city, rolId } =
        req.body;
      let user = db.User.create({
        name: name?.trim(),
        surname: surname?.trim(),
        email: email?.trim(),
        password: bcryptjs.hashSync(password, 10),
        country: country?.trim(),
        city: city?.trim(),
        province: province?.trim(),
        avatar: req.file?.filename,
        rolId: 2,
      });

      let address = db.Address.create({
        country: country?.trim(),
        city: city?.trim(),
        province: province?.trim(),
        userId: user.id,
      });
      Promise.all([address, user, countries, provinces]).then(
        ([address, user, countries, provinces]) => {
          ({
            address,
            user,
            countries,
            provinces,
          });
          return res.redirect("/");
        }
      );
    } else {
      let countries = db.Country.findAll({
        attributes: ["name"],
        order: ["name"],
      });
      let provinces = db.Province.findAll({
        attributes: ["name"],
        order: ["name"],
      });
      let user = db.User.findAll(req.params.id);
      Promise.all([user, countries, provinces]).then(
        ([user, countries, provinces]) => {
          return res.render("users/register", {
            user,
            countries,
            provinces,
            old: req.body,
            errors: errors.mapped(),
            title: "Registrate",
          });
        }
      );
    }
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
          email,
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
          email,
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
