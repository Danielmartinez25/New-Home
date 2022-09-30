"use strict";

const users = [
  {
    name: "admin",
    surname: "admin",
    email: "admin@gmail.com",
    password: hashSync("12345678", 10),
    avatar: null,
    rolId: 1,
    createdAt: new Date(),
  },
  {
    name: "user",
    surname: "user",
    email: "user@gmail.com",
    password: hashSync("12345678", 10),
    avatar: null,
    rolId: 2,
    createdAt: new Date(),
  },
];
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", users, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
