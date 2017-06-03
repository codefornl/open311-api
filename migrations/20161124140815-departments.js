(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('departments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        name: Sequelize.STRING,
        jurisdiction_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
        }
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('departments');
    }
  };
}());
