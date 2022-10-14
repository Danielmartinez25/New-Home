"use strict";
const addressDB = require("../../data/address.json");
const address = addressDB.map((address) => {
  return {
    ...address,
    createdAt: new Date(),
  };
});
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Addresses", address, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
  },
};
