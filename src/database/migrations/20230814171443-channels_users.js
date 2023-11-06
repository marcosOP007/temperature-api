'use strict';

module.exports = {
  async  up(queryInterface, Sequelize) {
    await queryInterface.createTable('channels_users', {
      channel_id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: 'Channels', // Tabela de referência
          key: 'id', // Coluna de referência
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Tabela de referência
          key: 'id', // Coluna de referência
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

      
      // Defina outras colunas da tabela, se necessário
    });

    // Defina índices compostos, se necessário
  },

  async down (queryInterface, Sequelize){
    await queryInterface.dropTable('channels_users');
  },
};

