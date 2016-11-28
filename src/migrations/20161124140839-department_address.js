(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('department_address', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        department_id: Sequelize.INTEGER.UNSIGNED,
        address_id: Sequelize.INTEGER.UNSIGNED
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('department_address');
    }
  };
}());
