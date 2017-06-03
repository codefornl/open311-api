(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.addColumn({
        tableName: 'services'
      },
      'sequence',
      {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true
      }
    );
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.removeColumn({
        tableName: 'categories'
      },  'services');
    }
  };
}());
