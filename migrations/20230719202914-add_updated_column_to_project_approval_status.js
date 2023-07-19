'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('project_approval_status', 'updated_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('updated_at');
  }
};
