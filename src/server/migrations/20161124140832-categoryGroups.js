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
        name: Sequelize.STRING,
        ordering: Sequelize.INTEGER(4).UNSIGNED
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('categoryGroups');
    }
  };
}());
