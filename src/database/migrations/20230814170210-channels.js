'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize){
    await queryInterface.createTable('Channels', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      creator_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Tabela de referência
          key: 'id', // Coluna de referência
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      token_read: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      token_write: {
        type: Sequelize.STRING(50),
        allowNull: false,
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
      description: {
        type: Sequelize.STRING(255),
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
        defaultValue: 'ACTIVE',
      },
    });
  },

  async down (queryInterface, Sequelize){
    await queryInterface.dropTable('Channels');
  },
};

