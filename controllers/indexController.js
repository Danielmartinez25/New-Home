const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  index: (req, res) => {
    let offer = db.Product.findAll({
      where: {
        discount: {
          [Op.gt]: 30,
        },
      },
      limit : 4,
      include: ["images", "category"],
    });
    newest = db.Product.findAll({
      order: [["createdAt", "DESC"]],
      limit: 8,
      include: ["images", "category"],
    });
    let tv = db.Category.findByPk(1, {
      include: [
        {
          association: "products",
          include: ["images"],
          limit: 4,
        },
      ],
    });
    let console = db.Category.findByPk(2, {
      include: [
        {
          association: "products",
          include: ["images"],
          limit: 4,
        },
      ],
    });
    Promise.all([offer, newest, tv, console])
      .then(([offer, newest, tv, console]) => {
        return res.render("index", {
          offer,
          tv,
          newest,
          console,
          toThousand,
        });
      }).catch((error) => console.log(error));
  },
  search: (req, res) => {
    		const { keywords } = req.query;

        db.Product.findAll({
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.substring]: keywords,
                },
              }
            ],
          },
          include: ["images"],
        })
          .then((products) => {
            return res.render("results", {
              products,
              keywords,
              toThousand,
            });
          })
          .catch((error) => console.log(error));
/*     let { keywords } = req.query;
    const products = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "data", "productDB.json"))
    );

    let result = products.filter((product) =>
      product.title.toLowerCase().includes(keywords.toLowerCase())
    );

    return res.render("results", {
      products: result,
      keywords: req.query.keywords,
      toThousand,
    }); */
  },
};
