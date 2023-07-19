'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('projects', 
    {
      project_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      estimated_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contribution_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      current_contribution: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      approval_status: {
        type: Sequelize.UUID,
        references: {
          model: 'project_approval_status',
          key: 'status_id',
        },
      },
      artist: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      still_accepts_contribution: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      rejected_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW()
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW()
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW()
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  }
};