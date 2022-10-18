const db = require("../database/models");
const { Op } = require("sequelize");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require("express-validator");

module.exports = {
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
  muebles: (req, res) => {
    db.Category.findByPk(6, {
      include: [
        {
          association: "products",
          include: ["images"],
          order: [["createdAt", "DESC"]],
        },
      ],
    })
      .then((muebles) => {
        return res.render("category/muebles", {
          muebles,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },
};