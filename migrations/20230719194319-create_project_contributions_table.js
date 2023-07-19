'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('project_contributions', {
      transaction_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      contributor_id: {
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
      amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      percentage_contribution: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      current_cutribution: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("project_contributions");
  }
};