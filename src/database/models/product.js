"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image, {
        as: "images",
        foreignKey: "productId",
        onDelete: "cascade",
      })
      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId",
      })
      Product.belongsTo(models.subCategory, {
        as: "subcategory",
        foreignKey: "subcategoryId",
      })
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      discount: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
