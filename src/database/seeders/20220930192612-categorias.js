"use strict";

const categories = [
  {
    name: "Televisores",
    createdAt: new Date(),
  },
  {
    name: "Consolas",
    createdAt: new Date(),
  },
  {
    name: "Audio",
    createdAt: new Date(),
  },
  {
    name: "Celulares",
    createdAt: new Date(),
  },
  {
    name: "Electrodomesticos",
    createdAt: new Date(),
  },
  {
    name: "Muebles",
    createdAt: new Date(),
  },
];
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", categories, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
