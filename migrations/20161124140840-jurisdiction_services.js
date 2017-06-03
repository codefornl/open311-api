(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('jurisdiction_services', {
        jurisdiction_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
        },
        service_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
        }
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('jurisdiction_services');
    }
  };
}());
