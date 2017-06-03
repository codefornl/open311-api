(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('service_groups', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        ordering: Sequelize.INTEGER(3).UNSIGNED
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('service_groups');
    }
  };
}());
