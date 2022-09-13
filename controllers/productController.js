const fs = require('fs');
const path = require('path');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const {validationResult} = require('express-validator');


controller = {
  all: (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "data", "products.json"))
    );
    let selectType = req.params.nombre;
    let type = products.filter((product) => product.type === selectType);
    const product = products.find((product) => product.id === +req.params.id);
    return res.render("allproducts", {
      title: "Products",
      toThousand,
      selectType,
      products,
      product,
      type,
    });
  },
  detail: (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "data", "products.json"))
    );
    const product = products.find((product) => product.id === +req.params.id);
    let loMejor = products.filter(
      (product) => product.section === "lo mejor" && product.discount <= 20
    );

    return res.render("productDetail", {
      title: "Detalle",
      toThousand,
      product,
      loMejor,
    });
  },
  edit: (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "data", "products.json"))
    );
    const { id } = req.params;
    let product = products.find((product) => product.id === +id);
    return res.render("edition", {
      product,
    });
  },
  update: (req, res) => {
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "data", "products.json"))
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
        path.join(__dirname, "..", "data", "products.json"),
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
    return res.render("productAdd");
  },
  store: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { price, section, discount, description, title, type } = req.body;
      const products = JSON.parse(
        fs.readFileSync(path.join(__dirname, "..", "data", "products.json"))
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
        path.join(__dirname, "..", "data", "products.json"),
        JSON.stringify(productModify, null, 3),
        "utf-8"
      );
      return res.redirect("/");
    } else {
      return res.render("productAdd", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
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
    const { id } = req.params;
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "data", "products.json"))
    );
    const productModify = products.filter((product) => product.id !== +id);
    fs.writeFileSync(
      path.join(__dirname, "..", "data", "products.json"),
      JSON.stringify(productModify, null, 3),
      "utf-8"
    );
    return res.redirect("/");
  },
};

module.exports = controller;
