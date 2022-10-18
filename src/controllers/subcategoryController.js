const db = require('../database/models')
const { Op } = require("sequelize");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require("express-validator");


module.exports = {
  lg: (req, res) => {
    db.subCategory
      .findByPk(5, {
        include: [
          {
            association: "products",
            include: ["images"],
            order: [["createdAt", "DESC"]],
          },
        ],
      })
      .then((lg) => {
        return res.render("subcategory/lg", {
          lg,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },

  samsung: (req, res) => {
    db.subCategory.findByPk(7, {
        include: [
          {
            association: "products",
            include: ["images"],
            order: [["createdAt", "DESC"]],
          },
        ],
      })
      .then((samsung) => {
        return res.render("subcategory/samsung", {
          samsung,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },
};