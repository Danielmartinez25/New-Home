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
      limit: 4,
      order: [["discount", "DESC"]],
      include: ["images", "category"],

    });
    newest = db.Product.findAll({
      order: [["createdAt", "DESC"]],
      limit: 4,
      include: ["images", "category"],
    });
    let tv = db.Category.findByPk(1, {
      include: [
        {
          association: "products",
          include: ["images"],
          limit: 4,
          order: [["createdAt", "DESC"]]
        },
      ],
    });
    let console = db.Category.findByPk(2, {
      
      include: [
        {
          association: "products",
          include: ["images"],
          limit: 4,
          order: [["createdAt", "DESC"]]
        },
      ],
    });
    let lg = db.subCategory.findByPk(5)
    let category = db.Category.findAll(req.params.id);
    let subcategory = db.subCategory.findAll(req.params.id)
    Promise.all([offer, newest, tv, console, category,subcategory,lg])
      .then(([offer, newest, tv, console, category,subcategory,lg]) => {
        return res.render("index", {
          offer,
          tv,
          newest,
          console,
          category,
          subcategory,
          lg,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
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
          },
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
  }
};
