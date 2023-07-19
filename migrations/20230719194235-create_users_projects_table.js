'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_projects', {
      user_project_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      project_id: {
        type: Sequelize.UUID,
        references: {
          model: 'projects',
          key: 'project_id',
        }
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("user_projects");
  }
};