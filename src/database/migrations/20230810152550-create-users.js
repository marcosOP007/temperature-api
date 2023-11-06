'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize){
    await queryInterface.createTable('Users', {
      
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      permission_type: {
        type: Sequelize.ENUM('USER', 'ADMIN', 'MODERATOR'),
        allowNull: false,
        defaultValue: 'USER',
      },
      hash_password: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(35),
        allowNull: false,
        unique: true,
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED'),
        allowNull: false,
        defaultValue: 'ACTIVE',
      },
  
      last_login: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },


    });
  },

  async down (queryInterface, Sequelize){
    await queryInterface.dropTable('Users');
  }
};
