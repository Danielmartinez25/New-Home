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
    let electrodomesticos = db.Category.findByPk(5, {
      include: [
        {
          association: "products",
          include: ["images"],
          limit: 4,
          order: [["createdAt", "DESC"]],
        },
      ],
    });
    let muebles = db.Category.findByPk(6, {
      include: [
        {
          association: "products",
          include: ["images"],
          limit: 4,
          order: [["createdAt", "DESC"]],
        },
      ],
    });
    let smart = db.Category.findByPk(1);
    let smartphone = db.Category.findByPk(4);
    let furniture = db.Category.findByPk(6);
    let freetime = db.Category.findByPk(8);
    let lg = db.subCategory.findByPk(5);
    let samsung = db.subCategory.findByPk(7);
    let category = db.Category.findAll(req.params.id);
    let subcategory = db.subCategory.findAll(req.params.id);
    Promise.all([
      offer,
      newest,
      category,
      subcategory,
      lg,
      furniture,
      samsung,
      smart,
      smartphone,
      freetime,
      muebles,
      electrodomesticos
    ])
      .then(
        ([
          offer,
          newest,
          category,
          subcategory,
          lg,
          furniture,
          samsung,
          smart,
          smartphone,
          freetime,
          muebles,
          electrodomesticos
        ]) => {
          return res.render("index", {
            offer,
            newest,
            category,
            subcategory,
            lg,
            furniture,
            samsung,
            smart,
            smartphone,
            freetime,
            muebles,
            electrodomesticos,
            toThousand,
            title: "Home",
          });
        }
      )
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
          title : "Resultado"
        });
      })
      .catch((error) => console.log(error));
  },
};
