'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Sensors', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      corretion_temperature: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      corretion:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      channels_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Channels', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      location: {
        type: Sequelize.STRING(255),
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
        defaultValue: 'ACTIVE',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Sensors');
  }
};

