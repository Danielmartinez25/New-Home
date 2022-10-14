"use strict";
const categoryDB = require("../../data/category.json");
const categories = categoryDB.map((category) => {
  return {
    ...category,
    createdAt: new Date(),
  };
});
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", categories, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
