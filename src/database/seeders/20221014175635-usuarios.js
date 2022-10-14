"use strict";
const { hashSync } = require("bcryptjs");
const usersDB = require("../../data/usersDB.json");
const users = usersDB.map((user) => {
  return {
    ...user,
    createdAt: new Date(),
  };
});
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", users, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
