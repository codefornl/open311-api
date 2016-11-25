(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('categoryGroups', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false
        },
        ordering: Sequelize.INTEGER(3).UNSIGNED
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('categoryGroups');
    }
  };
}());
