const db = require("../database/models");
const { Op } = require("sequelize");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require("express-validator");

controller = {
  all: (req, res) => {
    let category = db.Category.findAll();
    let product = db.Product.findAll({
      include: ["images"],
      order: ["name"],
    })
    Promise.all([category,product])
      .then(([category,product]) =>
        res.render("products/all",{
          category,
          product,
          toThousand,
          title: "Todos los Productos",
        })
      )
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    let category = db.Category.findAll()
    let product = db.Product.findByPk(req.params.id, {
      include: ["images"],
    });
    let offer = db.Product.findAll({
      where: {
        discount: {
          [Op.gt]: 20,
        },
      },
      limit: 4,
      order: [["discount", "DESC"]],
      include: ["images", "category"],
    });
    Promise.all([category,product, offer])
      .then(([category,product, offer]) => {
        return res.render("products/detail", {
          category,
          product,
          offer,
          toThousand,
          title: product.name,
        });
      })
      .catch((error) => console.log(error));
  },
  edit: (req, res) => {
    let categories = db.Category.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    let subcategories = db.subCategory.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    let product = db.Product.findByPk(req.params.id);
    Promise.all([categories, product, subcategories]).then(
      ([categories, product, subcategories]) => {
        return res.render("products/edition", {
          product,
          categories,
          subcategories,
        });
      }
    );
  },
  update: (req, res) => {
    db.Product.update(
      {
        ...req.body,
        name: req.body.name,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => res.redirect("/"))
      .catch((error) => console.log(error));
  },
  create: (req, res) => {
    let categories = db.Category.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    let subcategories = db.subCategory.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    Promise.all([categories, subcategories])
      .then(([categories, subcategories]) =>
        res.render("products/add", {
          categories,
          subcategories,
          title: "Agregar producto",
        })
      )
      .catch((error) => console.log(error));
  },
  store: (req, res) => {
    let errors = validationResult(req);
     if (errors.isEmpty()) {
     db.Product.create({
      ...req.body,
      name: req.body.name,
      description: req.body.description,
    })
    
      .then((product) => {
        if (req.files.length) {
          let images = req.files.map(({ filename }) => {
            return {
              file: filename,
              productId: product.id,
            };
          });
          db.Image.bulkCreate(images, {
            validate: true,
          }).then((result) => console.log(result));
        }
        return res.redirect("all");
      })
      .catch((error) => console.log(error))
    }else { 
    let product = db.Product.findByPk(req.params.id)
    let categories = db.Category.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    let subcategories = db.subCategory.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    });
    Promise.all([categories,subcategories,product])
    .then(([categories,subcategories,product]) => {
      res.render("products/add", {
        categories,
        subcategories,
        product,
        errors: errors.mapped(),
        old: req.body,
        title : "Vender"
      });
    }) 
  }
},
  cart: (req, res) => {
    return res.render("products/cart", {
      title: "Carrito",
    });
  },
  remove: (req, res) => {
    return res.render("confirm", {
      id: req.params.id,
      title: "Eliminar",
    });
  },
  destroy: (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.redirect("/"))
      .catch((error) => console.log(error));
  },
  categoryV: (req, res) => {
    db.Category.findAll(req.params.id)
      .then((category) => {
        return res.render("category", {
          category,
          title: "Categoria",
        });
      })
      .catch((error) => console.log(error));
  },
};

module.exports = controller;
