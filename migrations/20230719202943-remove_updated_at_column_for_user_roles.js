'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_roles', 'updated_at');
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.addColumn('user_roles','updated_at');
  }
};
