(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('department_categories', {
        department_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
        },
        category_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
        },
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('department_categories');
    }
  };
}());
