'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('user_roles', 'createdAt', 'created_at');
    await queryInterface.renameColumn('user_roles', 'updatedAt', 'updated_at');
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.renameColumn('user_roles', 'created_at', 'createdAt');
   await queryInterface.renameColumn('user_roles', 'updated_at', 'updatedAt');

  }
};
