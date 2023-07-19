'use strict';

const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('project_approval_status', {
      status_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE,
      }
    }).then(console.log);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('project_approval_status');
  }
};
