const subcategoryDB = require("../../data/subcategory.json");
const subcategories = subcategoryDB.map((subcategory) => {
  return {
    ...subcategory,
    createdAt: new Date(),
  };
});
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("subCategories", subcategories, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("subCategories", null, {});
  },
};
