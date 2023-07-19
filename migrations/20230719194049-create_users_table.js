'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },
      firstname: {
        type: Sequelize.STRING,  
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,  
        allowNull: false,
      },
      othername: {
        type: Sequelize.STRING,  
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,  
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,  
        allowNull: false,
        unique: true
      },
      role: {
        type: Sequelize.UUID,
        references: {
          model: 'user_roles',
          key: 'role_id',
        }
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};