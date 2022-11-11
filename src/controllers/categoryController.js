const db = require("../database/models");
const { Op } = require("sequelize");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  category: (req, res) => {
    let categories = db.Category.findAll()
    let category = db.Category.findByPk(req.params.id, {
      order: [["name", "ASC"]],
      include: [
        {
          association: "products",
          include: ["images"],
        },
      ],
    });
    let cheap = db.Product.findAll({
      order: [["price", "ASC"]],
      limit: 4,
      include: ["images", "category"],
    });
    Promise.all([categories,category, cheap])
      .then(([categories,category, cheap]) => {
        return res.render("products/category", {
          categories,
          category,
          cheap,
          toThousand,
          title: category.name,
        });
      })
      .catch((error) => console.log(error));
  },
  furniture: (req, res) => {
    db.Category.findByPk(6, {
      include: [
        {
          association: "products",
          include: ["images"],
          order: [["createdAt", "DESC"]],
        },
      ],
    })
      .then((furniture) => {
        return res.render("category/furniture", {
          furniture,
          toThousand,
          title: "Muebles",
        });
      })
      .catch((error) => console.log(error));
  },
  tv: (req, res) => {
    db.Category.findByPk(1, {
      include: [
        {
          association: "products",
          include: ["images"],
          order: [["createdAt", "DESC"]],
        },
      ],
    })
      .then((tv) => {
        return res.render("category/tv", {
          tv,
          toThousand,
          title: "Televisores",
        });
      })
      .catch((error) => console.log(error));
  },
  smartphone: (req, res) => {
    db.Category.findByPk(4, {
      include: [
        {
          association: "products",
          include: ["images"],
          order: [["createdAt", "DESC"]],
        },
      ],
    })
      .then((smartphone) => {
        return res.render("category/smartphone", {
          smartphone,
          toThousand,
          title: "Smartphone",
        });
      })
      .catch((error) => console.log(error));
  },
  freetime: (req, res) => {
    db.Category.findByPk(8, {
      include: [
        {
          association: "products",
          include: ["images"],
          order: [["createdAt", "DESC"]],
        },
      ],
    })
      .then((freetime) => {
        return res.render("category/freetime", {
          freetime,
          toThousand,
          title: "Tiempo Libre",
        });
      })
      .catch((error) => console.log(error));
  },
};
