"use strict";
const provincesDB = require("../../data/provinces.json");
const provinces = provincesDB.map((province) => {
  return {
    ...province,
    createdAt: new Date(),
  };
});
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Provinces", provinces, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Provinces", null, {});
  },
};
