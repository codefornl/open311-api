(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('accounts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        account_id: Sequelize.INTEGER.UNSIGNED,
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        token: Sequelize.STRING,
        role: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
          allowNull: false
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true
        }
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('accounts');
    }
  };
}());
