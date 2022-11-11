const db = require("../../database/models");
const {getUrl} = require("../../helpers/getUrl");
const { sendJsonError } = require("../../helpers/sendJsonError");
const { unlinkSync} = require("fs");
const path = require('path')


module.exports = {
  all: async (req, res) => {
    try {
      let products = await db.Product.findAll({
        include: [{ association: "images" }, { association: "category" }],
      });
      return res.status(200).json({
        ok: true,
        status: 200,
        total: products.length,
        url: getUrl(req),
        data: products,
      });
    } catch (error) {
      sendJsonError(error, res);
    }
  },
  store: async (req, res) => {
    try {
      const { name, price, discount, description, categoryId, subcategoryId } =
        req.body;

      const product = await db.Product.create({
        name: name?.trim(),
        description: description?.trim(),
        price: +price,
        discount: +discount,
        categoryId: +categoryId,
        subcategoryId: +subcategoryId,
      });
      let images = [{ productId: product.id }];

      if (req.files?.length) {
        images = req.files.map((file) => {
          return {
            productId: product.id,
            file: file.filename,
          };
        });
      }

      await db.Image.bulkCreate(images, { validate: true });

      await product.reload({
        include: [
          {
            association: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            association: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      });

      return res.status(201).json({
        ok: true,
        status: 201,
        data: product,
        url: getUrl(req),
      });
    } catch (error) {
      sendJsonError(error, res);
    }
  },
  update: async (req, res) => {
    const { name, price, discount, description, categoryId, subcategoryId } =
      req.body;
    const { id } = req.params; /* id product */
    const { deletePreviousImages } = req.query;
    try {
      const product = await db.Product.findByPk(id, {
        include: [
          {
            association: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            association: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      });

      product.name = name?.trim() || product.name;
      product.price = +price || product.price;
      product.discount = +discount || product.discount;
      product.description = description?.trim() || product.description;
      product.categoryId = +categoryId || product.categoryId;
      product.subcategoryId = +subcategoryId || product.subcategoryId;

      await product.save();

      if (+deletePreviousImages === 1) {
        product.images.forEach(async (img) => {
          await img.destroy();
          unlinkSync(path.join(__dirname, `../../public/img/${img.file}`));
        });
      }

      if (req.files?.length) {
        const images = req.files.map((file) => {
          return {
            file: file.filename,
            productId: product.id,
          };
        });

        await db.Image.bulkCreate(images);
      }

      res.status(200).json({
        ok: true,
        status: 200,
        /* data: await product.reload() */
        url: getUrl(req),
      });
    } catch (error) {
      sendJsonError(error, res);
    }
  },
  destroy: async (req, res) => {
    const { id } = req.params; /* product id */
    try {
      /*  await db.Image.destroy({ where: { productId: id } });
      await db.Product.destroy({ where: { id } }); */
      const options = {
        include: [
          {
            association: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            association: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      };
      const product = await db.Product.findByPk(id, options);

      product.images.forEach(async (img) => {
        await img.destroy();
        unlinkSync(
          path.join(__dirname, `../../public/img/${img.file}`)
        );
      });
      await product.destroy();

      res.status(200).json({
        ok: true,
        status: 200,
        msg: "Producto eliminado",
      });
    } catch (error) {
      sendJsonError(error, res);
    }
  },
};