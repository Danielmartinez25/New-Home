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
    let categories = db.Category.findAll({
      attributes : ['id', 'name'],
      order : ['name']
    });
    let product = db.Product.findByPk(req.params.id);
    Promise.all([categories,product])
    .then(([categories,product])=>{
      return res.render('edition',{
        product,
        categories
      })
    })
  },
  update: (req, res) => {
    db.Product.update({
      ...req.body,
      name : req.body.name,
      description: req.body.description
    },
    {
      where : {
        id : req.params.id
      }
    })
    .then(() => res.redirect('/products/detail/' + req.params.id))
    .catch(error => console.log(error))  
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
  let errors = validationResult(req);
  if(errors.isEmpty()){
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
  } db.Category.findAll({
    order: ["name"],
  }).then((categories) => {
    res.render("productAdd", {
      categories,
      errors: errors.mapped(),
      old: req.body,
    });
  });
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
