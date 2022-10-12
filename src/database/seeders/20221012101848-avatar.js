"use strict";
const avatarsDB = require("../../data/avatar.json");
const avatars = avatarsDB.map(({ avatar }, index) => {
  return {
    file: avatar,
    userId: index + 1,
    createdAt: new Date(),
  };
});
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Avatars",avatars, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Avatars", null, {});
  },
};
