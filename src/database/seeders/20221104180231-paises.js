"use strict";
const countriesDB = require("../../data/countries.json");
const countries = countriesDB.map((product) => {
  return {
    ...product,
    createdAt: new Date(),
  };
});
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Countries", countries, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Countries", null, {});
  },
};
