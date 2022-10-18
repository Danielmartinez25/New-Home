const db = require("../database/models");
const { Op } = require("sequelize");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require("express-validator");

controller = {
  all: (req, res) => {
    db.Product.findAll({
      include: ["images"],
      order: ["name"],
    })
      .then((product) =>
        res.render("products/all", {
          product,
          toThousand,
        })
      )
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
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
      order: [["createdAt", "DESC"]],
      include: ["images", "category"],
    });
    Promise.all([product, offer])
      .then(([product, offer]) => {
        return res.render("products/detail", {
          product,
          offer,
          toThousand,
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
        })
      )
      .catch((error) => console.log(error));
  },
  store: (req, res) => {
    let errors = validationResult(req);
    /* if (errors.isEmpty()) { */
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
        return res.redirect("/");
      })
      .catch((error) => console.log(error));

    /* db.Category.findAll({
      order: ["name"],
    }).then((categories) => {
      res.render("products/productAdd", {
        categories,
        errors: errors.mapped(),
        old: req.body,
      });
    }); */
  },
  cart: (req, res) => {
    return res.render("products/cart", {
      title: "Carrito",
    });
  },
  remove: (req, res) => {
    return res.render("confirm", {
      id: req.params.id,
    });
  },
  destroy: (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.redirect("products/all"))
      .catch((error) => console.log(error));
  },
  category: (req, res) => {
    db.Category.findByPk(req.params.id, {
      include: [
        {
          association: "products",
          include: ["images"],
        },
      ],
    })
      .then((category) => {
        return res.render("products/category", {
          category,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },
  subcategory: (req, res) => {
      db.subCategory.findByPk(req.params.id, {
      include: [
        {
          association: "products",
          include: ["images"],
        },
      ],
    })
      .then((subcategory) => {
        return res.render("products/subcategory", {
          subcategory,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },

  categoryV: (req, res) => {
    db.Category.findAll(req.params.id)
      .then((category) => {
        return res.render("category", {
          category,
        });
      })
      .catch((error) => console.log(error));
  },
};

module.exports = controller;
