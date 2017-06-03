(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('department_services', {
        department_id: {
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
      return queryInterface.dropTable('department_services');
    }
  };
}());
