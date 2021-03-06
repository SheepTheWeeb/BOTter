'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('otteruser', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      discord_id: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      discord_tag: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()'
        )
      }
    });

    await queryInterface.createTable('redflag', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'otteruser',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      received_from: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'otteruser',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      reason: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      double_red: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()'
        )
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('redflag');
    await queryInterface.dropTable('otteruser');
  }
};
