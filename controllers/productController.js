const fs = require('fs');
const path = require('path');
const db = require('../database/models')
const { Op } = require("sequelize");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {validationResult} = require('express-validator');


controller = {
  all: (req, res) => {
    db.Product.findAll({
      include : ['images']
    })
    .then(product => res.render('allProducts',{
      product,
      toThousand
    })).catch(error => console.log(error))
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
      include: ["images", "category"],
    });
    Promise.all([product,offer])
    .then(([product,offer])=> {
      return res.render('productDetail',{
        product,
        offer,
        toThousand
      })
    })
  .catch((error) => console.log(error));
  },
  edit: (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "data", "productDB.json"))
    );
    const { id } = req.params;
    let product = products.find((product) => product.id === +id);
    return res.render("edition", {
      product,
    });
  },
  update: (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "data", "productDB.json"))
    );

    const errors = validationResult(req);

    /* if (errors.isEmpty()) { */
      const { id } = req.params;
      let { title, price, discount, description, section } = req.body;

      const productModify = products.map((product) => {
        if (product.id === +id) {
          return {
            ...product,
            title: title.trim(),
            description: description.trim(),
            price: +price,
            discount: +discount,
            section,
          };
        } else {
          return product;
        }
      });

      fs.writeFileSync(
        path.join(__dirname, "..", "data", "productDB.json"),
        JSON.stringify(productModify, null, 3),
        "utf-8"
      );
      return res.redirect("/products/detail/" + id);
    /* } else {
      return res.render("edition", {
        product: req.body,
        id: req.params.id,
        errors: errors.mapped(),
      });
    } */
  },
  create: (req, res) => {
    db.Category.findAll({
      attributes: ["id", "name"],
      order: ["name"],
    })
      .then((categories) =>
        res.render('productAdd', {
          categories,
        })
      )
      .catch((error) => console.log(error));
  },
  store: (req, res) => {
  db.Product.create({
    ...req.body,
    name : req.body.name,
    description : req.body.description,
  })
  .then(product =>{
    if(req.files.length){
    let images = req.files.map(({filename}) => {
						return {
							file : filename,
							productId: product.id
						}
					})
          db.Image.bulkCreate(images,{
            validate : true
          }).then((result) => console.log(result))
    }
    return res.redirect('/')
  }).catch(error => console.log(error))
  
/*     const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { price, section, discount, description, title, type } = req.body;
      const products = JSON.parse(
        fs.readFileSync(path.join(__dirname, "..", "data", "productDB.json"))
      );
      image = req.file.filename;
      const newProduct = {
        id: products[products.length - 1].id + 1,
        title: title.trim(),
        description: description.trim(),
        price: +price,
        discount: +discount,
        section,
        type,
        image,
      };
      let productModify = [...products, newProduct];
      fs.writeFileSync(
        path.join(__dirname, "..", "data", "productDB.json"),
        JSON.stringify(productModify, null, 3),
        "utf-8"
      );
      return res.redirect("/");
    } else {
      return res.render("productAdd", {
        errors: errors.mapped(),
        old: req.body,
      });
    } */
  },
  cart: (req, res) => {
    return res.render("productCart", {
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
      .then(() => res.redirect("allProducts"))
      .catch((error) => console.log(error));
  }
};

module.exports = controller;
